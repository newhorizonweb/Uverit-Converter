


// React
import { useContext } from 'react';
import { PageContext } from '../../App';
import { NavLink } from "react-router-dom";

// Locales
import { useTranslation } from 'react-i18next';

// Assets
import '../../assets/css/link-tiles.css';
import * as navIcons from "../core/NavIcons";
import units from '../../assets/json/units.json';

// TS
type UnitsData = { [key: string]: string[] };



function LinkTiles(){

    // Translation
    const { t } = useTranslation(['app']);

    // Page Context Variables
    const { urlPath } = useContext(PageContext);

    const navGroups = () => {
        return Object.keys(units as UnitsData).map((category, index) => (

            <div className="tile-group" key={`tile-group-${index}`}
            id={`tile-group-${category}`}>
                
                <div className="tile-name glass">
                    <h2 className="tile-name-heading glass">
                        { t(`groups.${category}.${category}`) }
                    </h2>
                </div>

                <div className="tile-links"
                data-testid={`tile-links-${category}`}>
                    { tileLinks(category, (units as UnitsData)[category]) }
                </div>
            </div>

        ));
    };

    // Generate dynamic routes based on units.json
    const tileLinks = (category: string, items: string[]) => {
        return items.map((item, index) => (

            <div className="tile-link glass" key={`tile-link-${index}`}>
                <NavLink id={item}
                to={`${urlPath}/${category}/${item}`}
                className="tile-link-inner glass"
                data-testid={`tile-link-${item}`}>
                    <div className="tile-icon">
                    {
                        navIcons[item as keyof typeof navIcons] ||
                        navIcons.navPlaceholderIcon
                    }
                    </div>
                    <h3>{ t(`groups.${category}.${item}`) }</h3>
                </NavLink>
            </div>

        ));
    };

    return (
        <div className="link-tiles">
           { navGroups() }
        </div>
    );

}

export default LinkTiles;
