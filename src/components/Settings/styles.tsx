import styled from 'styled-components'


export const SettingsStyles = styled.div`
  & {
    margin-left: 1rem;
  }

  h1 {
    text-align: center;
  }

  input[type=text], select, div.validity {
      font-size: 0.95rem;
      float: right;
  }

  input[type=text] {
      width: 50%;
      color: #fff;
      border: 2px solid #fff;
      background-color: #000;
  }

  select {
      color: #fff;
      background-color: #000;
      border: 2px solid #fff;
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

export const Credits = styled.div`
  & {
    position: absolute;
    font-family: Minecraft;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    right: 0;
  }

  & div, & p {
    padding-right: 0.8rem;
  }

  & svg {
    margin-right: 0.3rem;
  }

  & div * {
    display: inline;
    vertical-align: middle;
  }

  a {
    color: #cfc;
    text-decoration: none;
  }

  code {
    background-color: #0b2020;
    border: 1px solid #2a7c7c;
    padding: 0.2rem;
    border-radius: 4px;
    font-family: Minecraft;
  }
`