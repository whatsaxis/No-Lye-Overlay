import styled from 'styled-components'


// TODO
// #191621

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
    -webkit-app-region: no-drag;
    border: 0;
    background-color: transparent;
    float: right;
    padding-right: 0.5rem;
`