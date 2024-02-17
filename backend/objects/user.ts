import type { components } from '../../generated/schema'
import validateString from './valueObjects/string'
import validateZipCode from './valueObjects/zipcode'
import validateEmail from './valueObjects/email'
import validateTel from './valueObjects/tel'
import validateBoolean from './valueObjects/boolean'

export type FamilyNameKanji = string & { readonly brand: unique symbol }
export const validateFamilyNameKanji = validateString<FamilyNameKanji>()

export type GivenNameKanji = string & { readonly brand: unique symbol }
export const validateGivenNameKanji = validateString<GivenNameKanji>()

export type FamilyNameKana = string & { readonly brand: unique symbol }
export const validateFamilyNameKana = validateString<FamilyNameKana>()

export type GivenNameKana = string & { readonly brand: unique symbol }
export const validateGivenNameKana = validateString<GivenNameKana>()

export type Allergy = string & { readonly brand: unique symbol }
export const validateAllergy = validateString<Allergy>()
export const noAllergy = '' as Allergy

export type UserZipCode = string & { readonly brand: unique symbol }
export const validateUserZipCode = validateZipCode<UserZipCode>()

export type Address1 = string & { readonly brand: unique symbol }
export const validateAddress1 = validateString<Address1>()

export type Address2 = string & { readonly brand: unique symbol }
export const validateAddress2 = validateString<Address2>()
export const noAddress2 = '' as Address2

export type UserEmail = string & { readonly brand: unique symbol }
export const validateUserEmail = validateEmail<UserEmail>()

export type UserTel = string & { readonly brand: unique symbol }
export const validateUserTel = validateTel<UserTel>()
export const noUserTel = '' as UserTel

export type Message = string & { readonly brand: unique symbol }
export const validateMessage = validateString<Message>(500)
export const noMessage = '' as Message

export type IsAttend = boolean & { readonly brand: unique symbol }
export const validateIsAttend = validateBoolean<IsAttend>()

export type User = Omit<
  components['schemas']['User'],
  'familyNameKanji | givenNameKanji | familyNameKana | givenNameKana | allergy | zipCode | address1 | address2 | email | tel | message | isAttend'
> & {
  familyNameKanji: FamilyNameKanji
  givenNameKanji: GivenNameKanji
  familyNameKana: FamilyNameKana
  givenNameKana: GivenNameKana
  allergy: Allergy
  zipCode: UserZipCode
  address1: Address1
  address2: Address2
  email: UserEmail
  tel: UserTel
  message: Message
  isAttend: IsAttend
}
