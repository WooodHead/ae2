//@flow
import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

const Container = styled.div``
const StyledSelectField = styled(SelectField)`
  width: 150px !important;
`

const enhance = compose(
  withHandlers({
    onChange: ({ setComparator }) => (event, index, value) =>
      setComparator(value),
  })
)

const Comparator = ({
  comparator,
  setComparator,
  onChange,
}: {
  comparator: String,
  setComparator: () => {},
  onChange: () => {},
}) => {
  return (
    <Container>
      <StyledSelectField
        floatingLabelFixed
        floatingLabelText="Vergleichs-Operator"
        value={comparator}
        onChange={onChange}
      >
        <MenuItem value={null} primaryText="" />
        <MenuItem value="=" primaryText="&#61;" />
        <MenuItem value=">" primaryText="&#62;" />
        <MenuItem value=">=" primaryText="&#62;&#61;" />
        <MenuItem value="<" primaryText="&#60;" />
        <MenuItem value="<=" primaryText="&#60;&#61;" />
      </StyledSelectField>
    </Container>
  )
}

export default enhance(Comparator)
