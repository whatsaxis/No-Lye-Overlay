import Bedwars from '../Bedwars'
import Skywars from '../Skywars'
import Duels from '../Duels'
import Settings from '../Settings'


const ASSETS_FOLDER = "../../../assets";

const routes = [
    {
        "name": "Bedwars",
        "icon": "%ASSETS_FOLDER%/images/bedwars_512x.png",
        "component": <Bedwars />
    },
    {
        "name": "Skywars",
        "icon": "%ASSETS_FOLDER%/images/skywars_512x.png",
        "component": <Skywars />
    },
    {
        "name": "Duels",
        "icon": "%ASSETS_FOLDER%/images/duels_512x.png",
        "component": <Duels />
    },
    {
        "name": "Settings",
        "icon": "%ASSETS_FOLDER%/images/settings_512x.png",
        "component": <Settings />
    },
]

routes.forEach((p, i) => {
    routes[i].icon = routes[i].icon.replace("%ASSETS_FOLDER%", ASSETS_FOLDER)
}, routes)

export default routes;