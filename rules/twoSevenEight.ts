import { ErrorCodes } from 'olive-data-contracts'
import path from '../_internal/path'

// 278 always rules

export default new Map([
  [ErrorCodes.MISSING_REFERRAL_ID, path(['authorization', 'referralID'])]
])
