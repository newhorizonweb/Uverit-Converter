


// React
import { useContext } from 'react';
import { PageContext } from '../../App';
import { NavLink } from "react-router-dom";

// Locales
import { useTranslation } from 'react-i18next';

// Assets
import '../../assets/css/nav.css';
import { uveritLogo } from "../core/SvgIcons";
import * as navIcons from "../core/NavIcons";
import units from '../../assets/json/units.json';

// Components
import MobileNav from "../elements/MobileNav";
import ThemeToggle from "../elements/ThemeToggle";
import LangSwitch from '../elements/LangSwitch';

// TS
type UnitsData = { [key: string]: string[] };



function Nav(){

    // Translation
    const { t } = useTranslation(['app']);

    // Page Context Variables
    const { urlPath } = useContext(PageContext);

    // Toggle the active page navigation link
    const activeNavToggle = ({ isActive }: { isActive: boolean }) =>
        "nav-link" + (isActive ? " active-nav-link" : "");
    
    // Generate dynamic routes based on units.json
    const navGroups = () => {
        return Object.keys(units as UnitsData).map((category, index) => (

            <div className="nav-group" key={`nav-group-${index}`}
            data-testid={`group-btn-${category}`}
            id={`group-btn-${category}`}>
                <h5 className="nav-group-name">
                    { t(`groups.${category}.${category}`) }<span>▾</span>
                </h5>

                <div className="nav-links glass"
                data-testid={`nav-links-${category}`}>
                    <div className="nav-links-inner glass">
                        { navLinks(category, (units as UnitsData)[category]) }
                    </div>
                </div>
            </div>

        ));
    };

    // Generate dynamic routes based on units.json
    const navLinks = (category: string, items: string[]) => {
        return items.map((item, index) => (

            <NavLink id={item}
                key={`nav-link-${index}`}
                to={`${urlPath}/${category}/${item}`}
                className={ activeNavToggle } data-testid={`link-${item}`}
            >
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

        <div className="nav-support"></div>

        <nav className="navigation wrapper glass">
            
            <NavLink to={`${urlPath}`} end
            className="nav-logo app-logo-action">
                { uveritLogo }
            </NavLink>

            <div className="nav-groups">

                <div className="nav-group">

                    <NavLink to={`${urlPath}`}
                        className={ activeNavToggle } end>
                        <h5>{ t("home") }</h5>
                    </NavLink>

                </div>

                { navGroups() }

            </div>

            <MobileNav
                units={ units }
                navIcons={ navIcons }
            />

            <ThemeToggle />

            <LangSwitch />
            
        </nav>

        </>
    );
}

export default Nav;
