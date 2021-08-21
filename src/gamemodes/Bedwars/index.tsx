import { useUsers } from '../../useUsers'

import { columns } from './tags'
import { generateFirstRow, parseColumns } from '../../columns'

import { checkSettings } from '../../helpers'

import { BedwarsStyles } from './styles'
import BinIcon from '../../../assets/images/Overlays/bin.svg'


const Bedwars: React.FC = () => {
        if (checkSettings()) {
            const { users, clearUsers } = useUsers()
    
            console.log(generateFirstRow(columns))

            return (
                <BedwarsStyles>
        
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
        
                </BedwarsStyles>
            )
        } else {
            return (<h2>⚠️ API Key or Client Settings are invalid / have not been set!</h2>)
        }
}

export default Bedwars