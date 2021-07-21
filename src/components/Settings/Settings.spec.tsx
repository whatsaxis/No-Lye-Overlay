import { render } from '@testing-library/react'

import Settings from './index';


test('Settings Menu should render', () => {
    const { getByText, getByAltText } = render(<Settings />)

    // TODO
})