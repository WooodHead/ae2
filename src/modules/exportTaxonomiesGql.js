// @flow
import gql from 'graphql-tag'

export default gql`
  query exportTaxonomiesQuery {
    exportTaxonomies @client
  }
`
