import { useContext } from 'react'

import { OverlayContext } from '../../App'

import { OverlayStyles } from './styles'

const Overlay: React.FC = () => {
    const context = useContext(OverlayContext);

    return (
        <OverlayStyles>

            { context[0].component }

        </OverlayStyles>
    );
}
 
export default Overlay