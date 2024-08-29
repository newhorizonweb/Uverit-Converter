


// RTL & React
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { prettyDOM } from '@testing-library/dom';

// i18next
import { I18nextProvider } from 'react-i18next';
import i18next from "../../core/i18n";

// Components
import ConverterFields from '../ConverterFields';
import data from '../../../assets/json/common.json';

// Mocks
const mockConverterFields = () => {
    return(
        <BrowserRouter>
            <I18nextProvider i18n={i18next}>
                <ConverterFields
                    data={ data }
                />
            </I18nextProvider>
        </BrowserRouter>
    )
}



    /* Tests */

describe("Converter Fields", () => {

    let container;
    
    beforeEach(() => {
        container = render(mockConverterFields());
    });

    it('renders the input units select options', async () => {
        const elem = screen.getByTestId("units-input");
        const options = elem.querySelectorAll('option').length;
        expect(options).toBeGreaterThan(0);
    });

    it('renders the output units select options', async () => {
        const elem = screen.getByTestId("units-output");
        const options = elem.querySelectorAll('option').length;
        expect(options).toBeGreaterThan(0);
    });

    it('renders the user input field', async () => {
        const elem = screen.getByTestId("value-input");
        expect(elem).toBeInTheDocument();
    });

    it('renders the decimals select options', async () => {
        const elem = screen.getByTestId("user-choice");
        const options = elem.querySelectorAll('option').length;
        expect(options).toBeGreaterThan(0);
    });

    it('renders an empty operation field', async () => {
        const elem = screen.getByTestId("operation-field");
        expect(elem.textContent).toContain('---');
    });

});