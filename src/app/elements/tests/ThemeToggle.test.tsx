


// RTL & React
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { prettyDOM } from '@testing-library/dom';
import { act } from 'react';

// i18next
import { I18nextProvider } from 'react-i18next';
import i18next from "../../core/i18n";

// Components
import ThemeToggle from '../ThemeToggle';

// Mocks
const mockThemeToggle = () => {
    return(
        <BrowserRouter>
            <I18nextProvider i18n={i18next}>
                <ThemeToggle />
            </I18nextProvider>
        </BrowserRouter>
    )
}

const mockMatchMedia = (match: string) => {
    return Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: query.includes(match),
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
        })),
    });
};

    /* Tests */

describe("Theme Toggle", () => {

    it('checks it the app theme is dark when preferred', () => {
        
        mockMatchMedia("dark");
        render(mockThemeToggle());

        expect(document.body).toHaveClass("theme-dark");

    });

    it('switches the theme from dark to light', () => {

        mockMatchMedia("dark");
        render(mockThemeToggle());

        const themeToggle = screen.getByLabelText(/Theme toggle button/i);
        fireEvent.click(themeToggle);

        expect(document.body).toHaveClass("theme-light");

    });
    
});