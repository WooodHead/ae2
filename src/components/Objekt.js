// @flow
import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import sortBy from 'lodash/sortBy'
import uniqBy from 'lodash/uniqBy'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import TaxonomyObject from './TaxonomyObject'
import PropertyCollectionObject from './PropertyCollectionObject'
import activeNodeArrayGql from '../modules/activeNodeArrayGql'
import getActiveObjectIdFromNodeArray from '../modules/getActiveObjectIdFromNodeArray'

const Container = styled.div`
  padding: 5px;
  height: calc(100% - 48px);
  overflow: auto !important;
`
const Title = styled.h3`margin: 15px 0 -5px 0;`
const TitleSpan = styled.span`font-weight: normal;`
const FirstTitle = styled(Title)`margin: 5px 0 -5px 0;`

const Objekt = ({ data }: { data: Object }) => {
  const { activeObject } = data
  console.log('Objekt: data:', data)
  console.log('Objekt: activeObject:', activeObject)
  if (!activeObject) return <div />
  const propertyCollectionObjects = get(
    activeObject,
    'propertyCollectionObjectsByObjectId.nodes',
    []
  )
  const relations = get(activeObject, 'relationsByObjectId.nodes', [])
  const synonyms = get(activeObject, 'synonymsByObjectId.nodes', [])
  const synonymObjects = synonyms.map(s => s.objectByObjectIdSynonym)
  const propertyCollectionIds = propertyCollectionObjects.map(
    pco => pco.propertyCollectionId
  )
  let propertyCollectionObjectsOfSynonyms = []
  synonymObjects.forEach(synonym => {
    propertyCollectionObjectsOfSynonyms = [
      ...propertyCollectionObjectsOfSynonyms,
      ...get(synonym, 'propertyCollectionObjectsByObjectId.nodes', []),
    ]
  })
  propertyCollectionObjectsOfSynonyms = uniqBy(
    propertyCollectionObjectsOfSynonyms,
    pco => pco.propertyCollectionId
  )
  propertyCollectionObjectsOfSynonyms = propertyCollectionObjectsOfSynonyms.filter(
    pco => !propertyCollectionIds.includes(pco.propertyCollectionId)
  )

  return (
    <Container>
      <FirstTitle>
        Taxonomie
        <TitleSpan>{` (${activeObject.name})`}</TitleSpan>
      </FirstTitle>
      <TaxonomyObject key={activeObject.id} taxonomyObject={activeObject} />
      {synonymObjects.length > 0 && (
        <Title>
          {synonymObjects.length > 1 ? 'Synonyme' : 'Synonym'}
          <TitleSpan>
            {synonymObjects.length > 1 ? ` (${synonymObjects.length})` : ''}
          </TitleSpan>
        </Title>
      )}
      {sortBy(synonymObjects, tO =>
        get(tO, 'taxonomyByTaxonomyId.name', '(Name fehlt)')
      ).map(taxonomyObject => (
        <TaxonomyObject
          key={taxonomyObject.id}
          taxonomyObject={taxonomyObject}
          showLink
        />
      ))}
      {propertyCollectionObjects.length > 0 && (
        <Title>
          Eigenschaften
          <TitleSpan
          >{` (${propertyCollectionObjects.length} ${propertyCollectionObjects.length >
          1
            ? 'Sammlungen'
            : 'Sammlung'})`}</TitleSpan>
        </Title>
      )}
      {sortBy(propertyCollectionObjects, pCO =>
        get(
          pCO,
          'propertyCollectionByPropertyCollectionId.name',
          '(Name fehlt)'
        )
      ).map((pCO, index) => (
        <PropertyCollectionObject
          key={`${pCO.propertyCollectionId}`}
          pCO={pCO}
          relations={relations.filter(
            r => r.propertyCollectionId === pCO.propertyCollectionId
          )}
        />
      ))}
      {propertyCollectionObjectsOfSynonyms.length > 0 && (
        <Title>
          Eigenschaften von Synonymen
          <TitleSpan>
            {` (${propertyCollectionObjectsOfSynonyms.length} ${propertyCollectionObjectsOfSynonyms.length >
            1
              ? 'Sammlungen'
              : 'Sammlung'})`}
          </TitleSpan>
        </Title>
      )}
      {sortBy(propertyCollectionObjectsOfSynonyms, pCO =>
        get(
          pCO,
          'propertyCollectionByPropertyCollectionId.name',
          '(Name fehlt)'
        )
      ).map((pCO, index) => (
        <PropertyCollectionObject
          key={`${pCO.propertyCollectionId}`}
          pCO={pCO}
          relations={relations.filter(
            r => r.propertyCollectionId === pCO.propertyCollectionId
          )}
        />
      ))}
    </Container>
  )
}

const activeObjectQuery = gql`
  query ActiveObjectQuery($activeObjectId: Uuid!) {
    activeObject: objectById(id: $activeObjectId) {
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
const activeNodeArrayData = graphql(activeNodeArrayGql, {
  name: 'activeNodeArrayData',
})
const objektData = graphql(activeObjectQuery, {
  options: ({ activeNodeArrayData }) => ({
    variables: {
      activeObjectId: getActiveObjectIdFromNodeArray(
        activeNodeArrayData.activeNodeArray
      ),
    },
  }),
})

const enhance = compose(
  inject('store'),
  activeNodeArrayData,
  objektData,
  observer
)

export default enhance(Objekt)
