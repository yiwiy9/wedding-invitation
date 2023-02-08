import { ResultAsync } from 'neverthrow'
import type { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet'
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
import InternalServerError from '../errors/InternalServerError'

const sheetTitle = '招待者リスト（Web招待状用）'
type SheetHeaderRow = {
  姓: string
  名: string
  姓ふりがな: string
  名ふりがな: string
  出欠状態: '確認中' | '出席' | '欠席'
  '〒': string
  住所1: string
  住所2: string
  電話番号: string
  Email: string
  アレルギー: string
  一言メッセージ: string
}

const modelToRow = (model: User): SheetHeaderRow => ({
  姓: model.familyNameKanji,
  名: model.givenNameKanji,
  姓ふりがな: model.familyNameKana,
  名ふりがな: model.givenNameKana,
  出欠状態: model.isAttend ? '出席' : '欠席',
  '〒': model.zipCode,
  住所1: model.address1,
  住所2: model.address2,
  電話番号: model.tel,
  Email: model.email,
  アレルギー: model.allergy,
  一言メッセージ: model.message,
})
const rowToModel = (row: GoogleSpreadsheetRow): User => ({
  familyNameKanji: row.姓 as FamilyNameKanji,
  givenNameKanji: row.名 as GivenNameKanji,
  familyNameKana: row.姓ふりがな as FamilyNameKana,
  givenNameKana: row.名ふりがな as GivenNameKana,
  allergy: row.アレルギー as Allergy,
  zipCode: row['〒'] as UserZipCode,
  address1: row.住所1 as Address1,
  address2: row.住所2 as Address2,
  email: row.Email as UserEmail,
  tel: row.電話番号 as UserTel,
  message: row.一言メッセージ as Message,
  isAttend: (row.出欠状態 === '出席') as IsAttend,
})

export const saveUsers =
  (doc: GoogleSpreadsheet) =>
  (models: User[]): ResultAsync<User[], InternalServerError> => {
    const saveUsersAsync = async () => {
      const sheet = doc.sheetsByTitle[sheetTitle]
      const arrayOfRowValues = models.map((model) => modelToRow(model))
      const newRows = await sheet.addRows(arrayOfRowValues)
      return newRows.map((newRow) => rowToModel(newRow))
    }

    return ResultAsync.fromPromise(
      saveUsersAsync(),
      () =>
        new InternalServerError({
          message: 'Google スプレッドシートにデータを保存できませんでした。',
        }),
    )
  }
