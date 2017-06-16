// @flow
import { extendObservable, action, computed } from 'mobx'

export default (store: Object): void => {
  extendObservable(store.treeFilter, {
    text: '',
    setText: action('setText', (text: string) => {
      store.treeFilter.text = text
    }),
    id: null,
    setId: action('setId', (id: string) => {
      store.treeFilter.id = id
    }),
    taxonomyObjectId: computed(
      () => {
        const { treeFilter } = store
        if (treeFilter.id && treeFilter.type === 'taxonomyObject') {
          return treeFilter.id
        }
        return null
      },
      { name: 'taxonomyObjectId' }
    ),
    propertyCollectionObjectId: computed(
      () => {
        const { treeFilter } = store
        if (treeFilter.id && treeFilter.type === 'propertyCollection') {
          return treeFilter.id
        }
        return null
      },
      { name: 'propertyCollectionObjectId' }
    ),
    relationCollectionObjectId: computed(
      () => {
        const { treeFilter } = store
        if (treeFilter.id && treeFilter.type === 'relationCollection') {
          return treeFilter.id
        }
        return null
      },
      { name: 'relationCollectionObjectId' }
    ),
    suggestionsTO: [],
    setSuggestionsTO: action('setSuggestionsTO', (suggestions: Object) => {
      store.treeFilter.suggestionsTO = suggestions
    }),
    suggestionsPC: [],
    setSuggestionsPC: action('setSuggestionsPC', (suggestions: Object) => {
      store.treeFilter.suggestionsPC = suggestions
    }),
    suggestionsRC: [],
    setSuggestionsRC: action('setSuggestionsRC', (suggestions: Object) => {
      store.treeFilter.suggestionsRC = suggestions
    }),
  })
}