import { TaskbarStyles, TaskbarTitle, TaskbarControl } from './styles'

import AppIcon from '../../../assets/icons/icon.png'

import CloseIcon from '../../../assets/images/Taskbar/close.svg'
import ReframeIcon from '../../../assets/images/Taskbar/reframe.svg'
import MinimizeIcon from '../../../assets/images/Taskbar/minimize.svg'


// https://stackoverflow.com/questions/56203211/is-there-any-other-way-to-close-a-frameless-window-in-electron-5-0-1
// Most useful answer ever!

const handleClose = () => {
    window.Main.closeWindow()
}

const handleReframe = () => {
    window.Main.reframeWindow()
}

const handleMinimize = () => {
    window.Main.minimizeWindow()
}

const Taskbar: React.FC = () => {
    return (
        <TaskbarStyles>
            <TaskbarTitle>Tokyo Overlay</TaskbarTitle>
            {/* <img src={ AppIcon } height={ 25 } style={{ display: 'inline' }}></img> */}

            <TaskbarControl onClick={ handleClose }><img src={ CloseIcon } /></TaskbarControl>
            <TaskbarControl onClick={ handleReframe }><img src={ ReframeIcon } /></TaskbarControl>
            <TaskbarControl onClick={ handleMinimize }><img src={ MinimizeIcon } /></TaskbarControl>
        </TaskbarStyles>
    )
}
 
export default Taskbar;