import { useUsers } from '../../useUsers'
import { isNick, getRankJSX } from '../../helpers'

import { DuelsStyles } from './styles'

// https://chiragagrawal65.medium.com/how-to-import-ipcrenderer-in-renderer-process-component-26fef55fa4b7

const Duels: React.FC = () => {
    const users = useUsers()

    return (
        <DuelsStyles>

            <table>
                <tbody>
                    <tr>
                        <td>Tag</td>
                        <td>Name</td>
                        <td>Wins</td>
                        <td>Kills</td>
                        <td>WLR</td>
                        <td>KDR</td>
                    </tr>
                    {
                        users.map((user, i) => {
                            console.log(user)
                            return (
                                <tr key={ i }>
                                    <td>{ isNick(user) ? <span className="nick">NICK</span> : '' }</td>
                                    <td>{ isNick(user) ? <span className="nick">{ user._internalUsername }</span> : getRankJSX(user) }</td>
                                    <td>{ isNick(user) ? 'N/A' : (user?.player?.stats?.Duels?.wins ? user?.player?.stats?.Duels?.wins : "0") }</td>
                                    <td>{ isNick(user) ? 'N/A' : (user?.player?.stats?.Duels?.kills ? user?.player?.stats?.Duels?.kills : "0") }</td>
                                    <td>{ isNick(user) ? 'N/A' : String(Math.round(Number(user?.player?.stats?.Duels?.wins) / Number(user?.player?.stats?.Duels?.losses) * 100) / 100) }</td>
                                    <td>{ isNick(user) ? 'N/A' : String(Math.round(Number(user?.player?.stats?.Duels?.kills) / Number(user?.player?.stats?.Duels?.deaths) * 100) / 100) }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </DuelsStyles>
    );
}
 
export default Duels;