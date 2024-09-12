


// React
import { createContext, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Page Switch
import PageRoutes from './app/core/PageRoutes';

// CSS
import './assets/css/general.css';
import './assets/css/app.css';

// Locales
import { useTranslation } from 'react-i18next';

// Components
import Nav from './app/components/Nav';
import Footer from './app/components/Footer';
import ScrollBackground from './app/components/ScrollBackground';

// Github Repo Name
const urlPath:string = "/Uverit-Converter";

// Context Content
const ContextContent = {
    urlPath
};

// Send the context hook to the children components
const PageContext = createContext(ContextContent);

function App() {

    // Add a body class when changing the language
    const { i18n } = useTranslation();

    const handleLangChng = (lng: string) => {
        document.body.classList.forEach((className) => {
            if (className.startsWith('lang-')){
                document.body.classList.remove(className);
            }
        });
        document.body.classList.add(`lang-${lng}`);
      };

    useEffect(() => {
        i18n.on('languageChanged', handleLangChng);
    }, [ i18n ])

    return (
        <div className="App">
            <PageContext.Provider value={ContextContent}>
                <Router basename={""}>

                    <ScrollBackground />
                    <Nav />
                    <PageRoutes />
                    <Footer />
                    
                </Router>
            </PageContext.Provider>
        </div>
    );
}

export { PageContext };
export default App;
