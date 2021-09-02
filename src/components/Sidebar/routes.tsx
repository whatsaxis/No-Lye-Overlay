import Bedwars from '../../gamemodes/Bedwars'
import Skywars from '../../gamemodes/Skywars'
import Duels from '../../gamemodes/Duels'
import Settings from '../Settings'

import BedwarsIcon from '../../../assets/images/Sidebar/bedwars.png'
import SkywarsIcon from '../../../assets/images/Sidebar/skywars.png'
import DuelsIcon from '../../../assets/images/Sidebar/duels.png'
import SettingsIcon from '../../../assets/images/Sidebar/settings.png'


export interface Route {
    name: string
    icon: string,  // yikes Typescript
    component: JSX.Element
}

const routes: Route[] = [
    {
        "name": "Bedwars",
        "icon": BedwarsIcon,
        "component": <Bedwars />
    },
    {
        "name": "Skywars",
        "icon": SkywarsIcon,
        "component": <Skywars />
    },
    {
        "name": "Duels",
        "icon": DuelsIcon,
        "component": <Duels />
    },
    {
        "name": "Settings",
        "icon": SettingsIcon,
        "component": <Settings />
    },
]

export default routes