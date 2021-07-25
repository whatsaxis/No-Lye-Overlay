import { useState } from 'react'

import { SettingsStyles, Setting } from './styles'

import Validity from '../widgets/Validity/index';

import routes from '../Sidebar/routes'


const Settings: React.FC = () => {
    const settings = useState({});

    return (
        <SettingsStyles>

            <h1>Settings Menu</h1>

            <h2>General Settings</h2>
            <Setting>
                <label>Username</label>
                <input type="text" name="username" spellCheck="false" />
            </Setting>

            <Setting>
                <label>API Key</label>
                <Validity valid={ true } />
                <input type="text" name="api-key" spellCheck="false" className="blur" />
            </Setting>

            <h2>Log File</h2><br />

            <Setting className="inline-children">
                <label>Client</label>
                <Validity valid={ true } />
                <select name="clients">
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