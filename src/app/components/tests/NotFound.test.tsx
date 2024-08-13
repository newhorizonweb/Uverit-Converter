


// RTL & React
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// i18next
import { I18nextProvider } from 'react-i18next';
import i18next from "../../core/i18n";

// Components
import NotFound from '../NotFound';
import units from '../../../assets/json/units.json';

// Mocks
const mockNotFound = () => {
    return(
        <BrowserRouter>
            <I18nextProvider i18n={i18next}>
                <NotFound />
            </I18nextProvider>
        </BrowserRouter>
    )
}



    /* Tests */

describe("Not Found", () => {

    it('checks if the "back to home" button redirects to the landing page', async () => {
        render(mockNotFound());
        
        const goBackBtn = await screen.findByTestId("go-back-btn");
        goBackBtn.click();
        expect(window.location.pathname).toBe("/Uverit-Converter");

    });

});