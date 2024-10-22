


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
import data from '../../../../public/assets/conv_data/temperature.json';

const context = {
    data: data,
    groupName: 'physics',
    converterName: 'temperature'
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

    it('converts the default scales', async () => {
        const valInp = await screen.findByTestId("value-input");
        const result = await screen.findByTestId("result-txt");

        fireEvent.change(valInp, { target: { value: '25.5' } });
        expect(result.textContent).toBe('77.9');
    });

    it('converts Kelvins to Rømer scale', async () => {
        const selFrom = await screen.findByTestId("units-input");
        const selTo = await screen.findByTestId("units-output");
        const valInp = await screen.findByTestId("value-input");
        const result = await screen.findByTestId("result-txt");
        const userChoice = await screen.findByTestId("user-choice");

        userEvent.selectOptions(selFrom, 'common&kelvin_&_val => val|val => val');
        userEvent.selectOptions(selTo, 'obsolete&rømer_&_val => val.minus(7.5).times(40).dividedBy(21).plus(273.15)|val => val.minus(273.15).times(21).dividedBy(40).plus(7.5)');
        
        userEvent.selectOptions(userChoice, '4');
        fireEvent.change(valInp, { target: { value: '123' } });

        expect(result.textContent).toBe('-71.3288');
    });

    it('converts Celsius Degrees to Newton scale and switches the units', async () => {
        const selFrom = await screen.findByTestId("units-input");
        const selTo = await screen.findByTestId("units-output");
        const valInp = await screen.findByTestId("value-input");
        const result = await screen.findByTestId("result-txt");
        const switchUnits = await screen.findByTestId("switch-units");
        const userChoice = await screen.findByTestId("user-choice");

        userEvent.selectOptions(selFrom, 'common&celsius_&_val => val.plus(273.15)|val => val.minus(273.15)');
        userEvent.selectOptions(selTo, 'obsolete&newton_&_val => val.times(100).dividedBy(33).plus(273.15)|val => val.minus(273.15).times(33).dividedBy(100)');

        userEvent.selectOptions(userChoice, '16');
        fireEvent.change(valInp, { target: { value: '80.125' } });
        fireEvent.click(switchUnits);

        expect(result.textContent).toBe('242.803030303030303');
    });

});