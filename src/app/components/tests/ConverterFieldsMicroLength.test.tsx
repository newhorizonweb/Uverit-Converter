


// RTL & React
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { prettyDOM } from '@testing-library/dom';

// i18next
import { I18nextProvider } from 'react-i18next';
import i18next from "../../core/i18n";

// Assets
import ConverterFields from '../ConverterFields';
import { ConvContext } from '../Converter';
import data from '../../../../public/assets/conv_data/microscopic.json';

const context = {
    data: data,
    groupName: 'length',
    converterName: 'microscopic'
}



    /* Tests */

describe("Microscopic Length Converter Fields", () => {

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

    it('converts with changed units & decimals', async () => {
        const selFrom = await screen.findByTestId("units-input");
        const selTo = await screen.findByTestId("units-output");
        const valInp = await screen.findByTestId("value-input");
        const result = await screen.findByTestId("result-txt");
        const userChoice = await screen.findByTestId("user-choice");

        userEvent.selectOptions(selFrom, 'metric&nanometer_&_1e-9');
        userEvent.selectOptions(selTo, 'imperial&thou_&_2.54e-5');
        userEvent.selectOptions(userChoice, '8');
        fireEvent.change(valInp, { target: { value: '15' } });

        expect(result.textContent).toBe('5.90551181e-4');
    });

    it('disables the exponential notation', async () => {
        const selFrom = await screen.findByTestId("units-input");
        const selTo = await screen.findByTestId("units-output");
        const valInp = await screen.findByTestId("value-input");
        const result = await screen.findByTestId("result-txt");
        const expoBtn = await screen.findByTestId("exponential-btn");
        const userChoice = await screen.findByTestId("user-choice");

        userEvent.selectOptions(selFrom,
            'non-si&x-unit_&_1.00207699282828282828e-13');
        userEvent.selectOptions(selTo, 'metric&picometer_&_1e-12'); // pm
        userEvent.selectOptions(userChoice, '5');
        fireEvent.change(valInp, { target: { value: '1' } });
        fireEvent.click(expoBtn);

        expect(result.textContent).toBe('0.10021');
    });

    it('tests NaN', async () => {
        const valInp = await screen.findByTestId("value-input");
        const result = await screen.findByTestId("result-txt");
        fireEvent.change(valInp, { target: { value: 'x' } });
        expect(result.textContent).toBe('NaN');
    });

});