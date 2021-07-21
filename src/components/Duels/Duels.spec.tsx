import { render } from '@testing-library/react'

import Duels from './index';


test('Duels Overlay should render', () => {
    const { getByText, getByAltText } = render(<Duels />)

    // TODO
})