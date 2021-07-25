import React, { useState } from 'react';

import { GlobalStyle, Wrapper } from './styles/GlobalStyle'

import Sidebar from './components/Sidebar'
import Taskbar from './components/Taskbar'
import Overlay from './components/Overlay'

import routes from './components/Sidebar/routes'

export const OverlayContext = React.createContext(Array());

export function App() {
  const [currentOverlay, setCurrentOverlay] = useState(routes[routes.length - 1]);

  return (
    <>
      <GlobalStyle />
      <Taskbar />

      <OverlayContext.Provider value={ [currentOverlay, setCurrentOverlay] }>
        <Wrapper>

          <Sidebar />
          <Overlay />
          
        </Wrapper>
      </OverlayContext.Provider>
    </>
  )
}