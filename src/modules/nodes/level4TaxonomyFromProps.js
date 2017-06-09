// @flow
export default (store: Object, props: Object): Array<Object> => {
  if (!props) return []
  if (!props.taxonomyById) return []
  if (!props.taxonomyById.taxonomyObjectLevel1) return []
  if (!props.taxonomyById.taxonomyObjectLevel1.nodes) return []

  return props.taxonomyById.taxonomyObjectLevel1.nodes.map(level3 => {
    const childrenCount = level3.taxonomyObjectsByParentId.totalCount
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''
    if (store.activeNodeArray[3] === level3.id) {
      store.tree.setActiveLevel4(level3)
    }

    return {
      id: level3.id,
      url: [
        store.tree.activeDataType,
        store.tree.activeCategory.name,
        store.tree.activeTaxonomy.id,
        level3.id,
      ],
      sort: [
        store.tree.activeDataType,
        store.tree.activeCategory.name,
        store.tree.activeTaxonomy.name,
        level3.name,
      ],
      label: `${level3.name}${labelCount}`,
      childrenCount,
    }
  })
}
