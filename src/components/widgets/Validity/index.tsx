import { Valid, Invalid } from './styles'

import ValidIcon from '../../../../assets/images/Validity/valid.svg'
import InvalidIcon from '../../../../assets/images/Validity/invalid.svg'

export interface Props {
    valid: boolean
}
 
const Validity: React.FC<Props> = (props) => {
    let image = <img src={ InvalidIcon } />
    let text = <p>Invalid</p>

    if (props.valid) {
        image = <img src={ ValidIcon } />;
        text = <p>Valid</p>
    }

    return (
        <div className="validity">
            { props.valid ? <Valid>{ image } { text }</Valid> : <Invalid>{ image } { text }</Invalid> }
        </div>
    );
}
 
export default Validity;