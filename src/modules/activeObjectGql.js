// @flow
import gql from 'graphql-tag'

export default gql`
  query ObjectQuery($activeObjectId: Uuid!) {
    objectById(id: $activeObjectId) {
      id
      taxonomyId
      parentId
      name
      properties
      category
      idOld
      synonymsByObjectId {
        totalCount
        nodes {
          objectId
          objectIdSynonym
          objectByObjectIdSynonym {
            id
            taxonomyId
            parentId
            name
            properties
            category
            idOld
            taxonomyByTaxonomyId {
              id
              name
              description
              links
              lastUpdated
              isCategoryStandard
              importedBy
              termsOfUse
              habitatLabel
              habitatComments
              habitatNrFnsMin
              habitatNrFnsMax
              organizationByOrganizationId {
                id
                name
              }
            }
            propertyCollectionObjectsByObjectId {
              totalCount
              nodes {
                id
                objectId
                propertyCollectionId
                properties
                propertyCollectionByPropertyCollectionId {
                  id
                  name
                  description
                  links
                  combining
                  lastUpdated
                  termsOfUse
                  importedBy
                  organizationByOrganizationId {
                    id
                    name
                  }
                  userByImportedBy {
                    id
                    name
                    email
                  }
                }
              }
            }
            relationsByObjectId {
              totalCount
              nodes {
                id
                propertyCollectionId
                objectId
                objectIdRelation
                relationType
                properties
                propertyCollectionByPropertyCollectionId {
                  id
                  name
                  description
                  links
                  combining
                  lastUpdated
                  termsOfUse
                  importedBy
                  organizationByOrganizationId {
                    id
                    name
                  }
                  userByImportedBy {
                    id
                    name
                    email
                  }
                }
                objectByObjectIdRelation {
                  id
                  name
                  category
                }
              }
            }
            categoryByCategory {
              id
              name
              dataType
            }
            objectByParentId {
              id
              objectByParentId {
                id
                objectByParentId {
                  id
                  objectByParentId {
                    id
                    objectByParentId {
                      id
                      objectByParentId {
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      taxonomyByTaxonomyId {
        id
        name
        description
        links
        lastUpdated
        isCategoryStandard
        importedBy
        termsOfUse
        habitatLabel
        habitatComments
        habitatNrFnsMin
        habitatNrFnsMax
        organizationByOrganizationId {
          id
          name
        }
      }
      propertyCollectionObjectsByObjectId {
        totalCount
        nodes {
          id
          objectId
          propertyCollectionId
          properties
          propertyCollectionByPropertyCollectionId {
            id
            name
            description
            links
            combining
            lastUpdated
            termsOfUse
            importedBy
            organizationByOrganizationId {
              id
              name
            }
            userByImportedBy {
              id
              name
              email
            }
          }
        }
      }
      relationsByObjectId {
        totalCount
        nodes {
          id
          propertyCollectionId
          objectId
          objectIdRelation
          relationType
          properties
          propertyCollectionByPropertyCollectionId {
            id
            name
            description
            links
            combining
            lastUpdated
            termsOfUse
            importedBy
            organizationByOrganizationId {
              id
              name
            }
            userByImportedBy {
              id
              name
              email
            }
          }
          objectByObjectIdRelation {
            id
            name
            category
          }
        }
      }
    }
  }
`