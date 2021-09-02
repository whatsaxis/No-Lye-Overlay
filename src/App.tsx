import React, { useState } from 'react';

import { GlobalStyle, Wrapper } from './styles/GlobalStyle'

import { useCache } from './useCache'

import Sidebar from './components/Sidebar'
import Taskbar from './components/Taskbar'
import Overlay from './components/Overlay'

import routes from './components/Sidebar/routes'

export const OverlayContext = React.createContext<any>([])
export const CacheContext = React.createContext<any>([])

export function App() {
  const [currentOverlay, setCurrentOverlay] = useState(routes[routes.length - 1]);

  const [
    UUIDCacheGet, UUIDCacheAdd, UUIDCacheIncludes,
    SkinCacheGet, SkinCacheAdd, SkinCacheIncludes,
    NickCacheAdd, NickCacheIncludes
  ] = useCache()

  return (
    <>
      <GlobalStyle />

      <OverlayContext.Provider value={ [currentOverlay, setCurrentOverlay] }>
        <CacheContext.Provider value={ [
            UUIDCacheGet, UUIDCacheAdd, UUIDCacheIncludes,
            SkinCacheGet, SkinCacheAdd, SkinCacheIncludes,
            NickCacheAdd, NickCacheIncludes
        ] }>
          <Wrapper>
            <Sidebar />
            <div>
              <Taskbar />
              <Overlay />
            </div>
          </Wrapper>
        </CacheContext.Provider>
      </OverlayContext.Provider>
    </>
  )
}