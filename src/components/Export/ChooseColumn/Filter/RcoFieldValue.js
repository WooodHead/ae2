//@flow
import React from 'react'
import TextField from 'material-ui/TextField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import exportRcoFiltersMutation from '../../../../modules/exportRcoFiltersMutation'

const Container = styled.div`
  width: 100%;
`

const floatingLabelStyle = {
  color: 'rgba(0, 0, 0, 0.5)',
}

const enhance = compose(
  withApollo,
  withHandlers({
    onChange: ({ pcname, pname, comparator, client }) => event =>
      client.mutate({
        mutation: exportRcoFiltersMutation,
        variables: { pcname, pname, comparator, value: event.target.value },
      }),
  })
)

const RcoFieldValue = ({
  pname,
  value,
  properties,
  onChange,
}: {
  pname: string,
  value: string,
  properties: Array<Object>,
  onChange: () => {},
}) => (
  <Container>
    <TextField
      floatingLabelFixed
      floatingLabelText={pname}
      floatingLabelStyle={floatingLabelStyle}
      value={value || ''}
      fullWidth
      onChange={onChange}
    />
  </Container>
)

export default enhance(RcoFieldValue)
