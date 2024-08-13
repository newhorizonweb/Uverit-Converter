


// RTL & React
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { prettyDOM } from '@testing-library/dom';
import { act } from 'react';

// i18next
import { I18nextProvider } from 'react-i18next';
import i18next from "../../core/i18n";

// Components
import LinkTiles from '../LinkTiles';
import units from '../../../assets/json/units.json';

// Mocks
const mockLinkTiles = () => {
    return(
        <BrowserRouter>
            <I18nextProvider i18n={i18next}>
                <LinkTiles />
            </I18nextProvider>
        </BrowserRouter>
    )
}



    /* Tests */

describe("Link Tiles", () => {

    let container;
    
    beforeEach(() => {
        container = render(mockLinkTiles());
    });

    it('checks if the tiles are rendered', async () => {
        const tile = await screen.findByTestId("tile-link-common");
        expect(tile).toBeInTheDocument();
    });

    it('checks if the correct number of tiles is rendered', async () => {
        const totalElements = Object.values(units)
            .map(array => array.length)
            .reduce((sum, length) => sum + length, 0);

        const tiles = screen.getAllByTestId(/tile-link-/);
        expect(tiles.length).toBe(totalElements);
    });

});