// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(
  gql`
    query exportWithSynonymDataQuery {
      exportWithSynonymData @client
    }
  `,
  {
    name: 'exportWithSynonymDataData',
  }
)
