// @flow
import app from 'ampersand-app'

import activeNodeArrayGql from './activeNodeArrayGql'

export default (): Array<string> => {
  // at startup client is undefined
  if (!app.client) return []
  const result = app.client.readQuery({
    query: activeNodeArrayGql,
  })
  const activeNodeArrayDataset = result.activeNodeArray[0]
  if (!activeNodeArrayDataset) return []
  return activeNodeArrayDataset.value
}