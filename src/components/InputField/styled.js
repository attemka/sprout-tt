import styled from 'styled-components'

export const CustomInput = styled.input`
    &[type='checkbox'] {
        -ms-transform: scale(2);
        -moz-transform: scale(2);
        -webkit-transform: scale(2);
        -o-transform: scale(2);
        transform: scale(2);
        padding: 10px;
    }
`

export const CustomFieldWrapper = styled.div`
    height: 48px;
`

export const FieldLabel = styled.label`
    width: ${({longLabel}) => longLabel ? '130px' : '30px'};
    display: inline-block;
`
