import { useEffect } from 'react';
import { DuelsStyles } from './styles';

export interface Props {
    
}

// https://chiragagrawal65.medium.com/how-to-import-ipcrenderer-in-renderer-process-component-26fef55fa4b7
 
const Duels: React.FC<Props> = () => {
    useEffect(() => {
        window.Main.on('server_change', (e: any, value: any) => {
            console.log(value)
        })
        
        window.Main.on('join', (e: any, value: any) => {
            console.log(value)
        })
        
        window.Main.on('leave', (e: any, value: any) => {
            console.log(value)
        })
    }, [])

    return (
        <DuelsStyles>

            <h1>Duels Overlay</h1>
            <p>This module is still in maintenence! 🚧</p>

        </DuelsStyles>
    );
}
 
export default Duels;