import { useState, useContext } from 'react'

import { SidebarStyles, SidebarToggle, SidebarToggleWidget, SidebarRoute } from './styles'

import routes from './routes'

import { OverlayContext } from "../../App"

import MenuToggleIcon from '../../../assets/images/Sidebar/menu_toggle.svg'
 
const Sidebar: React.FC = () => {
    const [toggled, setToggled] = useState(true);
    const context = useContext(OverlayContext);

    return (
        <SidebarStyles
            onMouseEnter={ () => setToggled(true) }
            onMouseLeave={ () => setToggled(false) }
        >
                <SidebarToggleWidget>
                    <button onClick={ () => setToggled(!toggled) } className="clicky"><SidebarToggle src={ MenuToggleIcon } height="26px" /></button>
                    { toggled && <h3>Gamemodes</h3> }
                </SidebarToggleWidget>
                { toggled &&
                    <ul>
                        <>
                            { routes.map(route => 
                                <SidebarRoute key={ route.name } onClick={ () => context[1](route) }><img src={ route.icon } height="18px" /><span>{ route.name }</span></SidebarRoute>)
                            }
                        </>
                    </ul>
                }
        </SidebarStyles>  
    );
}
 
export default Sidebar;