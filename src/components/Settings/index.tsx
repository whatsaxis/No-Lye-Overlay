import React, { useEffect, useRef } from 'react'

import { SettingsStyles, Setting } from './styles'

import Validity from '../widgets/Validity/index';
import { Installation, installations } from '../../../electron/constants'

// TODO Implement settings for individual gamemodes
import routes from '../Sidebar/routes'


const Settings: React.FC = () => {

    /*
    * Validity Refs
    */

    // Fix for 'Object is possibly null' --> https://github.com/typescript-cheatsheets/react/issues/187#issuecomment-586691729
    const apiValidityRef = useRef<Validity>(null) // useRef() instead of React.createRef()!
    const clientValidityRef = useRef<Validity>(null)
    
    // Initial Render Code
    useEffect(() => {
        const checkAPIKeyOnMount = async () => {
            const node = apiValidityRef.current
            const apiKeyIsValid = await (await fetch(`https://api.hypixel.net/key?key=${window.Main.getSetting('api_key')}`)).json()

            if (apiKeyIsValid.success) {
                node?.setValid(true)
            } else {
                node?.setValid(false)
            }

            apiValidityRef.current?.show()
        }

        const checkGameInstallationOnMount = async () => {
            const node = clientValidityRef.current
            const gamePathExists = await window.Main.checkGameDirectory(installations[0])

            if (gamePathExists) {
                node?.setValid(true)
            } else {
                node?.setValid(false)
            }

            clientValidityRef.current?.show()
        }

        checkAPIKeyOnMount()
        checkGameInstallationOnMount()
    }, [])   

    return (
        <SettingsStyles>

            <h1>Settings Menu</h1>

            <h2>General Settings</h2>
            <Setting>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    spellCheck="false"
                    onChange={ (e) => window.Main.setSetting("username", e.target.value) }
                    defaultValue={ window.Main.getSetting('username') }
                />
            </Setting>

            <Setting>
                <label>API Key</label>
                <Validity ref={ apiValidityRef } />
                <input
                    type="text"
                    name="api-key"
                    spellCheck="false"
                    className="blur"
                    defaultValue={ window.Main.getSetting('api_key') }
                    onChange={
                        async (e) => {
                            const node = apiValidityRef.current

                            node?.hide()

                            const apiKeyIsValid = await (await fetch(`https://api.hypixel.net/key?key=${e.target.value}`)).json()

                            if (apiKeyIsValid.success) {
                                window.Main.setSetting("api_key", e.target.value)

                                node?.setValid(true)
                            } else {
                                node?.setValid(false)
                            }

                            node?.show()
                        }
                    }
                />
            </Setting>

            <h2>Log File</h2><br />

            <Setting className="inline-children">
                <label>Client</label>
                <Validity ref={ clientValidityRef } />
                <select
                    name="clients"
                    defaultValue={ window.Main.getSetting('client') }
                    onChange={
                        async (e) => {
                            const node = clientValidityRef.current

                            node?.hide()

                            const gamePathExists = await window.Main.checkGameDirectory(e.target.value as Installation)

                            if (gamePathExists) {
                                window.Main.setSetting("client", e.target.value)

                                const logsDir = await window.Main.getLogsDirectoryFromInstallation(e.target.value as Installation)
                                window.Main.setSetting("logs_dir", logsDir)

                                node?.setValid(true)
                            } else {
                                node?.setValid(false)
                            }

                            node?.show()
                        }
                    }
                >
                    <option value="vanilla">Vanilla / Forge</option>
                    <option value="lunar">Lunar</option>
                    <option value="badlion">Badlion</option>
                    <option value="pvplounge">PVP Lounge</option>
                </select>
            </Setting>
            
        </SettingsStyles>
    );
}
 
export default Settings;