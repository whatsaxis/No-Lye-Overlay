import { render } from '@testing-library/react'

import Skywars from './index';


test('Skywars Overlay should render', () => {
    const { getByText, getByAltText } = render(<Skywars />)

    // TODO
})