


// React
import { useState, useLayoutEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Transition
import PageTransition from '../core/PageTransition';

// Components
import PageHeading from "../elements/PageHeading";
import ConverterFields from "./ConverterFields";
import ConverterTable from "./ConverterTable";

// TS
interface props {
    groupName: string;
    converterName: string;
}



function Converter({ groupName, converterName }: props){

    const navigate = useNavigate();

    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [redirected, setRedirected] = useState(false);
    
    // Import json data
    const importJSON = async (fileName: string) => {

        try{
            const module = await import(`../../assets/json/${fileName}.json`);
            return module.default;
        } catch (error){
            console.error(`Failed to load ${fileName}.json`, error);

            // Navigate to the 404 page
            setRedirected(true);
            navigate(`/not-found`);

            return null;
        }

    };

    const fetchData = async () => {
        setIsLoading(true);
        setData(await importJSON(converterName));
        setIsLoading(false);
    };
    
    useLayoutEffect(() => {
        fetchData();
    }, [converterName]);


    
    // Loading message
    if (isLoading || redirected){
        return <p>Loading data...</p>;
    }

    // Actual content
    return (
        <section className="wrapper">

            <PageHeading
                group={groupName}
                heading={converterName}
            />

            <ConverterFields
                data={data}
            />

            <ConverterTable
                data={data}
            />

        </section>
    );

}

export default PageTransition(Converter);
