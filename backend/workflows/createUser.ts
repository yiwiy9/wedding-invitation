import type { Err } from 'neverthrow'
import { Result, ok, err } from 'neverthrow'
import type { components } from '../../generated/schema'
import ValidationError from '../errors/ValidationError'
import type {
  User,
  FamilyNameKanji,
  GivenNameKanji,
  FamilyNameKana,
  GivenNameKana,
  Allergy,
  UserZipCode,
  Address1,
  Address2,
  UserEmail,
  UserTel,
  Message,
  IsAttend,
} from '../objects/user'
import {
  validateFamilyNameKanji,
  validateGivenNameKanji,
  validateFamilyNameKana,
  validateGivenNameKana,
  validateAllergy,
  validateUserZipCode,
  validateAddress1,
  validateAddress2,
  validateUserEmail,
  validateUserTel,
  validateMessage,
  validateIsAttend,
  noAllergy,
  noUserTel,
  noMessage,
} from '../objects/user'

type CreateUserInput = components['schemas']['CreateUserInput']
type CreateUserValidationError = components['schemas']['CreateUserValidationError']

type ValidatedUser = User & Pick<CreateUserInput, 'children'>
type ValidateUser = (
  model: CreateUserInput,
) => Result<ValidatedUser, ValidationError<CreateUserValidationError>>

const validateUser: ValidateUser = (model) => {
  const familyNameKanjiResult = validateFamilyNameKanji(model.familyNameKanji).orElse<
    Err<never, CreateUserValidationError[number]>
  >((e) => err({ name: 'familyNameKanji', reason: e.message }))

  const givenNameKanjiResult = validateGivenNameKanji(model.givenNameKanji).orElse<
    Err<never, CreateUserValidationError[number]>
  >((e) => err({ name: 'givenNameKanji', reason: e.message }))

  const familyNameKanaResult = validateFamilyNameKana(model.familyNameKana).orElse<
    Err<never, CreateUserValidationError[number]>
  >((e) => err({ name: 'familyNameKana', reason: e.message }))

  const givenNameKanaResult = validateGivenNameKana(model.givenNameKana).orElse<
    Err<never, CreateUserValidationError[number]>
  >((e) => err({ name: 'givenNameKana', reason: e.message }))

  const allergyResult = model.allergy
    ? validateAllergy(model.allergy).orElse<Err<never, CreateUserValidationError[number]>>((e) =>
        err({ name: 'allergy', reason: e.message }),
      )
    : ok(noAllergy)

  const zipCodeResult = validateUserZipCode(model.zipCode).orElse<
    Err<never, CreateUserValidationError[number]>
  >((e) => err({ name: 'zipCode', reason: e.message }))

  const address1Result = validateAddress1(model.address1).orElse<
    Err<never, CreateUserValidationError[number]>
  >((e) => err({ name: 'address1', reason: e.message }))

  const address2Result = validateAddress2(model.address2).orElse<
    Err<never, CreateUserValidationError[number]>
  >((e) => err({ name: 'address2', reason: e.message }))

  const emailResult = validateUserEmail(model.email).orElse<
    Err<never, CreateUserValidationError[number]>
  >((e) => err({ name: 'email', reason: e.message }))

  const telResult = model.tel
    ? validateUserTel(model.tel).orElse<Err<never, CreateUserValidationError[number]>>((e) =>
        err({ name: 'tel', reason: e.message }),
      )
    : ok(noUserTel)

  const messageResult = model.message
    ? validateMessage(model.message).orElse<Err<never, CreateUserValidationError[number]>>((e) =>
        err({ name: 'message', reason: e.message }),
      )
    : ok(noMessage)

  const isAttendResult = validateIsAttend(model.isAttend).orElse<
    Err<never, CreateUserValidationError[number]>
  >((e) => err({ name: 'isAttend', reason: e.message }))

  const values: Result<
    [
      FamilyNameKanji,
      GivenNameKanji,
      FamilyNameKana,
      GivenNameKana,
      Allergy,
      UserZipCode,
      Address1,
      Address2,
      UserEmail,
      UserTel,
      Message,
      IsAttend,
    ],
    CreateUserValidationError
  > = Result.combineWithAllErrors([
    familyNameKanjiResult,
    givenNameKanjiResult,
    familyNameKanaResult,
    givenNameKanaResult,
    allergyResult,
    zipCodeResult,
    address1Result,
    address2Result,
    emailResult,
    telResult,
    messageResult,
    isAttendResult,
  ])

  return values
    .map(
      ([
        familyNameKanji,
        givenNameKanji,
        familyNameKana,
        givenNameKana,
        allergy,
        zipCode,
        address1,
        address2,
        email,
        tel,
        message,
        isAttend,
      ]) => ({
        ...model,
        familyNameKanji,
        givenNameKanji,
        familyNameKana,
        givenNameKana,
        allergy,
        zipCode,
        address1,
        address2,
        email,
        tel,
        message,
        isAttend,
      }),
    )
    .mapErr((errArray) => new ValidationError(errArray))
}

type ValidateChildren = (
  model: ValidatedUser,
) => Result<[User, ...User[]], ValidationError<CreateUserValidationError>>

type CreateChildrenValidationError = {
  index: number
  reason: CreateUserValidationError
}

const validateChildren: ValidateChildren = (model) => {
  const { children, ...validatedUser } = model

  const childrenResult: Result<User, CreateChildrenValidationError>[] = children.map(
    (child, index) => {
      const familyNameKanjiResult = validateFamilyNameKanji(child.familyNameKanji).orElse<
        Err<never, CreateUserValidationError[number]>
      >((e) => err({ name: 'familyNameKanji', reason: e.message }))

      const givenNameKanjiResult = validateGivenNameKanji(child.givenNameKanji).orElse<
        Err<never, CreateUserValidationError[number]>
      >((e) => err({ name: 'givenNameKanji', reason: e.message }))

      const familyNameKanaResult = validateFamilyNameKana(child.familyNameKana).orElse<
        Err<never, CreateUserValidationError[number]>
      >((e) => err({ name: 'familyNameKana', reason: e.message }))

      const givenNameKanaResult = validateGivenNameKana(child.givenNameKana).orElse<
        Err<never, CreateUserValidationError[number]>
      >((e) => err({ name: 'givenNameKana', reason: e.message }))

      const allergyResult = child.allergy
        ? validateAllergy(child.allergy).orElse<Err<never, CreateUserValidationError[number]>>(
            (e) => err({ name: 'allergy', reason: e.message }),
          )
        : ok(noAllergy)

      const values = Result.combineWithAllErrors([
        familyNameKanjiResult,
        givenNameKanjiResult,
        familyNameKanaResult,
        givenNameKanaResult,
        allergyResult,
      ])

      return values
        .map(([familyNameKanji, givenNameKanji, familyNameKana, givenNameKana, allergy]) => ({
          ...validatedUser,
          familyNameKanji,
          givenNameKanji,
          familyNameKana,
          givenNameKana,
          allergy,
        }))
        .mapErr((reason) => ({
          index,
          reason,
        }))
    },
  )

  const users = Result.combineWithAllErrors([ok<User, never>(validatedUser), ...childrenResult])
  return users.mapErr(
    (errArray) => new ValidationError([{ name: 'children', reason: JSON.stringify(errArray) }]),
  )
}

type Workflow = (
  model: CreateUserInput,
) => Result<[User, ...User[]], ValidationError<CreateUserValidationError>>

export const createUserWorkflow = (): Workflow => (model) =>
  ok(model).andThen(validateUser).andThen(validateChildren)
