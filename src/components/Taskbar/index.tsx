import { TaskbarStyles, TaskbarStatic, TaskbarControl } from './styles'

const Taskbar: React.FC = () => {
    return (
        <TaskbarStyles>
            <TaskbarStatic>

                <h3>Tokyo Overlay</h3>

            </TaskbarStatic>
            <TaskbarControl>TODO</TaskbarControl>
            <TaskbarControl>TODO</TaskbarControl>
            <TaskbarControl>TODO</TaskbarControl>
        </TaskbarStyles>
    );
}
 
export default Taskbar;