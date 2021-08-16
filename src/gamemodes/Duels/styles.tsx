import styled from 'styled-components'


// TODO

export const DuelsStyles = styled.div`
    table {
        margin-left: auto;
        margin-right: auto;
    }

    tr:first-of-type:hover {
        background-color: none;
    }

    #clear-users {
        border: 0;
        background: 0;
        padding: 0.5rem;
    }

    #clear-users:hover {
        background-color: #3e424b;
        cursor: pointer;
    }

    #clear-users *:hover {
        cursor: pointer;
    }
`