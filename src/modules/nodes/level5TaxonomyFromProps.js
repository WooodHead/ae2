// @flow
export default ({
  store,
  props,
  activeLevel2TaxonomyName,
  activeLevel3TaxonomyName,
  activeLevel3TaxonomyId,
  activeLevel4TaxonomyName,
  activeLevel4TaxonomyId,
}: {
  store: Object,
  props: Object,
  activeLevel2TaxonomyName: ?String,
  activeLevel3TaxonomyName: ?String,
  activeLevel3TaxonomyId: ?String,
  activeLevel4TaxonomyName: ?String,
  activeLevel4TaxonomyId: ?String,
}): Array<Object> => {
  if (!props) return []
  if (!props.level5Taxonomy) return []
  if (!props.level5Taxonomy.objectsByParentId) return []
  if (!props.level5Taxonomy.objectsByParentId.nodes) return []

  return props.level5Taxonomy.objectsByParentId.nodes.map(node => {
    const childrenCount = node.objectsByParentId &&
      node.objectsByParentId.totalCount
      ? node.objectsByParentId.totalCount
      : 0
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''

    return {
      id: node.id,
      url: [
        'Taxonomien',
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyId,
        activeLevel4TaxonomyId,
        node.id,
      ],
      sort: [
        1,
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyName,
        activeLevel4TaxonomyName,
        node.name,
      ],
      label: `${node.name}${labelCount}`,
      childrenCount,
    }
  })
}
