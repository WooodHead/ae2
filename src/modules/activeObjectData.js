// @flow
import { graphql } from 'react-apollo'

import activeObectGql from './activeObjectGql'
import getActiveObjectIdFromNodeArray from './getActiveObjectIdFromNodeArray'

export default graphql(activeObectGql, {
  options: ({ activeNodeArrayData }) => ({
    variables: {
      activeObjectId: getActiveObjectIdFromNodeArray(
        activeNodeArrayData.activeNodeArray
      ),
    },
  }),
  name: 'activeObjectData',
})