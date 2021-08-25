import styled, { createGlobalStyle } from 'styled-components'

import MinecraftRegular from '../../assets/fonts/MinecraftRegular.otf'
import MinecraftItalic from '../../assets/fonts/MinecraftItalic.otf'
import MinecraftBold from '../../assets/fonts/MinecraftBold.otf'
import MinecraftBoldItalic from '../../assets/fonts/MinecraftBoldItalic.otf'


export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Minecraft';
    font-weight: normal;
    font-style: normal;
    src: url(${ MinecraftRegular }) format("opentype");
  }

  @font-face {
    font-family: 'Minecraft';
    font-weight: normal;
    font-style: italic;
    src: url(${ MinecraftItalic }) format("opentype");
  }

  @font-face {
    font-family: 'Minecraft';
    font-weight: bold;
    font-style: normal;
    src: url(${ MinecraftBold }) format("opentype");
  }

  @font-face {
    font-family: 'Minecraft';
    font-weight: bold;
    font-style: italic;
    src: url(${ MinecraftBoldItalic }) format("opentype");
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

  @media only screen and (max-width: 900px) {
      td {
        padding: 0.25rem;
        padding-left: 1.75rem;
      }
  }

  @media only screen and (max-width: 850px) {
    td {
      padding: 0.22rem;
      padding-left: 1.25rem;
    }
  }

  @media only screen and (max-width: 750px) {
    td {
      padding: 0.2rem;
      padding-left: 1rem;
    }
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

  // Scroll bar

  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    background-color: var(--theme-color);
  }
  
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 8px;
    width: 8px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #777;
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
    height: 100%;
  }

  & > div {
    display: inline;
  }
`