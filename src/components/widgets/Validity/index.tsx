import React from 'react'

import { Valid, Invalid, Hidden } from './styles'

import ValidIcon from '../../../../assets/images/Validity/valid.svg'
import InvalidIcon from '../../../../assets/images/Validity/invalid.svg'


type State = { 
    valid: boolean,
    hidden: boolean,
}
class Validity extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props)
        this.state = { valid: false, hidden: true }
    }

    render() {
        return (
            <div className="validity">
                { this.state.hidden ? 
                    <Hidden>
                        {
                            this.state.valid ?
                                <Valid><img src={ ValidIcon } /><p>Valid</p></Valid> :
                                <Invalid><img src={ InvalidIcon } /><p>Invalid</p></Invalid>
                        }
                    </Hidden>
                    :
                    <>
                        {
                            this.state.valid ?
                                <Valid><img src={ ValidIcon } /><p>Valid</p></Valid> :
                                <Invalid><img src={ InvalidIcon } /><p>Invalid</p></Invalid>
                        }
                    </>
                }
                
            </div>
        )
    }

    setValid(value: boolean) {
        this.setState({ valid: value })
    }

    hide() {
        this.setState({ hidden: true })
    }

    show() {
        this.setState({ hidden: false })
    }
}
 
export default Validity