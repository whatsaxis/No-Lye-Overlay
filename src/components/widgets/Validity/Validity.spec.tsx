import { render } from '@testing-library/react'

import Validity from './index';


test('Taskbar should render with valid prop set to true', () => {
    const { getByText, getByAltText } = render(<Validity valid={ true } />)

    expect(
        getByText("Valid")
    ).toBeTruthy()
})

test('Taskbar should render with valid prop set to false', () => {
    const { getByText, getByAltText } = render(<Validity valid={ false } />)

    expect(
        getByText("Invalid")
    ).toBeTruthy()
})