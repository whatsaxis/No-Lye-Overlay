import { useContext } from 'react'

import { OverlayContext } from "../../App"

import { OverlayContainer } from './styles'


const Overlay: React.FC = () => {
    const context = useContext(OverlayContext);

    return (
        <OverlayContainer>

            { context[0].component }

        </OverlayContainer>
    );
}
 
export default Overlay;