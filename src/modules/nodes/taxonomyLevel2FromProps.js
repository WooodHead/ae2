// @flow
export default (store: Object, props: Object): Array<Object> => {
  console.log('taxonomyLevel2FromProps: props:', props)
  if (!props) return []
  if (!props.allDataTypes) return []
  if (!props.allDataTypes.nodes) return []

  // find dataType
  const dataType = props.allDataTypes.nodes.find(n => n.name === 'taxonomy')
  if (!dataType) return []
  if (!dataType.categoriesByDataType) return []
  if (!dataType.categoriesByDataType.nodes) return []

  // find category
  const categoryName = store.activeNodeArray[1]
  if (!categoryName) return []
  const category = dataType.categoriesByDataType.nodes.find(
    n => n.name === categoryName
  )
  if (!category) return []
  if (!category.taxonomyByCategory) return []
  if (!category.taxonomyByCategory.nodes) return []

  return category.taxonomyByCategory.nodes.map(taxonomy => {
    const childrenCount = taxonomy.taxonomyObjectLevel1.totalCount
    const labelCount = ` (${childrenCount})`

    return {
      id: taxonomy.id,
      url: [store.activeDataType.name, category.name, taxonomy.id],
      sort: [store.activeDataType.name, category.name, taxonomy.name],
      label: `${taxonomy.name}${labelCount}`,
      childrenCount,
    }
  })
}
