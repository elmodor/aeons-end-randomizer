import styled from 'styled-components/macro'

type Props = {
  selected: boolean
}

const Wrapper = styled('div')<Props>`
  border: 1px solid
    ${props =>
      props.selected
        ? props.theme.colors.secondary.main
        : 'rgba(0, 0, 0, 0.12)'};
  padding: 4px 8px;
  display: inline-block;
  width: calc(100% - 16px);
  margin: 0 8px 24px;
  cursor: pointer;

  &:nth-last-child(2) {
    margin-bottom: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media all and (min-width: 502px) {
    &:nth-last-child(2) {
      margin-bottom: 24px;
    }
  }
`

Wrapper.displayName = 'Wrapper'

export default Wrapper