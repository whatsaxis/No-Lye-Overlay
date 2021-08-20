import { useUsers } from '../../useUsers'
import { getRankJSX, checkSettings } from '../../helpers'

import { getTag } from './tags'

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
                        <tr>
                            <td>Tag</td>
                            <td>Name</td>
                            <td>Wins</td>
                            <td>Kills</td>
                            <td>WLR</td>
                            <td>KDR</td>
                            <td>WS</td>
                            <td>BWS</td>
                            <td>Title</td>
                            <td>Score</td>
                        </tr>
                        {
                            users.map((user) => {
                                const stats = getTag(user)

                                return (
                                    <tr key={ user._internalUsername } className={ stats?.classTag === 'error' ? 'error' : '' }>
                                        <td className={ stats?.classTag }>{ stats?.tag }</td>
                                        <td>{ getRankJSX(user) }</td>
                                        <td className={ stats?.winsColor }>{ stats?.wins }</td>
                                        <td className={ stats?.killsColor }>{ stats?.kills }</td>
                                        <td className={ stats?.wlrColor }>{ stats?.wlr }</td>
                                        <td className={ stats?.kdrColor }>{ stats?.kdr }</td>
                                        <td className={ stats?.wsColor }>{ stats?.ws }</td>
                                        <td className={ stats?.bwsColor }>{ stats?.bws }</td>
                                        <td>{ stats?.title }</td>
                                        <td>{ stats?.score }</td>
                                    </tr>
                                )

                                
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