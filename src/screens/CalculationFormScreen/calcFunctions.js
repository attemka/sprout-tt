export const calculateH = (values, formValue = {}) => {
    const [valA, valB, valC] = values
    const { formVariant } = formValue
    const options = {
        M: valA && valB && !valC,
        P: valA && valB && valC,
        T: !valA && valB && valC
    }
    if (formVariant === 'custom2') {
        options['M'] = valA && !valB && valC
        options['T'] = valA && valB && !valC
    }
    return Object.keys(options).find(key => options[key])
}

export const calculateK = (form, formValue) => {
    let { valA, valB, valC, valD, valE, valF, formVariant } = formValue
    valD = parseFloat(valD)
    valE = parseInt(valE)
    valF = parseInt(valF)
    const H = calculateH([valA, valB, valC])
    let K = ''
    if (H === 'M') {
        if (formVariant === 'base') {
            K = valD + (valD * valE) / 10
        } else if (formVariant === 'custom2') {
            K = valF + valD + (valD * valE) / 100
        }
    } else if (H === 'P') {
        if (formVariant === 'base') {
            K = valD + (valD * (valE - valF)) / 25.5
        } else if (formVariant === 'custom1') {
            K = 2 * valD + (valD * valE) / 100
        }
    } else if (H === 'T') {
        K = valD - (valD * valF) / 30
    }
    return K
}
