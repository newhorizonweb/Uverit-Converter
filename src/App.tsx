


// React
import { createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Page Switch
import PageRoutes from './app/core/PageRoutes';

// CSS
import './assets/css/general.css';
import './assets/css/app.css';

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
