import styled from 'styled-components'

export const FormWrapper = styled.div`
    width: 600px;
    height: 300px;
    background: gray;
    padding: 16px;
`

export const FormGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 20px;
    padding-bottom: 10px;

    & > div {
        flex: 0 45%;
    }
`

export const FormColumn = styled.div`
    display: flex;
    flex-direction: column;
    & > div {
        padding: 8px;
    }
`
