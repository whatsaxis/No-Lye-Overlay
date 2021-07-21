import { render } from '@testing-library/react'

import Sidebar from './index';
import routes from './routes';

test('Sidebar should render', () => {
    const { getByText, getByAltText } = render(<Sidebar />)


    for (const r of routes) {
        expect(
            getByText(r.name)
        ).toBeTruthy()
    }
})