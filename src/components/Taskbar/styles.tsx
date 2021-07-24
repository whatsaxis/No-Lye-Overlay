import styled from 'styled-components'


// NOTE: #191621 sexy AF background color

export const TaskbarStyles = styled.div`
    font-family: Minecraft;
    background-color: #829399;
    -webkit-app-region: drag
`

export const TaskbarStatic = styled.div`
    display: inline-block;
    user-select: none;
    text-align: center;
    padding: 0.2rem;
`

export const TaskbarControl = styled.button`
    & {
        float: right;
        padding-right: 0.5rem;
        border: none;
        background: none;
        top: -4px;
        cursor: pointer;
        width: 28px;
        height: 22px;
        pointer-events: auto;
        -webkit-app-region: no-drag;
    }
`