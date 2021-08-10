import { render } from '@testing-library/react'

import Bedwars from './index';


test('Bedwars Overlay should render', () => {
    const { getByText, getByAltText } = render(<Bedwars />)

    // TODO
})