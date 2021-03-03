import { ErrorCodes } from 'olive-data-contracts'
import path from '../_internal/path'

// Inpatient Always rules

export default new Map([
  [ErrorCodes.MISSING_ADMIT_DATE, path(['encounter', 'admitDate'])]
])
