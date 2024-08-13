


// RTL & React
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { prettyDOM } from '@testing-library/dom';
import { act } from 'react';

// i18next
import { I18nextProvider } from 'react-i18next';
import i18next from "../../core/i18n";

// Components & Assets
import MobileNav from '../MobileNav';
import * as navIcons from "../../core/NavIcons";
import units from '../../../assets/json/units.json';

// Mocks
const mockMobileNav = () => {
    return(
        <BrowserRouter>
            <I18nextProvider i18n={i18next}>
                <MobileNav
                    units={ units }
                    navIcons={ navIcons }
                />
            </I18nextProvider>
        </BrowserRouter>
    )
}

    /* Tests */

describe("Mobile Navigation", () => {

    let container;
    
    beforeEach(() => {
        container = render(mockMobileNav());
    });

    it('should open the mobile nav popup on burger button click', async () => {

        // Click the burger button to open the navigation
        const burgerBtn = await screen.findByLabelText(/Navigation burger button/i);
        fireEvent.click(burgerBtn);

        const navPopup = screen.getByTestId(/nav-popup/i);
        expect(navPopup).toHaveClass("popup-visible");

    });

    it('should display the correct nav group after clicking the group nav button', () => {

        // Click the burger button to open the navigation
        const burgerBtn = screen.getByLabelText(/Navigation burger button/i);
        fireEvent.click(burgerBtn);

        // Click the nav group button to display the links
        const navBtn = screen.getByTestId(/mobile-nav-btn-space/i);
        fireEvent.click(navBtn);

        const navSection = screen.getByTestId(/mobile-nav-section-space/i);
        expect(navSection).toHaveClass("group-visible");

    });

    it('should NOT display a different nav group when clicking unrelated nav button', () => {

        // Click the burger button to open the navigation
        const burgerBtn = screen.getByLabelText(/Navigation burger button/i);
        fireEvent.click(burgerBtn);

        // Click the nav group button to display the links
        const navBtn = screen.getByTestId(/mobile-nav-btn-length/i);
        fireEvent.click(navBtn);

        const navSection = screen.getByTestId(/mobile-nav-section-space/i);
        expect(navSection).not.toHaveClass("group-visible");

    });
    
    it('should switch the nav groups and display the correct group', () => {

        // Click the burger button to open the navigation
        const burgerBtn = screen.getByLabelText(/Navigation burger button/i);
        fireEvent.click(burgerBtn);

        // Click the nav group button to display the links
        const navBtnLength = screen.getByTestId(/mobile-nav-btn-length/i);
        fireEvent.click(navBtnLength);

        // Click ANOTHER nav group button to display the links
        const navBtnData = screen.getByTestId(/mobile-nav-btn-data/i);
        fireEvent.click(navBtnData);

        const navSectionData = screen.getByTestId(/mobile-nav-section-data/i);
        expect(navSectionData).toHaveClass("group-visible");

    });
    
    it('should switch the page URL when clicking the nav link', async () => {

        // Click the burger button to open the navigation
        const burgerBtn = screen.getByLabelText(/Navigation burger button/i);
        fireEvent.click(burgerBtn);

        // Click the nav group button to display the links
        const navBtn = screen.getByTestId(/mobile-nav-btn-length/i);
        fireEvent.click(navBtn);

        // Click the nav link to change the page
        const navLinkLength1 = screen.getByTestId(/link-marine/i);
        fireEvent.click(navLinkLength1);

        const firstPage = window.location.pathname;

        // Click ANOTHER nav link to change the page to compare the URLs
        const navLinkLength2 = screen.getByTestId(/link-archaic/i);
        fireEvent.click(navLinkLength2);

        // Compare URLs
        const secondPage = window.location.pathname;
        expect(secondPage).not.toBe(firstPage);
        
    });
    
});