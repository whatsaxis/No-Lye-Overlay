import { TaskbarStyles, TaskbarStatic, TaskbarControl } from './styles'

import CloseIcon from '../../../assets/images/Taskbar/close.svg'
import WindowIcon from '../../../assets/images/Taskbar/window.svg'
import MinimizeIcon from '../../../assets/images/Taskbar/minimize.svg'

const Taskbar: React.FC = () => {
    return (
        <TaskbarStyles>
            <TaskbarStatic>

                <h3>Tokyo Overlay</h3>

            </TaskbarStatic>
            <TaskbarControl><img src={ CloseIcon } /></TaskbarControl>
            <TaskbarControl><img src={ WindowIcon } /></TaskbarControl>
            <TaskbarControl><img src={ MinimizeIcon } /></TaskbarControl>
        </TaskbarStyles>
    );
}
 
export default Taskbar;