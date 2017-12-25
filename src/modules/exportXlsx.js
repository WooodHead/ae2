// @flow

import fileSaver from 'file-saver'
import format from 'date-fns/format'

import getXlsxBuffer from './getXlsxBuffer'

export default async ({
  rows,
  onSetMessage,
  columns,
}: {
  rows: Array<Object>,
  onSetMessage: () => void,
  columns: Number,
}) => {
  let buffer
  try {
    buffer = await getXlsxBuffer(rows, columns)
  } catch (error) {
    console.log(error)
    onSetMessage(error)
  }
  fileSaver.saveAs(
    new Blob([buffer], {
      type: 'application/octet-stream',
    }),
    `arteigenschaften_${format(new Date(), 'YYYY-MM-DD_HH-mm-ss')}.xlsx`
  )
}
