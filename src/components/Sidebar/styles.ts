import styled from 'styled-components'


export const SidebarStyles = styled.nav`
    & {
        display: inline-block;
        // background-color: #fff;
        background-color: var(--secondary-color);
        height: 100vw;
        padding: 0.4rem;
    }

    li {
        // color: #000;
        color: #fff;
        font-size: 1.1rem;
    }

    h3 {
        margin-left: 0.65rem;
        color: #fff;
    }
`

export const SidebarToggleWidget = styled.div`
    & {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
export const SidebarToggle = styled.img`
    & {
        // Convert to white using filter
        filter: brightness(0) saturate(100%) invert(100%) sepia(42%) saturate(0%) hue-rotate(127deg) brightness(103%) contrast(107%);
        margin-bottom: 0.2rem;
    }

    &:hover {
        cursor: pointer;
    }
    
`

// https://stackoverflow.com/questions/13596821/css-align-images-and-text-on-same-line
// holy crap thank this answer so much ^
export const SidebarRoute = styled.li`
    & {
        width: 100%;
        padding: 0.15rem;
    }

    & > * {
        display: inline;
        vertical-align: middle;
    }

    & img {
        padding-right: 1rem;
        cursor: pointer;
    }

    &:hover {
        background-color: #ccc;
        cursor: pointer;
    }

    @media only screen and (max-width: 920px) {
        & span {
            font-size: 0.95rem;
        }
    }
`