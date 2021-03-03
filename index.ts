import {
  AuthStatusResponse,
  AuthStatusRequest,
  AuthStatusMimicRequest,
  ErrorCodes,
  OliveErrorCollection,
  GlobalError
} from 'olive-data-contracts'
import * as rules from './rules/index'

export type ODC = AuthStatusRequest | AuthStatusMimicRequest
export type ValidResponse = AuthStatusRequest | AuthStatusResponse
export type PredMap = Map<ErrorCodes, (a: AuthStatusRequest) => any | undefined>

// I am using "any" here because the data could be a different layer
function getData (odc: any): AuthStatusRequest {
  if (odc.request) {
    return odc.request
  }

  return odc
}

// The odc has already been ran throught he always function validation
// If it passed that step then everything should be there thats needed for this
function setRequestTypeDescription (odc: AuthStatusRequest): [AuthStatusRequest, string] {
  let type = 'Outpatient'

  if (odc.authorization!.requestTypeCode!.value === 'AR') {
    odc.authorization!.requestTypeCode!.description = 'Inpatient'
    type = 'Inpatient'
  } else {
    odc.authorization!.requestTypeCode!.description = 'Outpatient'
  }

  return [odc, type]
}
/**
 * Runs a list of rules provided against the ODC, if any of the checks fails
 * the error is marked and added to an array and returned
 * @param rules The Map which contains the rules you want to run against the odc
 * @param odc The ODC we are validating
 */
function validateRules (rules: PredMap, odc: AuthStatusRequest): GlobalError[] {
  const errorBuilder: OliveErrorCollection = OliveErrorCollection.createNewCollection()
  const errs = []

  for (const [msg, fn] of rules) {
    if (!fn(odc)) {
      errs.push(errorBuilder.createError(msg))
    }
  }

  return errs
}

/**
 * The beefy parts of running validori, simply pass your odc to this function and you're golden
 * @param odc The ODC object we want to validate
 */
function validori (odc: ODC): ValidResponse {
  const data = getData(odc)
  const results = validateRules(rules.always, data)
  const hasRequestTypeErr = results.find(({ message }) => message === 'Missing Request Type Code') != null

  // If we don't have a requestType property then we can't run the other rules, so return
  if (hasRequestTypeErr) {
    return {
      authorizations: [],
      errors: results,
      warnings: [],
      request: odc
    }
  }

  // Otherwise, let's continue the validation and set
  // The requestType descriptions
  const [updatedData, type] = setRequestTypeDescription(data)

  // Check the patient type and run the appropriate rules
  if (type === 'Inpatient') {
    results.push(...validateRules(rules.ipAlways, updatedData))
  } else if (type === 'Outpatient') {
    results.push(...validateRules(rules.opAlways, updatedData))
  }

  // If we got ANY results, then go ahead and return our errors with the updated ODC
  if (results.length) {
    return {
      authorizations: [],
      errors: results,
      warnings: [],
      request: updatedData
    }
  }

  // Otherwise return the data
  return updatedData
}

export default validori
