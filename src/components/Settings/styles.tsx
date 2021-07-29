import styled from 'styled-components'


// TODO

export const SettingsStyles = styled.div`
  input[type=text], select, div.validity {
      font-size: 0.95rem;
      float: right;
  }

  input[type=text] {
      width: 50%;
  }

  input[type=text]:hover, select:hover {
      background-color: #666;
  }

  input.blur:not(:focus) {
    filter: blur(4px);
    -webkit-filter: blur(4px);
  }

  h2 {
      margin-top: 1.5rem;
  }
`

export const Setting = styled.div`
  & {
    padding: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &:hover {
    background-color: #444;
  }

  & label {
    font-size: 1.2rem;
    margin-right: auto;
  }

  & div.validity {
      margin-right: 0.5rem;
  }
`