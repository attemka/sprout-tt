import React from 'react'
import { CustomInput, CustomFieldWrapper, FieldLabel } from './styled'
import { floatRegex, intRegex } from '../../utils/utils'
import { Error } from '../common/styled'

export const InputField = ({ float, int, onChange, label, name, setFieldTouched, error, ...props }) => {
    const handleChange = e => {
        let event = e
        if (float) {
            if (!floatRegex.test(e.target.value)) return
            else
                event = {
                    target: {
                        name: e.target.name,
                        value: e.target.value.replace(/^0+/, '')
                    }
                }
        } else if (int) {
            if (!intRegex.test(e.target.value)) return
            else
                event = {
                    target: {
                        name: e.target.name,
                        value: e.target.value.replace(/^0+/, '')
                    }
                }
        }
        setFieldTouched(name, true, true)
        return onChange(event)
    }

    return (
        <CustomFieldWrapper>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            <CustomInput onChange={handleChange} name={name} {...props} />
            {error && <Error style={{ marginLeft: '30px' }}>{error}</Error>}
        </CustomFieldWrapper>
    )
}
