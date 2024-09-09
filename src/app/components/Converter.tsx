


// React
import { useState, useLayoutEffect, createContext, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

// Locales
import { useTranslation } from 'react-i18next';

// Transition
import PageTransition from '../core/PageTransition';

// Assets
import '../../assets/css/converter.css';
import { PageContext } from '../../App';
import { clockIcon } from '../core/SvgIcons'

// Components
import PageHeading from "../elements/PageHeading";
import ConverterFields from "./ConverterFields";
import ConverterTable from "./ConverterTable";

// TS
interface props {
    groupName: string;
    converterName: string;
}

// Context
interface ConvContextType{
    data: any;
    groupName: string;
    converterName: string;
}

const defaultContext = {
    data: null,
    groupName: '',
    converterName: ''
}

const ConvContext = createContext<ConvContextType>(defaultContext);



function Converter({ groupName, converterName }: props){

    // Page Context Variables
    const { urlPath } = useContext(PageContext);

    // Translation
    const { t } = useTranslation(['app']);

    const navigate = useNavigate();
    const routeLocation = useLocation();

    // Context
    const [convData, setConvData] = useState<ConvContextType>({
        data: null,
        groupName: groupName,
        converterName: converterName
    });
    
    const [isLoading, setIsLoading] = useState(true);
    const [redirected, setRedirected] = useState(false);

    // Capitalized Page Title
    const capitalizeTitle = (str: string) => {
        return str.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    const page = t(`groups.${groupName}.${converterName}`);
    const group = t(`groups.${groupName}.${groupName}`);

    const pageTitle = () => {
        document.title = capitalizeTitle(
            `Uverit Converter - ${page}${groupName === 'length' ?
            ` ${group}` : ""}`
        );
    }
    
    // Import json data
    const importJSON = async (fileName: string) => {

        try{

            const baseUrl = `${process.env.PUBLIC_URL}/assets/conv_data/${fileName}.json`;

            const module = await fetch(baseUrl, { mode: 'cors' })
            .then(res => {
                if (!res.ok){
                    throw new Error(`Failed to load ${fileName}.json`);
                }
                return res.json();
            });

            return module;

        } catch (error){
            console.error(`Failed to load ${fileName}.json`, error);

            // Navigate to the 404 page
            setRedirected(true);
            navigate(
                `${urlPath}/not-found`, 
                { state: { from: routeLocation.pathname }, replace: true }
            );

            return null;
        }

    };

    const fetchData = async () => {
        setIsLoading(true);

        // Set the context data
        setConvData({
            data: await importJSON(converterName),
            groupName,
            converterName
        });
        
        setIsLoading(false);
    };
    
    useLayoutEffect(() => {
        pageTitle();
        fetchData();
    }, [converterName]);


    
    // No data - redirection to the 404 page
    if (redirected){
        return (
            <div className="no-content whole-screen wrapper"></div>
        );
    }

    // Loading message
    if (isLoading){
        return (
            <div className="no-content whole-screen wrapper">
                <div className="clock glass">
                    { clockIcon }
                </div>
            </div>
        );
    }

    // Actual content
    return (
        <ConvContext.Provider value={ convData }>
            <section className="wrapper converter">

                <PageHeading />

                <ConverterFields />

                <ConverterTable />

            </section>
        </ConvContext.Provider>
    );

}

export { ConvContext };
export default PageTransition(Converter);
