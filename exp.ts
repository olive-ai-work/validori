import {
  ErrorCodes,
  OliveErrorCollection,
  GlobalError
} from 'olive-data-contracts'

const errorBuilder: OliveErrorCollection = OliveErrorCollection.createNewCollection()

const list = [errorBuilder.createError(ErrorCodes.MISSING_REQUEST_TYPE_CODE)]

function hasRequestType(errs: GlobalError[]): boolean {
  return errs.find(({ message }) => message === 'Missing Request Type') != null
}

console.log(hasRequestType(list))

// for (let i = 0; i < list.length; i++) {
//   const item = list[i]

//   console.log(item.message)
// }
