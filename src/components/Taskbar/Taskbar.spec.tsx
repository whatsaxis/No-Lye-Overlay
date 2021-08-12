import { render } from '@testing-library/react'

import Taskbar from './index';


test('Taskbar should render', () => {
    const { getByText, getByAltText } = render(<Taskbar />)

    expect(
        getByText('No Lye Overlay')
    ).toBeTruthy()
})