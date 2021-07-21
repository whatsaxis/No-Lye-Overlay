import { useState } from 'react';

import { SidebarStyles } from './styles';

import routes from './routes';
 
const Sidebar: React.FC = ({ children }) => {
    const [toggled, setToggled] = useState(true);

    return (
        <SidebarStyles>

            <nav>
                <>
                    { children }
                </>
            </nav>
            
        </SidebarStyles>  
    );
}
 
export default Sidebar;