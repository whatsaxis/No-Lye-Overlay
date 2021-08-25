import React, { useEffect, useRef } from 'react'

import { SettingsStyles, Setting, Credits } from './styles'

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
      <h1>Settings</h1>

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
          name="api-key"
          type="text"
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

      <h2>Appearance</h2>
      <Setting>
        <label>Transparency</label>
        <input
          name="transparency"
          type="range"
          defaultValue={ Number(window.Main.getSetting('transparency')) * 100 }
          min={ 30 }
          max={ 100 }
          onChange={ async e => {
            const transparency = Number(e.target.value) / 100

            console.log(transparency)
            window.Main.setTransparency(transparency)
            window.Main.setSetting({ name: 'transparency', value: transparency })
          } }
        />
      </Setting>

      <h2>Log File</h2>

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

      <Credits>
        <p>Made by WhatsAxis</p>
        <div>
          <svg height="23" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true">
              <path fillRule="evenodd" fill="#fff" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
          <a href="https://github.com/whatsaxis">github.com/whatsaxis</a>
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/discord.svg" alt="nchrpEQg33" height="30" width="40" /> <code>WhatsAxis#8762</code>
        </div>
      </Credits>
    </SettingsStyles>
  )
}

export default Settings
