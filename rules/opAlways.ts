import { ErrorCodes } from 'olive-data-contracts'
import path from '../_internal/path'

// Outpatient always rules

function isNotNilOrEmpty (keys: string[]) {
  return (odc: any): boolean => {
    const value = path(keys)(odc)

    return value && value.length > 0
  }
}

export default new Map([
  [ErrorCodes.MISSING_DATE_OF_SERVICE, path(['authorization', 'dateOfService'])],
  [ErrorCodes.MISSING_PROCEDURE_CODES, isNotNilOrEmpty(['authorization', 'procedureCodes'])]
])
