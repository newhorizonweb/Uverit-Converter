


// React
import { useContext } from 'react';
import { PageContext } from '../../App';
import { NavLink } from "react-router-dom";

// Assets
import '../../assets/css/nav.css';
import * as icons from "../core/SvgIcons";

// Components
import MobileNav from "../elements/MobileNav";
import ThemeToggle from "../elements/ThemeToggle";
import LangSwitch from '../elements/LangSwitch';



function Nav(){

    // Page Context Variables
    const { urlPath } = useContext(PageContext);

    // Toggle the active page navigation link
    const activeNavToggle = ({ isActive }: { isActive: boolean }) =>
        "nav-link" + (isActive ? " active-nav-link" : "");

    

    return (
        <>

        <div className="nav-support"></div>

        <nav className="navigation wrapper glass">
            
            <NavLink to={`${urlPath}`} end
            className="nav-logo app-logo-action">
                { icons.uveritLogo }
            </NavLink>

            <div className="nav-groups">

                <div className="nav-group">

                    <NavLink to={`${urlPath}`}
                        className={ activeNavToggle } end>
                        <h5>Home</h5>
                    </NavLink>

                </div>

                <div className="nav-group">

                    <h5 className="nav-group-name">
                        Length<span>▾</span>
                    </h5>

                    <div className="nav-links glass">
                        <div className="nav-links-inner glass">

                            <NavLink to={`${urlPath}/length1`}
                            className={ activeNavToggle }>
                                { icons.weight }
                                <p>Placeholder Name 1</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/length2`}
                            className={ activeNavToggle }>
                                { icons.weight2 }
                                <p>Name 2</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/length3`}
                            className={ activeNavToggle }>
                                { icons.weight }
                                <p>Name 3</p>
                            </NavLink>
                            
                            <NavLink to={`${urlPath}/length4`}
                            className={ activeNavToggle }>
                                { icons.weight }
                                <p>Name 4</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/length5`}
                            className={ activeNavToggle }>
                                { icons.weight2 }
                                <p>Placeholder Name 5</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/length6`}
                            className={ activeNavToggle }>
                                { icons.weight2 }
                                <p>Placeholder Name 6</p>
                            </NavLink>

                        </div>
                    </div>

                </div>

                <div className="nav-group">

                    <h5 className="nav-group-name"
                    data-testid="nav-name-spatial">
                        Spatial<span>▾</span>
                    </h5>

                    <div className="nav-links glass">
                        <div className="nav-links-inner glass">

                            <NavLink to={`${urlPath}/calc1`}
                            className={ activeNavToggle }>
                                { icons.weight2 }
                                <p>Different Name 1</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/calc2`}
                            className={ activeNavToggle }>
                                { icons.weight }
                                <p>Different Name 2</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/calc3`}
                            className={ activeNavToggle }>
                                { icons.weight }
                                <p>Different Name 3</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/calc4`}
                            className={ activeNavToggle }>
                                { icons.weight2 }
                                <p>Different Name 4</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/calc5`}
                            className={ activeNavToggle }>
                                { icons.weight }
                                <p>Different Name 5</p>
                            </NavLink>

                        </div>
                    </div>

                </div>

                <div className="nav-group">

                    <h5 className="nav-group-name">
                        Physical<span>▾</span>
                    </h5>

                    <div className="nav-links glass">
                        <div className="nav-links-inner glass">

                            <NavLink to={`${urlPath}/calc1`}
                            className={ activeNavToggle }>
                                { icons.weight2 }
                                <p>Different Name 1</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/calc2`}
                            className={ activeNavToggle }>
                                { icons.weight }
                                <p>Different Name 2</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/calc3`}
                            className={ activeNavToggle }>
                                { icons.weight }
                                <p>Different Name 3</p>
                            </NavLink>

                        </div>
                    </div>

                </div>

                <div className="nav-group">

                    <h5 className="nav-group-name">
                        Data<span>▾</span>
                    </h5>

                    <div className="nav-links glass">
                        <div className="nav-links-inner glass">

                            <NavLink to={`${urlPath}/calc1`}
                            className={ activeNavToggle }>
                                { icons.weight2 }
                                <p>Different Name 1</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/calc2`}
                            className={ activeNavToggle }>
                                { icons.weight }
                                <p>Different Name 2</p>
                            </NavLink>

                            <NavLink to={`${urlPath}/calc3`}
                            className={ activeNavToggle }>
                                { icons.weight }
                                <p>Different Name 3</p>
                            </NavLink>

                        </div>
                    </div>

                </div>

            </div>

            <MobileNav icons={icons} />

            <ThemeToggle />

            <LangSwitch />
            
        </nav>

        </>
    );
}

export default Nav;
