# Validori (valley-dori)

Welcome to Validori! A process to validate odc objects based on a table given to me.

Play with the rules to determine if things are okay for you

## Parameters

- `odc`: An `AuthStatusRequest` or `AuthStatusMimicRequest`

## Rules

These are the specific rules for validation

> **Important Note**: If any of the steps along the path are missing, the rule will be counted as failed, so for example if the odc is missing `serviceTypeCode` under the `authorization` key that rule will return with an error of it missing

### Always

The always rules are those that will ALWAYS be ran and are ran first, these rules include:

- Checking for `patient.dateOfBirth` and ensure it isn't a falsy value
- Checking for `patient.memberID` and ensure it isn't a falsy value
- Checking for `patient.lastName` and ensure it isn't a falsy value
- Checking for `facility.name` and ensure it isn't a falsy value
- Checking for `payer.plan.name` and ensure it isn't a falsy value
- Checking for `authorization.serviceTypeCode.value` and ensure it isn't a falsy value
- Checking for `authorization.requestTypeCode.value` and ensure it isn't a falsy value

### Ip Always

These are the inpatient rules which are triggered if and ONLY if `authorization.requestTypeCode.value` === `AR`

- Checking for `encounter.admitDate` and ensure it isn't a falsy value


### Op Always

These are the outpatient rules which are triggered if and ONLY if `authorization.requestTypeCode.value` !== `AR`

- Checking for `authorization.dateOfService` and ensure it isn't a falsy value
- Checking for `authorization.procedureCodes` and ensure it isn't an empty array

### 278 Always

These rules are not currently being ran but may be added in the future

- Checking for `authorization.referralID` and ensure it isn't a falsy value

## Adding Rules

The rules are built into an extendable `Map` data type, and then looped over. The structure of the `Map` is pretty easy:

```js
[ErrorCodesEnum, predicateFunction]
```

Where `ErrorCodesEnum` is the error enum found in `ErrorCodes` and `predicateFunction` is the function you want to run to determine if the error should be thrown or not.

> If the function returns a `falsy value` the error will throw

for example:

```js
function alwaysFalse () {
  return false
}

[ErrorCodes.MISSING_PROCEDURE_CODES, alwaysFalse]
// This will cause an error to be thrown
```

**Remember, false means the test failed and you need to throw the error**

Once you've written your lovely predicate simply add it to any of the `Rule Maps` and it will be added into the sequence! It's that simple!
