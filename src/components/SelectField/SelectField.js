import React from 'react'
import { CustomFieldWrapper, FieldLabel } from '../InputField/styled'

export const SelectField = ({ children, name, label, ...props }) => (
    <CustomFieldWrapper>
        <FieldLabel htmlFor={name} longLabel>{label}</FieldLabel>
        <select name={name} {...props}>{children}</select>
    </CustomFieldWrapper>
)
