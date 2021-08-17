import { useUsers } from '../../useUsers'
import { getRankJSX, checkSettings } from '../../helpers'

import { getTag } from './tags'

import { SkywarsStyles } from './styles'
import BinIcon from '../../../assets/images/Overlays/bin.svg'


const Skywars: React.FC = () => {
        if (checkSettings()) {
            const { users, clearUsers } = useUsers()
    
            return (
                <SkywarsStyles>
        
                    <button onClick={ () => clearUsers() } id="clear-users"><img height={ 20 } src={ BinIcon } /></button>
                    <table>
                        <tbody>
                            <tr>
                                <td>Tag</td>
                                <td>Name</td>
                                <td>Wins</td>
                                <td>Kills</td>
                                <td>WLR</td>
                                <td>KDR</td>
                                <td>Star</td>
                                <td>Score</td>
                            </tr>
                            {
                                users.map((user, i) => {
                                    console.log(user._internalUsername)
                                    const stats = getTag(user)
    
                                    return (
                                        <tr key={ user._internalUsername } className={ stats?.classTag === 'error' ? 'error' : '' }>
                                            <td className={ stats?.classTag }>{ stats?.tag }</td>
                                            <td>{ getRankJSX(user) }</td>
                                            <td className={ stats?.winsColor }>{ stats?.wins }</td>
                                            <td className={ stats?.killsColor }>{ stats?.kills }</td>
                                            <td className={ stats?.wlrColor }>{ stats?.wlr }</td>
                                            <td className={ stats?.kdrColor }>{ stats?.kdr }</td>
                                            <td>{ stats?.star }</td>
                                            <td>{ stats?.score }</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
        
                </SkywarsStyles>
            )
        } else {
            return (<h2>⚠️ API Key or Client Settings are invalid / have not been set!</h2>)
        }
}
 
export default Skywars;