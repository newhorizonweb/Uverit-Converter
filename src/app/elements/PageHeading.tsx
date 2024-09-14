


// React
import { useState, useContext, useEffect } from "react";
import { ConvContext } from '../components/Converter';

// Locales
import { useTranslation } from 'react-i18next';

// Assets
import '../../assets/css/page-heading.css';
import { capitalize } from '../functions/CapitalizeText';


// Define the props interface
interface PropTypes {
    heading?: string;
}

// Update the component to use props
const PageHeading: React.FC<PropTypes> = ({ heading }) => {

    // Translation
    const { t } = useTranslation(['app']);

    const { groupName, converterName } = useContext(ConvContext);
    const [headingTxt, setHeadingTxt] = useState("");

    useEffect(() => {

        if (heading) {
            setHeadingTxt(capitalize(heading));
        } else if (groupName && converterName) {
            setHeadingTxt(capitalize(
                t(`groups.${groupName}.${converterName}`)
            ));
        } else {
            setHeadingTxt("Error");
        }
        
    }, [heading, groupName, converterName, t]);


    
    return (
        <div className="page-heading glass no-print">
            <h1 className="page-heading-text glass"
            data-testid={converterName}>
                { headingTxt }
            </h1>
        </div>
    );
    
}
 
export default PageHeading;
