


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
import data from '../../../../public/assets/conv_data/common.json';
import data2 from '../../../../public/assets/conv_data/common.json';

const context = {
    data: data,
    groupName: 'length',
    converterName: 'common'
}

const context2 = {
    data: data2,
    groupName: 'length',
    converterName: 'microscopic'
}


    /* Tests */

describe("Common Length Converter Fields", () => {

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

    it('converts with the default settings', async () => {
        const valInp = await screen.findByTestId("value-input");
        const result = await screen.findByTestId("result-txt");

        fireEvent.change(valInp, { target: { value: '20' } });
        expect(result.textContent).toBe('7.87402');
    });

    it('converts with changed units', async () => {
        const selFrom = await screen.findByTestId("units-input");
        const selTo = await screen.findByTestId("units-output");
        const valInp = await screen.findByTestId("value-input");
        const result = await screen.findByTestId("result-txt");

        userEvent.selectOptions(selFrom, 'metric&decimeter_&_1e-1');
        userEvent.selectOptions(selTo, 'imperial&foot_&_0.3048');
        fireEvent.change(valInp, { target: { value: '6.4' } });

        expect(result.textContent).toBe('2.09974');
    });

    it('converts with changed units & max decimals', async () => {
        const selFrom = await screen.findByTestId("units-input");
        const selTo = await screen.findByTestId("units-output");
        const valInp = await screen.findByTestId("value-input");
        const result = await screen.findByTestId("result-txt");
        const userChoice = await screen.findByTestId("user-choice");

        userEvent.selectOptions(selFrom, 'metric&centimeter_&_1e-2');
        userEvent.selectOptions(selTo, 'imperial&foot_&_0.3048');
        userEvent.selectOptions(userChoice, '12');
        fireEvent.change(valInp, { target: { value: '12.22' } });

        expect(result.textContent).toBe('0.400918635171');
    });

    it('converts with changed units & min decimals', async () => {
        const selFrom = await screen.findByTestId("units-input");
        const selTo = await screen.findByTestId("units-output");
        const valInp = await screen.findByTestId("value-input");
        const result = await screen.findByTestId("result-txt");
        const userChoice = await screen.findByTestId("user-choice");

        userEvent.selectOptions(selFrom, 'metric&centimeter_&_1e-2');
        userEvent.selectOptions(selTo, 'imperial&yard_&_0.9144');
        userEvent.selectOptions(userChoice, '0');
        fireEvent.change(valInp, { target: { value: '12.22' } });

        expect(result.textContent).toBe('0');
    });

    it('switches units', async () => {
        const selFrom = await screen.findByTestId("units-input");
        const selTo = await screen.findByTestId("units-output");
        const valInp = await screen.findByTestId("value-input");
        const result = await screen.findByTestId("result-txt");
        const switchUnits = await screen.findByTestId("switch-units");
        const userChoice = await screen.findByTestId("user-choice");

        userEvent.selectOptions(selFrom, 'imperial&yard_&_0.9144');
        userEvent.selectOptions(selTo, 'imperial&foot_&_0.3048');
        userEvent.selectOptions(userChoice, '6');
        fireEvent.change(valInp, { target: { value: '6' } });
        fireEvent.click(switchUnits);

        expect(result.textContent).toBe('2');
    });

    it('tests NaN', async () => {
        const valInp = await screen.findByTestId("value-input");
        const result = await screen.findByTestId("result-txt");
        fireEvent.change(valInp, { target: { value: 'x' } });
        expect(result.textContent).toBe('NaN');
    });

    it('checks the operation field', async () => {
        const selFrom = await screen.findByTestId("units-input");
        const selTo = await screen.findByTestId("units-output");
        const valInp = await screen.findByTestId("value-input");
        const userChoice = await screen.findByTestId("user-choice");
        const operation = await screen.findByTestId("operation-field");

        userEvent.selectOptions(selFrom, 'metric&kilometer_&_1e+3');
        userEvent.selectOptions(selTo, 'metric&centimeter_&_1e-2');
        userEvent.selectOptions(userChoice, '9');
        fireEvent.change(valInp, { target: { value: '9.1' } });

        expect(operation.innerHTML).toBe(
            "<p><span class=\"operation-input\">9.1</span><span>&nbsp;*&nbsp;</span><span>100000</span></p>"
        );
    });
    
});