


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
import data from '../../../../public/assets/conv_data/data_storage.json';

const context = {
    data: data,
    groupName: 'data',
    converterName: 'data_storage'
}



    /* Tests */

describe("Data Storage Converter Fields", () => {

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

    it('converts default units', async () => {
        const valInp = await screen.findByTestId("value-input");
        const result = await screen.findByTestId("result-txt");

        fireEvent.change(valInp, { target: { value: '512' } });
        expect(result.textContent).toBe('5.12e-7');
    });

    it('converts GB to GiB and switches units', async () => {
        const selFrom = await screen.findByTestId("units-input") as HTMLSelectElement;
        const selTo = await screen.findByTestId("units-output") as HTMLSelectElement;
        const valInp = await screen.findByTestId("value-input") as HTMLInputElement;
        const result = await screen.findByTestId("result-txt");
        const userChoice = await screen.findByTestId("user-choice") as HTMLSelectElement;
        const switchUnits = await screen.findByTestId("switch-units");

        userEvent.selectOptions(selFrom, "decimal-based&gigabyte_&_val => val.times('1e9')|val => val.dividedBy('1e9')"); // GB
        userEvent.selectOptions(selTo, "binary-based&gibibyte_&_val => val.times(new Decimal(2).toPower(30))|val => val.dividedBy(new Decimal(2).toPower(30))"); // GiB
        
        userEvent.selectOptions(userChoice, '9');
        fireEvent.change(valInp, { target: { value: '128' } });
        fireEvent.click(switchUnits);

        expect(result.textContent).toBe('1.374389535e+2');
    });

    it('converts nibble to KiB and turns off expo notation', async () => {
        const selFrom = await screen.findByTestId("units-input") as HTMLSelectElement;
        const selTo = await screen.findByTestId("units-output") as HTMLSelectElement;
        const valInp = await screen.findByTestId("value-input") as HTMLInputElement;
        const result = await screen.findByTestId("result-txt");
        const expoBtn = await screen.findByTestId("exponential-btn");

        userEvent.selectOptions(selFrom, "basic&nibble_&_val => val.times(0.5)|val => val.dividedBy(0.5)"); // nibble
        userEvent.selectOptions(selTo, "binary-based&kibibyte_&_val => val.times(new Decimal(2).toPower(10))|val => val.dividedBy(new Decimal(2).toPower(10))"); // KiB

        fireEvent.click(expoBtn);
        fireEvent.change(valInp, { target: { value: '256' } });

        expect(result.textContent).toBe('0.125');
    });
    
});