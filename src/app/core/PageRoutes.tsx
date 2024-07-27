


// React
import { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PageContext } from '../../App';

// Pages
import LandingPage from '../components/LandingPage';
import Converter from '../components/Converter';
import NotFound from '../components/NotFound';



const PageRoutes = () => {

    const location = useLocation();

    // Page Context Variables
    const { urlPath } = useContext(PageContext);

    // mode="wait" - wait for the component to fade out before initializing the fade-in animation for the next one
    // initial={false} - don't initialize the animation when loading the website
    
    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={ location } key={ location.pathname }>
                            
                <Route index path={ `${urlPath}` } element={
                    <LandingPage />
                } />

                <Route path={`${urlPath}/length`} element={
                    <Converter />
                } />

                <Route path={'*'} element={
                    <NotFound />
                } />

            </Routes>
        </AnimatePresence>
    );
}

export default PageRoutes;
