import { render } from '@testing-library/react'

import Overlay from './index';


test('Overlay Display should render', () => {
    const { getByText, getByAltText } = render(<Overlay />)

    // TODO
})