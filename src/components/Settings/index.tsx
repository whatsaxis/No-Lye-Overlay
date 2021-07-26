import React, { useState, useEffect, useRef } from 'react'

import { SettingsStyles, Setting } from './styles'

import Validity from '../widgets/Validity/index';
import { Installation, installations } from '../../../electron/settings'

import routes from '../Sidebar/routes'  // TODO Implement settings for individual gamemodes


const Settings: React.FC = () => {

    // Fix for 'Object is possibly null' --> https://github.com/typescript-cheatsheets/react/issues/187#issuecomment-586691729
    const apiValidityRef = useRef<Validity>(null) // useRef() instead of React.createRef()!
    const clientValidityRef = useRef<Validity>(null)

    useEffect(() => {
        // TODO fill fields with stuff from config.json
        const key = 'a'

        const checkAPIKeyOnMount = async () => {
            const node = apiValidityRef.current
            const apiKeyIsValid = await (await fetch(`https://api.hypixel.net/key?key=${key}`)).json()
            
            console.log(apiKeyIsValid)

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
                    onChange={ async (e) => {
                            const node = apiValidityRef.current

                            node?.hide()

                            const apiKeyIsValid = await (await fetch(`https://api.hypixel.net/key?key=${e.target.value}`)).json()
                
                            if (apiKeyIsValid.success) {
                                node?.setValid(true)
                            } else {
                                node?.setValid(false)
                            }

                            window.Main.setSetting("api-key", e.target.value)

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
                    onChange={ async (e) => {
                            const node = clientValidityRef.current

                            node?.hide()

                            const gamePathExists = await window.Main.checkGameDirectory(e.target.value as Installation)

                            if (gamePathExists) {
                                node?.setValid(true)
                            } else {
                                node?.setValid(false)
                            }

                            window.Main.setSetting("log-folder", e.target.value)

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