import React, { createRef, useEffect, useState } from 'react'
import { FormColumn, FormGroup, FormWrapper } from './styled'
import { InputField } from '../../components/InputField/InputField'
import { Formik } from 'formik'
import { Error, ErrorWrapper } from '../../components/common/styled'
import { SelectField } from '../../components/SelectField/SelectField'
import { calculateH, calculateK } from './calcFunctions'

const initialForm = {
    valA: false,
    valB: false,
    valC: false,
    valD: '',
    valE: '',
    valF: '',
    formVariant: 'base'
}

export const CalculationFormScreen = () => {
    const [formValue, setFormValue] = useState(initialForm)

    const [valK, setValK] = useState('')
    const formRef = createRef()

    const validateForm = ({ valA, valB, valC, valD, valE, valF }) => {
        const H = calculateH([valA, valB, valC], formValue)
        const { formVariant } = formValue
        const errors = {}
        if (!H) {
            errors.incorrectInput = true
        }
        if (!valD) {
            errors.valD = 'This field is required'
        } else if (isNaN(valD)) {
            errors.valD = 'Field Number is incorrect'
        }
        if (!valE && (H === 'M' || H === 'P')) {
            errors.valE = 'This field is required'
        } else if (isNaN(valE) && (H === 'M' || H === 'P')) {
            errors.valE = 'Field Number is incorrect'
        }
        if (!valF && (H === 'P' || H === 'T' || (formVariant === 'custom2' ? H === 'M' : false))) {
            errors.valF = 'This field is required'
        } else if (isNaN(valF) && (H === 'P' || H === 'T' || (formVariant === 'custom2' ? H === 'M' : false))) {
            errors.valF = 'Field Number is incorrect'
        }
        console.log('err', errors)
        return errors
    }

    useEffect(
        () => {
            if (!Object.keys(formRef.current.errors).length) {
                setValK(calculateK(formRef.current, formValue))
            }
        },
        [formValue]
    )

    return (
        <FormWrapper>
            <Formik initialValues={initialForm} validate={validateForm} innerRef={formRef}>
                {({ errors, values, touched, handleChange, setFieldTouched }) => {
                    const onChange = e => {
                        const targetEl = e.target
                        const fieldName = targetEl.name
                        handleChange(e)
                        setTimeout(
                            () =>
                                setFormValue({
                                    ...formValue,
                                    [fieldName]: targetEl.type === 'checkbox' ? targetEl.checked : targetEl.value
                                }),
                            0
                        )
                    }
                    return (
                        <>
                            <FormGroup>
                                <FormColumn>
                                    <InputField
                                        onChange={onChange}
                                        setFieldTouched={setFieldTouched}
                                        name="valA"
                                        type="checkbox"
                                        checked={values.valA}
                                        label="A"
                                        aria-label="valA"
                                    />
                                    <InputField
                                        onChange={onChange}
                                        setFieldTouched={setFieldTouched}
                                        name="valB"
                                        type="checkbox"
                                        checked={values.valB}
                                        label="B"
                                        aria-label="valB"
                                    />
                                    <InputField
                                        onChange={onChange}
                                        setFieldTouched={setFieldTouched}
                                        name="valC"
                                        type="checkbox"
                                        checked={values.valC}
                                        label="C"
                                        aria-label="valC"
                                    />
                                    <ErrorWrapper fontSize={20}>
                                        {errors.incorrectInput && <Error>Incorrect input parameters</Error>}
                                    </ErrorWrapper>
                                </FormColumn>
                                <FormColumn>
                                    <InputField
                                        onChange={onChange}
                                        setFieldTouched={setFieldTouched}
                                        name="valD"
                                        value={values.valD}
                                        float
                                        label="D"
                                        aria-label="valD"
                                        error={touched.valD && errors.valD}
                                    />
                                    <InputField
                                        onChange={onChange}
                                        setFieldTouched={setFieldTouched}
                                        name="valE"
                                        value={values.valE}
                                        int
                                        label="E"
                                        aria-label="valE"
                                        error={touched.valE && errors.valE}
                                    />
                                    <InputField
                                        onChange={onChange}
                                        setFieldTouched={setFieldTouched}
                                        name="valF"
                                        value={values.valF}
                                        int
                                        label="F"
                                        aria-label="valF"
                                        error={touched.valF && errors.valF}
                                    />
                                </FormColumn>
                            </FormGroup>
                            <FormGroup>
                                <FormColumn>
                                    <InputField disabled value={valK} label="K" aria-label="valK" />
                                </FormColumn>
                                <FormColumn>
                                    <SelectField
                                        name="formVariant"
                                        value={values.formVariant}
                                        label="Form Type"
                                        onChange={onChange}
                                    >
                                        <option>base</option>
                                        <option>custom1</option>
                                        <option>custom2</option>
                                    </SelectField>
                                </FormColumn>
                            </FormGroup>
                        </>
                    )
                }}
            </Formik>
        </FormWrapper>
    )
}
