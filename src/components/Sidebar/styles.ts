import styled from 'styled-components'


export const SidebarStyles = styled.nav`
    & {
        display: inline-block;
        background-color: #fff;
        height: 100vw;
        padding: 0.4rem;
    }

    li {
        color: #000;
        font-size: 1.1rem;
    }

    .inline-children {
        text-align: center;
    }

    .inline-children * {
        display: inline-block;
        vertical-align: middle;
    }

    h3 {
        margin-left: 0.65rem;
    }
`

export const SidebarToggle = styled.img`
    & {
        background-image: url('images/menu_toggle.png') no-repeat;
        margin-bottom: 0.45rem;
    }

    &:hover {
        background-image: url('../../assets/images/Sidebar/menu_toggle_hover.png') no-repeat;
    }
`

// https://stackoverflow.com/questions/13596821/css-align-images-and-text-on-same-line
// holy crap thank this answer so much ^
export const SidebarRoute = styled.li`
    & * {
        display: inline;
    }

    & img {
        padding-right: 1rem;
        vertical-align: middle;
    }

    &:hover {
        background-color: #ccc;
        cursor: pointer;
    }
`