// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store.export, {
    combineTaxonomies: false,
    setCombineTaxonomies: action(
      'setCombineTaxonomies',
      combineTaxonomies => (store.export.combineTaxonomies = combineTaxonomies)
    ),
    pcoProperties: [],
    setPcoProperties: action(
      'setPcoProperties',
      pcoProperties => (store.export.pcoProperties = pcoProperties)
    ),
  })
}
