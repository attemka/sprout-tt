import React from 'react'
import ReactDOM from 'react-dom'
import { render, cleanup, fireEvent, waitFor} from '@testing-library/react'

import { CalculationFormScreen } from './CalculationFormScreen'

describe('Calculation Form', () => {
    afterEach(cleanup)

    const setup = () => {
        const container = render(<CalculationFormScreen />)
        return { container }
    }

    test('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<CalculationFormScreen />, div)
    })

    test('error shown', async () => {
        const { container } = setup()
        const inputFieldE = container.getByLabelText('valE')
        fireEvent.change(inputFieldE, { target: { value: '22' } })
       await waitFor( () => {} )
        const error = await container.getByText(/Incorrect input parameters/i)
        expect(error).toBeTruthy()
    })

    test('K value is calculated correctly', async () => {
        const { container } = setup()
        const inputFieldA = container.getByLabelText('valA')
        const inputFieldB = container.getByLabelText('valB')
        const inputFieldC = container.getByLabelText('valC')
        const inputFieldD = container.getByLabelText('valD')
        const inputFieldE = container.getByLabelText('valE')
        const inputFieldF = container.getByLabelText('valF')

        fireEvent.click(inputFieldA)
        await waitFor( () => {} )
        fireEvent.click(inputFieldB)
        await waitFor( () => {} )
        fireEvent.click(inputFieldC)
        await waitFor( () => {} )
        fireEvent.change(inputFieldD, { target: { value: '13' } })
        await waitFor( () => {} )
        fireEvent.change(inputFieldE, { target: { value: '54' } })
        await waitFor( () => {} )
        fireEvent.change(inputFieldF, { target: { value: '3' } })
        await waitFor( () => {} )
        await waitFor( () => expect(container.getByLabelText('valK').value).toBe('39'))
    })


})
