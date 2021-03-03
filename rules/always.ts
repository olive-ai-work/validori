import { ErrorCodes } from 'olive-data-contracts'
import path from '../_internal/path'

// Always run rules

export default new Map([
  [ErrorCodes.MISSING_PATIENT_DATE_OF_BIRTH, path(['patient', 'dateOfBirth'])],
  [ErrorCodes.MISSING_PATIENT_MEMBER_ID, path(['patient', 'memberID'])],
  [ErrorCodes.MISSING_PATIENT_NAME, path(['patient', 'lastName'])],
  [ErrorCodes.MISSING_FACILITY_NAME, path(['facility', 'name'])],
  [ErrorCodes.MISSING_PLAN_NAME, path(['payer', 'plan', 'name'])],
  [ErrorCodes.MISSING_SERVICE_TYPE_CODE, path(['authorization', 'serviceTypeCode', 'value'])],
  [ErrorCodes.MISSING_REQUEST_TYPE_CODE, path(['authorization', 'requestTypeCode', 'value'])]
])
