import { useContext } from 'react'

import { OverlayContext } from "../../App"


const Overlay: React.FC = () => {
    const context = useContext(OverlayContext);

    return (
        <div style={{ color: '#fff' }}>

            { context[0].component }

        </div>
    );
}
 
export default Overlay;