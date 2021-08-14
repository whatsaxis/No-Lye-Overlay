import React, { useEffect, useRef } from 'react'

import { SettingsStyles, Setting } from './styles'

import Validity from '../widgets/Validity/index'
import { Installation } from '../../../electron/settings'

import routes from '../Sidebar/routes' // TODO Implement settings for individual gamemodes

const Settings: React.FC = () => {
  // Fix for 'Object is possibly null' --> https://github.com/typescript-cheatsheets/react/issues/187#issuecomment-586691729
  const apiValidityRef = useRef<Validity>(null) // useRef() instead of React.createRef()!
  const clientValidityRef = useRef<Validity>(null)

  // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
  useEffect(() => {
    let isMounted = true

    const checkAPIKeyOnMount = async () => {
      const node = apiValidityRef.current
      const apiKeyIsValid = await (
        await fetch(
          `https://api.hypixel.net/key?key=${ window.Main.getSetting('api-key') }`
        )
      ).json()

      if (isMounted) {
        if (apiKeyIsValid.success) {
          node?.setValid(true)
        } else {
          node?.setValid(false)
        }
      }

      apiValidityRef.current?.show()
    }

    const checkGameInstallationOnMount = async () => {
      const node = clientValidityRef.current
      const installation = window.Main.getSetting('client')

      if (installation !== 'none') {
        const gamePathExists = await window.Main.checkGameDirectory(
            installation
          )
    
        if (isMounted) {
            if (gamePathExists) {
                node?.setValid(true)
                
                node?.show()
            } else {
                node?.setValid(false)

                window.Main.setSetting({ name: 'client', value: 'none' })
            }
        }
      }
    }

    checkAPIKeyOnMount()
    checkGameInstallationOnMount()

    return () => {
      isMounted = false
    }
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
          maxLength={ 16 }
          defaultValue={ window.Main.getSetting('username') }
          onChange={e =>
            window.Main.setSetting({ name: 'username', value: e.target.value })
          }
        />
      </Setting>

      <Setting>
        <label>API Key</label>
        <Validity ref={apiValidityRef} />
        <input
          type="text"
          name="api-key"
          spellCheck="false"
          className="blur"
          defaultValue={ window.Main.getSetting('api-key') }
          onChange={ async e => {
            const node = apiValidityRef.current

            node?.hide()

            const apiKeyIsValid = await (
              await fetch(`https://api.hypixel.net/key?key=${e.target.value}`)
            ).json()

            if (apiKeyIsValid.success) {
              window.Main.setSetting({ name: 'api-key', value: e.target.value })
              node?.setValid(true)
            } else {
              node?.setValid(false)
            }

            node?.show()
          }}
        />
      </Setting>

      <h2>Log File</h2>
      <br />

      <Setting className="inline-children">
        <label>Client</label>
        <Validity ref={clientValidityRef} />
        <select
          name="clients"
          defaultValue={ window.Main.getSetting('client') }
          onChange={ async e => {
            const node = clientValidityRef.current

            node?.hide()

            if (e.target.value !== 'none') {
              const gamePathExists = await window.Main.checkGameDirectory(
                e.target.value as Installation
              )

              if (gamePathExists) {
                node?.setValid(true)
                window.Main.setSetting({
                  name: 'client',
                  value: e.target.value,
                })
              } else {
                node?.setValid(false)
              }

              node?.show()
            } else {
              window.Main.setSetting({
                name: 'client',
                value: e.target.value,
              })
            }
          }}
        >
          <option value="vanilla">Vanilla / Forge</option>
          <option value="lunar">Lunar</option>
          <option value="badlion">Badlion</option>
          <option value="pvplounge">PVP Lounge</option>
          <option value="none">None</option>
        </select>
      </Setting>
    </SettingsStyles>
  )
}

export default Settings
