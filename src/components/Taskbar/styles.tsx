import styled from 'styled-components'


// NOTE: #191621 sexy AF background color

export const TaskbarStyles = styled.div`
    font-family: Minecraft;
    // background-color: #829399;
    background-color: var(--tsheme-color);
    height: 25px;
    -webkit-app-region: drag;
`

export const TaskbarTitle = styled.h4`
    display: inline-block;
    text-align: center;
    padding: 0.2rem;
    color: #fff;
    font-weight: bold;
    -webkit-app-region: drag;
`

export const TaskbarControl = styled.button`
    & {
        float: right;
        padding: 0.2rem;
        border: none;
        background: none;
        cursor: pointer;
        width: 28px;
        height: 25px;
        pointer-events: auto;
        -webkit-app-region: no-drag;
    }

    & img {
        width: 14px;
        height: 100%;
        // This converts to white
        // https://codepen.io/sosuke/pen/Pjoqqp
        filter: brightness(0) saturate(100%) invert(100%) sepia(42%) saturate(0%) hue-rotate(127deg) brightness(103%) contrast(107%);
        cursor: pointer;
    }

    &:hover {
        background-color: #3e424b;
    }
`