import React, { useState, useEffect, useRef } from 'react'
import { DuelsStyles } from './styles'

import { useUsers } from '../../useUsers'


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
                        users.map(user => {
                            console.log(user)
                            return (
                                <tr key={ user.player.uuid }>
                                    <td>SNPR</td>
                                    <td>{ user.player.displayname }</td>
                                    <td>{ user.player.stats.Duels.wins }</td>
                                    <td>{ user.player.stats.Duels.kills }</td>
                                    <td>{ Number(user.player.stats.Duels.wins) / Number(user.player.stats.Duels.losses) }</td>
                                    <td>{ Number(user.player.stats.Duels.kills) / Number(user.player.stats.Duels.deaths) }</td>
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