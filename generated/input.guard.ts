/*
 * Generated type guards for "input.ts".
 * WARNING: Do not manually change this file.
 */
import { PostUserInput, PostSampleInput } from './input'

export function isPostUserInput(obj: unknown): obj is PostUserInput {
  const typedObj = obj as PostUserInput
  return (
    ((typedObj !== null && typeof typedObj === 'object') || typeof typedObj === 'function') &&
    typeof typedObj['familyNameKanji'] === 'string' &&
    typeof typedObj['givenNameKanji'] === 'string' &&
    typeof typedObj['familyNameKana'] === 'string' &&
    typeof typedObj['givenNameKana'] === 'string' &&
    (typeof typedObj['allergy'] === 'undefined' || typeof typedObj['allergy'] === 'string') &&
    ((typedObj !== null && typeof typedObj === 'object') || typeof typedObj === 'function') &&
    (typedObj['isAttend'] === 'true' || typedObj['isAttend'] === 'false') &&
    typeof typedObj['zipCode'] === 'string' &&
    typeof typedObj['address1'] === 'string' &&
    typeof typedObj['address2'] === 'string' &&
    typeof typedObj['email'] === 'string' &&
    (typeof typedObj['tel'] === 'undefined' || typeof typedObj['tel'] === 'string') &&
    (typeof typedObj['message'] === 'undefined' || typeof typedObj['message'] === 'string') &&
    ((typedObj !== null && typeof typedObj === 'object') || typeof typedObj === 'function') &&
    Array.isArray(typedObj['children']) &&
    typedObj['children'].every(
      (e: any) =>
        ((e !== null && typeof e === 'object') || typeof e === 'function') &&
        typeof e['familyNameKanji'] === 'string' &&
        typeof e['givenNameKanji'] === 'string' &&
        typeof e['familyNameKana'] === 'string' &&
        typeof e['givenNameKana'] === 'string' &&
        (typeof e['allergy'] === 'undefined' || typeof e['allergy'] === 'string'),
    )
  )
}

export function isPostSampleInput(obj: unknown): obj is PostSampleInput {
  const typedObj = obj as PostSampleInput
  return (
    ((typedObj !== null && typeof typedObj === 'object') || typeof typedObj === 'function') &&
    typeof typedObj['sampleEmail'] === 'string'
  )
}
