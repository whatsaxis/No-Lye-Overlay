import styled from 'styled-components'


export const Valid = styled.div`
    & {
        color: #23c552;
        text-align: center;
        font-size: 0.9rem;
    }       

    & > * {
        display: inline;
    }

    & img {
        vertical-align: middle; 

        height: 30px;
    }
`

export const Invalid = styled.div`
    & {
        color: #f84f31;
        text-align: center;
        font-size: 0.9rem;
    }       

    & > * {
        display: inline;
    }

    & img {
        vertical-align: middle;

        height: 28px;
    }
`