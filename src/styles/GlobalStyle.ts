import styled, { createGlobalStyle } from 'styled-components'

import MinecraftWoff from '../../assets/fonts/Minecraft.woff'
import MinecraftWoff2 from '../../assets/fonts/Minecraft.woff2'

// For future use
// #353535
// #191621

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Minecraft;
    src: url(${MinecraftWoff2}) format('woff2'),
    url(${MinecraftWoff}) format('woff');
  }

  :root {
    --theme-color: #03030F;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    outline: none;
  }

  body {
    font-family: Minecraft, Arial, Helvetica, sans-serif;
    font-size: 16px;
    background-color: var(--theme-color);
    opacity: 0.6;
    overflow: hidden;
  }

  p, h1, h2, h3, h4, h5, h6, li, label, div, img, br {
    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-app-region: no-drag;
    cursor: default;
  }

  button.clicky {
    background: none;
    border: none;
  }

  input, select {
    font-family: Minecraft, Arial, Helvetica, sans-serif;
  }

  // Table Styles

  td {
    padding: 0.35rem;
    padding-left: 2.25rem;
  }

  td:first-of-type {
    padding: 0.35rem;
    padding-left: 0;
  }

  tr:first-of-type {
    font-weight: bold;
  }

  // Table Color Styles

  .none {
    color: #FFFFFF;
  }

  .very-low {
    color: #4EE84E;
  }

  .low {
    color: #00AA00;
  }

  .medium {
    color: #D3D608;
  }

  .high {
    color: #ac353f;
  }

  .very-high {
    color: #710708;
  }

  .extreme {
    color: #f753f7;
  }

  // Tag Styles

  .nick {
    color: #00AA00;
  }

  .sniper {
    color: #E344DE;
  }

  .error {
    color: #F51D1D;
  }

  .error * {
    color: #F51D1D !important;
  }

  // Misc. Styles

  .inline-children > * {
    display: inline;
  }

  
  #clear-users {
    border: 0;
    background: 0;
    padding: 0.5rem;
}

  #clear-users:hover {
      background-color: #3e424b;
      cursor: pointer;
  }

  #clear-users *:hover {
      cursor: pointer;
  }
`

export const Wrapper = styled.div`
  & {
    display: flex;
  }

  & > div {
    width: 100%;
  }
`