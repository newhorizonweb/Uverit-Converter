


// React
import { useContext, useEffect, useRef, useState } from 'react';
import { PageContext } from '../../App';
import { NavLink, useLocation } from "react-router-dom";

// Assets
import '../../assets/css/mobile-nav.css';

// Components
import BurgerButton from "./BurgerButton";

// TS
interface PropTypes{
    icons: any;
}



function MobileNav(props: PropTypes){

    // Icons
    const icons = props.icons;

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
        const targetSection = markGroupName();
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
                    console.log("closing")
                    setIsBurgerOpen(false);
                }
            }, throttleTime);
            
        };
    
        window.addEventListener("resize", handleResize);

    }, []);


    
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
                        className={ activeNavToggle } end>
                        <h5 className="nav-group-name" id="home-nav-btn">
                            Home
                        </h5>
                    </NavLink>

                    <h5 className="nav-group-name" id="length-nav-btn"
                    onClick={(e) => showList(e, undefined, "length")}
                    data-testid="mobile-nav-btn-length">
                        Length<span>▸</span>
                    </h5>
                    <h5 className="nav-group-name"  id="spatial-nav-btn"
                    onClick={(e) => showList(e, undefined, "spatial")}
                    data-testid="mobile-nav-btn-spatial">
                        Spatial<span>▸</span>
                    </h5>
                    <h5 className="nav-group-name"  id="physical-nav-btn"
                    onClick={(e) => showList(e, undefined, "physical")}
                    data-testid="mobile-nav-btn-physical">
                        Physical<span>▸</span>
                    </h5>
                    <h5 className="nav-group-name"  id="data-nav-btn"
                    onClick={(e) => showList(e, undefined, "data")}
                    data-testid="mobile-nav-btn-data">
                        Data<span>▸</span>
                    </h5>

                    </div>
                </div>

                <div className="nav-group-display glass">
                    <div className="nav-group-display-inner small-scroll">

                        <div className="nav-group" id="length"
                        data-testid="mobile-nav-section-length">

                            <NavLink to={`${urlPath}/length1`}
                            className={ activeNavToggle }
                            onClick={ closePopup } data-testid="link-length1">
                                { icons.weight }
                                <p>Placeholder Name 1</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/length2`}
                            className={ activeNavToggle }
                            onClick={ closePopup }  data-testid="link-length2">
                                { icons.weight2 }
                                <p>Name 2</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/length3`}
                            className={ activeNavToggle }
                            onClick={ closePopup }>
                                { icons.weight }
                                <p>Name 3</p>
                            </NavLink>
                            
                            <NavLink to={`${urlPath}/length4`}
                            className={ activeNavToggle }
                            onClick={ closePopup }>
                                { icons.weight }
                                <p>Name 4</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/length5`}
                            className={ activeNavToggle }
                            onClick={ closePopup }>
                                { icons.weight2 }
                                <p>Placeholder Name 5</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/length6`}
                            className={ activeNavToggle }
                            onClick={ closePopup }>
                                { icons.weight2 }
                                <p>Placeholder Name 6</p>
                            </NavLink>
                            
                        </div>

                        <div className="nav-group" id="spatial"
                        data-testid="mobile-nav-section-spatial">

                            <NavLink to={`${urlPath}/calc1`}
                            className={ activeNavToggle }
                            onClick={ closePopup }>
                                { icons.weight2 }
                                <p>Different Name 1</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/calc2`}
                            className={ activeNavToggle }
                            onClick={ closePopup }>
                                { icons.weight }
                                <p>Different Name 2</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/calc3`}
                            className={ activeNavToggle }
                            onClick={ closePopup }>
                                { icons.weight }
                                <p>Different Name 3</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/calc4`}
                            className={ activeNavToggle }
                            onClick={ closePopup }>
                                { icons.weight2 }
                                <p>Different Name 4</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/calc5`}
                            className={ activeNavToggle }
                            onClick={ closePopup }>
                                { icons.weight }
                                <p>Different Name 5</p>
                            </NavLink>

                        </div>

                        <div className="nav-group" id="physical"
                        data-testid="mobile-nav-section-physical">

                            <NavLink to={`${urlPath}/calc11`}
                            className={ activeNavToggle }
                            onClick={ closePopup }>
                                { icons.weight2 }
                                <p>Different Name 1</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/calc22`}
                            className={ activeNavToggle }
                            onClick={ closePopup }>
                                { icons.weight }
                                <p>Different Name 2</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/calc33`}
                            className={ activeNavToggle }
                            onClick={ closePopup }>
                                { icons.weight }
                                <p>Different Name 3</p>
                            </NavLink>

                        </div>

                        <div className="nav-group" id="data"
                        data-testid="mobile-nav-section-data">

                            <NavLink to={`${urlPath}/calc1a`}
                            className={ activeNavToggle }
                            onClick={ closePopup }>
                                { icons.weight2 }
                                <p>Different Name 1</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/calc2b`}
                            className={ activeNavToggle }
                            onClick={ closePopup }>
                                { icons.weight }
                                <p>Different Name 2</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/calc3c`}
                            className={ activeNavToggle }
                            onClick={ closePopup }>
                                { icons.weight }
                                <p>Different Name 3</p>
                            </NavLink>

                        </div>

                    </div>
                </div>

            </div>
        </>

    );
}

export default MobileNav;
