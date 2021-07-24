import { GlobalStyle } from './styles/GlobalStyle'

import Sidebar from './components/Sidebar'
import Taskbar from './components/Taskbar'

export function App() {
  return (
    <>
      <GlobalStyle />
      <Taskbar />
      <Sidebar />
    </>
  )
}