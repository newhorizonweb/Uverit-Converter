


// RTL & React
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { prettyDOM, waitFor } from '@testing-library/dom';

// i18next
import { I18nextProvider } from 'react-i18next';
import i18next from "../../core/i18n";

// Assets
import ConverterFields from '../ConverterFields';
import { ConvContext } from '../Converter';
import data from '../../../../public/assets/conv_data/numeral_systems.json';

const context = {
    data: data,
    groupName: 'data',
    converterName: 'numeral_systems'
}



    /* Tests */

describe("Temperature Converter Fields", () => {

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

    it('converts the default bases', async () => {
        const valInp = await screen.findByTestId("value-input");
        const result = await screen.findByTestId("result-txt");

        fireEvent.change(valInp, { target: { value: '123.321' } });
        expect(result.textContent).toBe('1111011.0101');
    });

    it('converts quaternary (without integer) to decimal', async () => {
        const selFrom = await screen.findByTestId("units-input") as HTMLSelectElement;
        const selTo = await screen.findByTestId("units-output") as HTMLSelectElement;
        const valInp = await screen.findByTestId("value-input") as HTMLInputElement;
        const result = await screen.findByTestId("result-txt");

        userEvent.selectOptions(selFrom, 'numeral-systems&quaternary_&_4');
        userEvent.selectOptions(selTo, 'numeral-systems&decimal_&_10');
        fireEvent.change(valInp, { target: { value: '.3' } });

        expect(result.textContent).toBe('0.75');
    });

    it('converts hexatrigesimal to undecimal and switches units', async () => {
        const selFrom = await screen.findByTestId("units-input") as HTMLSelectElement;
        const selTo = await screen.findByTestId("units-output") as HTMLSelectElement;
        const valInp = await screen.findByTestId("value-input") as HTMLInputElement;
        const result = await screen.findByTestId("result-txt");
        const userChoice = await screen.findByTestId("user-choice") as HTMLSelectElement;
        const switchUnits = await screen.findByTestId("switch-units");

        userEvent.selectOptions(selFrom, 'numeral-systems&hexatrigesimal_&_36');
        userEvent.selectOptions(selTo, 'numeral-systems&undecimal_&_11');
        
        userEvent.selectOptions(userChoice, '9');
        fireEvent.change(valInp, { target: { value: '354.55' } });
        fireEvent.click(switchUnits);

        expect(result.textContent).toBe('bq.hun7fro3l');
    });

    it('converts septenary to hexadecimal and rounds up to the integer', async () => {
        const selFrom = await screen.findByTestId("units-input") as HTMLSelectElement;
        const selTo = await screen.findByTestId("units-output") as HTMLSelectElement;
        const valInp = await screen.findByTestId("value-input") as HTMLInputElement;
        const result = await screen.findByTestId("result-txt");
        const userChoice = await screen.findByTestId("user-choice") as HTMLSelectElement;

        userEvent.selectOptions(selFrom, 'numeral-systems&septenary_&_7');
        userEvent.selectOptions(selTo, 'numeral-systems&hexadecimal_&_16');
        
        // The result should be "d.fa...", so rounding to 1 digit has to round up to the integer
        // Checks, if the result is NOT "e.0"
        userEvent.selectOptions(userChoice, '1');
        fireEvent.change(valInp, { target: { value: '16.66' } });

        expect(result.textContent).toBe('e');
    });

});