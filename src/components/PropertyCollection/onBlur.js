// #flow

import updatePCMutation from './updatePCMutation'

export default ({ client, field, pC, value, prevValue }) => {
  if (value !== prevValue) {
    const lastUpdated = new Date()
    const variables = {
      id: pC.id,
      name: field === 'name' ? value : pC.name,
      description: field === 'description' ? value : pC.description,
      links: field === 'links' ? value.split(',') : pC.links,
      combining: field === 'combining' ? value : pC.combining,
      organizationId: field === 'organizationId' ? value : pC.organizationId,
      lastUpdated,
      importedBy: field === 'importedBy' ? value : pC.importedBy,
      termsOfUse: field === 'termsOfUse' ? value : pC.termsOfUse,
    }
    client.mutate({
      mutation: updatePCMutation,
      variables,
      optimisticResponse: {
        updatePropertyCollectionById: {
          propertyCollection: {
            id: pC.id,
            name: field === 'name' ? value : pC.name,
            description: field === 'description' ? value : pC.description,
            links: field === 'links' ? value.split(',') : pC.links,
            combining: field === 'combining' ? value : pC.combining,
            organizationId:
              field === 'organizationId' ? value : pC.organizationId,
            lastUpdated,
            importedBy: field === 'importedBy' ? value : pC.importedBy,
            termsOfUse: field === 'termsOfUse' ? value : pC.termsOfUse,
            __typename: 'PropertyCollection',
          },
          __typename: 'PropertyCollection',
        },
        __typename: 'Mutation',
      },
    })
  }
}