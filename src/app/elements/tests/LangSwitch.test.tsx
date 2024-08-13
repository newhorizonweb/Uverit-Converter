


// RTL & React
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { prettyDOM } from '@testing-library/dom';
import { act } from 'react';

// i18next
import { I18nextProvider } from 'react-i18next';
import i18next from "../../core/i18n";

// Components
import LangSwitch from '../LangSwitch';

// Mocks
const mockLangSwitch = () => {
    return(
        <BrowserRouter>
            <I18nextProvider i18n={i18next}>
                <LangSwitch />
            </I18nextProvider>
        </BrowserRouter>
    )
}



    /* Tests */

describe("Language Switch", () => {

    let container;
    
    beforeEach(() => {
        container = render(mockLangSwitch());
    });

    it('checks if the language list is NOT visible on page load', async () => {

        const langDiv = screen.getByTestId("lang-switch");
        expect(langDiv).not.toHaveClass("lang-expanded");

    });

    it('opens the language popup a on button click', async () => {

        const langDiv = screen.getByTestId("lang-switch");
        const langBtn = screen.getByTestId("lang-btn");
        fireEvent.click(langBtn);

        expect(langDiv).toHaveClass("lang-expanded");

    });

    it('closes the language popup after 2 button clicks', async () => {

        const langDiv = screen.getByTestId("lang-switch");
        const langBtn = screen.getByTestId("lang-btn");
        fireEvent.click(langBtn);
        fireEvent.click(langBtn);

        expect(langDiv).not.toHaveClass("lang-expanded");

    });

    it('closes the language popup after choosing a language', async () => {

        const langDiv = screen.getByTestId("lang-switch");
        const langBtn = screen.getByTestId("lang-btn");
        fireEvent.click(langBtn);

        // Change language to German
        const langGerman = screen.getByTestId(/lang-switch-Deutsch/i);
        fireEvent.click(langGerman);

        expect(langDiv).not.toHaveClass("lang-expanded");

    });

    it('checks if the language switching works', async () => {

        // Click on English first to make sure it's not auto set to German
        const langEnglish = screen.getByTestId(/lang-switch-English/i);
        fireEvent.click(langEnglish);

        // Change language to German
        const langGerman = screen.getByTestId(/lang-switch-Deutsch/i);
        fireEvent.click(langGerman);
        
        await act(async () => {
            expect(localStorage.getItem("i18nextLng")).toBe("de");
        });

    });

    it('checks if the current language has the indicator class', async () => {

        const langPolish = screen.getByTestId(/lang-switch-Polski/i);
        fireEvent.click(langPolish);
        
        await act(async () => {
            expect(langPolish).toHaveClass("curr-lang");
        });

    });

    it('checks if the other languages DO NOT have the indicator class', async () => {

        // Change language to German
        const langPolish = screen.getByTestId(/lang-switch-Polski/i);
        const langFrench = screen.getByTestId(/lang-switch-Français/i);
        fireEvent.click(langFrench);
        
        await act(async () => {
            expect(langPolish).not.toHaveClass("curr-lang");
        });

    });

});