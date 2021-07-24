import { useState } from 'react'

import { SidebarStyles, SidebarToggle, SidebarRoute } from './styles'

import routes from './routes'

import MenuToggleIcon from '../../../assets/images/Sidebar/menu_toggle.png'
import MenuToggleIconHover from '../../../assets/images/Sidebar/menu_toggle_hover.png'
 
const Sidebar: React.FC = () => {
    const [toggled, setToggled] = useState(true);

    return (
        <SidebarStyles
            onMouseEnter={ () => setToggled(true) }
            onMouseLeave={ () => setToggled(false) }
        >
                <div className="inline-children">
                    <button onClick={ () => setToggled(!toggled) } className="clicky"><SidebarToggle src={ MenuToggleIcon } height="26px"/></button>
                    { toggled && <h3>Gamemodes</h3> }
                </div>
                { toggled && 
                    <ul>
                        <>
                            { routes.map(route => 
                                <SidebarRoute key={ route.name }><img src={ route.icon } height="18px" />{ route.name }</SidebarRoute>)
                            }
                        </>
                    </ul>
                }
        </SidebarStyles>  
    );
}
 
export default Sidebar;