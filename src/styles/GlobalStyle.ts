import { createGlobalStyle } from 'styled-components'

import MinecraftWoff from '../../assets/fonts/Minecraft.woff'
import MinecraftWoff2 from '../../assets/fonts/Minecraft.woff2'

// For future use
// #353535

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Minecraft;
    src: url(${MinecraftWoff2}) format('woff2'),
    url(${MinecraftWoff}) format('woff');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Minecraft, Arial, Helvetica, sans-serif;
    font-size: 16px;
    background-color: #191621;
    opacity: 0.5;
    overflow: hidden;
  }

  button.clicky {
    background: none;
    border: none;
  }

  img {
    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
`
