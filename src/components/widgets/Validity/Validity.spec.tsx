import { render } from '@testing-library/react'

import Validity from './index';


test('Validity should render with valid prop set to true', () => {
    const { getByText, getByAltText } = render(<Validity />)

    expect(
        getByText("Valid")
    ).toBeTruthy()
})

test('Validity should render with valid prop set to false', () => {
    const { getByText, getByAltText } = render(<Validity />)

    expect(
        getByText("Invalid")
    ).toBeTruthy()
})