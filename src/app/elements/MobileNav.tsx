


// React
import { useContext, useEffect, useRef, useState } from 'react';
import { PageContext } from '../../App';
import { NavLink, useLocation } from "react-router-dom";

// Locales
import { useTranslation } from 'react-i18next';

// Assets
import '../../assets/css/mobile-nav.css';

// Components
import BurgerButton from "./BurgerButton";

// TS
type UnitsData = { [key: string]: string[] };

interface PropTypes{
    units: UnitsData;
    navIcons: any;
}



function MobileNav(props: PropTypes){

    // Translation
    const { t } = useTranslation(['app']);

    // JSON Data (units)
    const units = props.units;

    // Icons
    const navIcons = props.navIcons;

    // Page Context Variables
    const { urlPath } = useContext(PageContext);

    // Burger nav state on mobile
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);

    // Get current URL
    const location = useLocation();



        /* Popup / Burger */

    // Burger Button
    const burgerBtn = useRef<HTMLButtonElement>(null);

    // Nav Popup
    const navPopup = useRef<HTMLDivElement>(null);

    const closePopup = () => {
        setIsBurgerOpen(false);
    }

    const togglePopup = () => {
        setIsBurgerOpen(!isBurgerOpen);
    }

    useEffect(() => {
        
        const handleClickOutside = (event: MouseEvent) => {
            if (event.target instanceof Node &&
                burgerBtn.current && navPopup.current &&
                !burgerBtn.current.contains(event.target) &&
                !navPopup.current.contains(event.target)
            ){
                closePopup();
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        
    }, [ burgerBtn, navPopup ]);



        /* Active Link */

    // Toggle the active page navigation link
    const activeNavToggle = ({ isActive }: { isActive: boolean }) =>
        "nav-link" + (isActive ? " active-nav-link" : "");

    // Elements
    const navGroups = document.querySelectorAll(".nav-popup .nav-group");
    const navGroupNames =
        document.querySelectorAll(".nav-popup .nav-group-name");
    
    const markGroupName = () => {

        // Remove the location button class
        navGroupNames.forEach((navGroupName) => {
            navGroupName.classList.remove("location-group-btn");
        });

        // Check if the home button was clicked
        const homeButton =
            document.querySelector("#home-nav-btn");

        if (homeButton && location.pathname === urlPath){
            homeButton.classList.add("location-group-btn");
            return;
        }

        // Mark the group link button corresponding to the clicked page link
        const navLinks = document.querySelectorAll(".nav-popup .nav-link");
        let groupId = undefined;

        navLinks.forEach((navLink) => {

            if (navLink.classList.contains("active-nav-link")){
                groupId = navLink.closest(".nav-group")?.id;
                const navBtn = document.getElementById(`${groupId}-nav-btn`);

                if (navBtn){
                    navBtn.classList.add("location-group-btn");
                }
            }

        });

        return groupId;

    }

    // Mark the link button when the page changes
    useEffect(() => {
        markGroupName();
    }, [location.pathname]);

    const showList = (
        e?: React.MouseEvent<HTMLHeadingElement>,
        navBtn?:string,
        target?: string
    ) => {

        if (e || navBtn){

            navGroupNames.forEach((navGroupName) => {
                navGroupName.classList.remove("active-group-btn");
            });

            let btnElem;
    
            if (e){
                btnElem = e.currentTarget as HTMLElement;
            } else if (navBtn){
                btnElem = document.getElementById(`${navBtn}-nav-btn`);
            }

            btnElem?.classList.add("active-group-btn");

        }

        if (!target) return;

        navGroups.forEach((navGroup) => {
            navGroup.classList.remove("group-visible");
        });

        const targetGroup = document.getElementById(target);

        if (targetGroup){
            targetGroup.classList.add("group-visible");
        }

    }

    useEffect(() => {

        // Show the page list with icons on page load
        // Length = default when on the home page
        const targetSection = markGroupName() ?? "length";
        showList(undefined, targetSection, targetSection);

        // Throttle resize event
        let resizeTimeout: any;
        const throttleTime = 400; // in ms

        const handleResize = () => {
            
            if (resizeTimeout){
                clearTimeout(resizeTimeout);
            }
        
            // Close nav popup on page resize on desktop
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth > 1024){
                    setIsBurgerOpen(false);
                }
            }, throttleTime);
            
        };
    
        window.addEventListener("resize", handleResize);

    }, []);



        /* Nav Groups & Links */

    // Generate dynamic routes based on units.json
    const groupButtons = () => {
        return Object.keys(units as UnitsData).map((category, index) => (

            <h5 key={`nav-group-btn--${index}`}
            className="nav-group-name" id={`${category}-nav-btn`}
            onClick={(e) => showList(e, undefined, category)}
            data-testid={`mobile-nav-btn-${category}`}> 
                { t(`groups.${category}.${category}`) }<span>▸</span>
            </h5>

        ));
    };

    // Generate dynamic routes based on units.json
    const navLinkGroups = () => {
        return Object.keys(units as UnitsData).map((category, index) => (

            <div key={`mobile-nav-group-${index}`}
            className="nav-group" id={category}
            data-testid={`mobile-nav-section-${category}`}>
                { navLinks(category, (units as UnitsData)[category]) }
            </div>        

        ));
    };

    // Generate dynamic routes based on units.json
    const navLinks = (category: string, items: string[]) => {
        return items.map((item, index) => (
            <NavLink
            key={`nav-link-${index}`}
            to={`${urlPath}/${category}/${item}`}
            className={ activeNavToggle }
            onClick={ closePopup } data-testid={`mobile-link-${item}`}>
                {
                    navIcons[item as keyof typeof navIcons] ||
                    navIcons.navPlaceholderIcon
                }
                <p>{ t(`groups.${category}.${item}`) }</p>
            </NavLink>
        ));
    };


    
    return (

        <>
            <BurgerButton
                togglePopup={togglePopup}
                ref={ burgerBtn }
                isBurgerOpen={ isBurgerOpen }
            />

            <div className={`nav-popup glass 
            ${isBurgerOpen ? " popup-visible" : ""}`}
            ref={navPopup} data-testid="nav-popup">

                <div className="nav-group-list glass">
                    <div className="nav-group-list-inner small-scroll">

                        <NavLink to={`${urlPath}`}
                            className={ activeNavToggle } end
                            onClick={ closePopup }>
                            <h5 className="nav-group-name" id="home-nav-btn">
                                { t("home") }
                            </h5>
                        </NavLink>

                        { groupButtons() }

                    </div>
                </div>

                <div className="nav-group-display glass">
                    <div className="nav-group-display-inner small-scroll">

                        { navLinkGroups() }

                    </div>
                </div>

            </div>
        </>

    );
}

export default MobileNav;
