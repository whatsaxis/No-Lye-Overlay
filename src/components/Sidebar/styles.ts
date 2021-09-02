import styled from 'styled-components'


export const SidebarStyles = styled.nav`
    & {
        display: inline-block;
        background-color: #171717;
        height: 100%;
        padding: 0.4rem;

        margin-right: 0.25rem;

        float: left;
    }

    ul {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    li {
        color: #fff;
        font-size: 1.1rem;
    }

    h3 {
        margin-left: 0.65rem;
        color: #fff;
    }

    .selected {
        background-color: #3e424b;
        border-radius: 6px;
    }
`

export const Icon = styled.img`
    & {
        height: 35px;
        width: 35px;

        margin-bottom: 1rem;
    }
`

// https://stackoverflow.com/questions/13596821/css-align-images-and-text-on-same-line
export const SidebarRoute = styled.li`
    & {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        width: 30px;

        margin-bottom: 0.5rem;
    }

    & > * {
        display: inline;
        vertical-align: middle;
    }

    & img {
        cursor: pointer;
    }

    &:hover {
        cursor: pointer;
        background-color: #3e424b;
        border-radius: 6px;
    }
`