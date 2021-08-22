import { useUsers } from '../../useUsers'
import { checkSettings } from '../../helpers'

import { columns } from './tags'
import { generateFirstRow, parseColumns } from '../../columns'

import { DuelsStyles } from './styles'
import BinIcon from '../../../assets/images/Overlays/bin.svg'

// https://chiragagrawal65.medium.com/how-to-import-ipcrenderer-in-renderer-process-component-26fef55fa4b7

const Duels: React.FC = () => {
    if (checkSettings()) {
        const { users, clearUsers } = useUsers()

        return (
            <DuelsStyles>
    
                <button onClick={ () => clearUsers() } id="clear-users"><img height={ 20 } src={ BinIcon } /></button>
                <table>
                    <tbody>
                        { generateFirstRow(columns) }
                        {
                            users.map((user) => {
                                return parseColumns(user, columns)
                            })
                        }
                    </tbody>
                </table>
    
            </DuelsStyles>
        )
    } else {
        return (<h2>⚠️ API Key or Client Settings are invalid / have not been set!</h2>)
    }
    
}
 
export default Duels;