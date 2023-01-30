import { ResultAsync } from 'neverthrow'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { GOOGLE_SPREADSHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } from '../config'
import InternalServerError from '../errors/InternalServerError'

type InitSpreadsheetDoc = () => ResultAsync<GoogleSpreadsheet, InternalServerError>

export const initSpreadsheetDoc: InitSpreadsheetDoc = () => {
  const initSpreadsheetDocAsync = async () => {
    console.log('initSpreadsheetDoc')

    const doc = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_ID)
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    })

    await doc.loadInfo()

    return doc
  }

  return ResultAsync.fromPromise(
    initSpreadsheetDocAsync(),
    () => new InternalServerError({ message: 'Google スプレッドシートに接続できませんでした。' }),
  )
}
