


// RTL & React
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { prettyDOM } from '@testing-library/dom';

// i18next
import { I18nextProvider } from 'react-i18next';
import i18next from "../../core/i18n";

// Assets
import ConverterFields from '../ConverterFields';
import { ConvContext } from '../Converter';
import data from '../../../assets/json/common.json';

const context = {
    data: data,
    groupName: 'length',
    converterName: 'common'
}


    /* Tests */

describe("Converter Fields", () => {

    let container;
    
    beforeEach(() => {
        container = render(
            <BrowserRouter>
                <I18nextProvider i18n={i18next}>
                    <ConvContext.Provider value={context}>
                        <ConverterFields />
                    </ConvContext.Provider>
                </I18nextProvider>
            </BrowserRouter>
        );
    });

    it('renders the input units select options', async () => {
        const elem = await screen.findByTestId("units-input");
        const options = elem.querySelectorAll('option').length;
        expect(options).toBeGreaterThan(0);
    });

    it('renders the output units select options', async () => {
        const elem = await screen.findByTestId("units-output");
        const options = elem.querySelectorAll('option').length;
        expect(options).toBeGreaterThan(0);
    });

    it('renders the user input field', async () => {
        const elem = await screen.findByTestId("value-input");
        expect(elem).toBeInTheDocument();
    });

    it('renders the decimals select options', async () => {
        const elem = await screen.findByTestId("user-choice");
        const options = elem.querySelectorAll('option').length;
        expect(options).toBeGreaterThan(0);
    });

    it('renders an empty operation field', async () => {
        const elem = await screen.findByTestId("operation-field");
        expect(elem.textContent).toContain('---');
    });

});