import styled from 'styled-components'

export const Hidden = styled.div`
    visibility: hidden;
`

export const Valid = styled.div`
    & {
        color: #23c552;
        text-align: center;
        font-size: 1.2rem;
    }       

    & > * {
        display: inline;
        vertical-align: middle; 
    }

    & img {
        height: 30px;
    }
`

export const Invalid = styled.div`
    & {
        color: #f84f31;
        text-align: center;
        font-size: 1.2rem;
    }       

    & > * {
        display: inline;
        vertical-align: middle; 
    }

    & img {
        height: 30px;
    }
`