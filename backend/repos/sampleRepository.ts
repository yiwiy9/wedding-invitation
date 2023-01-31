import { ResultAsync } from 'neverthrow'
import type { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet'
import type { Sample, SampleEmail } from '../objects/sample'
import InternalServerError from '../errors/InternalServerError'

const sheetTitle = 'サンプル（Web招待状用）'
type SheetHeaderRow = {
  Email: string
}

const modelToRow = (model: Sample): SheetHeaderRow => ({ Email: model.sampleEmail })
const rowToModel = (row: GoogleSpreadsheetRow): Sample => ({
  sampleEmail: row.Email as SampleEmail,
})

export const saveSample =
  (doc: GoogleSpreadsheet) =>
  (model: Sample): ResultAsync<Sample, InternalServerError> => {
    const saveSampleAsync = async () => {
      const sheet = doc.sheetsByTitle[sheetTitle]
      const newRow = await sheet.addRow(modelToRow(model))
      return rowToModel(newRow)
    }

    return ResultAsync.fromPromise(
      saveSampleAsync(),
      () =>
        new InternalServerError({
          message: 'Google スプレッドシートにデータを保存できませんでした。',
        }),
    )
  }

export const findAllSamples =
  (doc: GoogleSpreadsheet) => (): ResultAsync<Sample[], InternalServerError> => {
    const findAllSamplesAsync = async () => {
      const sheet = doc.sheetsByTitle[sheetTitle]
      const rows = await sheet.getRows()
      return rows.map((row) => rowToModel(row))
    }

    return ResultAsync.fromPromise(
      findAllSamplesAsync(),
      () =>
        new InternalServerError({
          message: 'Google スプレッドシートからデータを取得できませんでした。',
        }),
    )
  }
