import { useState, useContext } from 'react'

import { SidebarStyles, Icon, SidebarRoute } from './styles'

import routes from './routes'

import { OverlayContext } from "../../App"

import AppIcon from '../../../assets/icons/icon.png'
 
const Sidebar: React.FC = () => {
    const context = useContext(OverlayContext)
    const [selected, setSelected] = useState(routes[routes.length - 1].name)

    return (
        <SidebarStyles>
            <Icon src={ AppIcon } />

            <ul>
                { routes.map(route => 
                    <SidebarRoute key={ route.name } className={ route.name === selected ? 'selected' : '' } onClick={ () => {
                        context[1](route)
                        setSelected(route.name)
                    } }><img src={ route.icon } height="24px" width="24px" /></SidebarRoute>)
                }
            </ul>
        </SidebarStyles>  
    );
}
 
export default Sidebar;