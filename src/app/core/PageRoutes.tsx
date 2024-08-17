


// React
import { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PageContext } from '../../App';

// Pages
import LandingPage from '../components/LandingPage';
import Converter from '../components/Converter';
import NotFound from '../components/NotFound';

// Assets
import units from '../../assets/json/units.json';



const PageRoutes = () => {

    const location = useLocation();

    // Page Context Variables
    const { urlPath } = useContext(PageContext);
    
    // Generate dynamic routes based on units.json
    const dynamicRoutes = Object.keys(units).flatMap(groupName => {

        const converters = units[groupName as keyof typeof units] as string[];

        return converters.map(converterName => (
            <Route
                key={`${groupName}-${converterName}`}
                path={`${urlPath}/${groupName}/${converterName}`}
                element={
                    <Converter
                        groupName={ groupName }
                        converterName={ converterName }
                    />
                }
            />
        ));

    });
    

    
    // mode="wait" - wait for the component to fade out before initializing the fade-in animation for the next one
    // initial={false} - don't initialize the animation when loading the website
    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={ location } key={ location.pathname }>
                            
                <Route index path={ `${urlPath}` } element={
                    <LandingPage />
                } />

                { dynamicRoutes }

                <Route path={'*'} element={
                    <NotFound />
                } />

            </Routes>
        </AnimatePresence>
    );
}

export default PageRoutes;
