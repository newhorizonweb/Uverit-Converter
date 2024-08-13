


// Locales
import { useTranslation } from 'react-i18next';

// Assets
import '../../assets/css/page-heading.css';
import { capitalize } from '../functions/CapitalizeText';

// TS
interface PropTypes{
    group?: string;
    heading: string;
}

const PageHeading = (props: PropTypes) => {

    const group = props.group;
    const heading = props.heading;

    // Translation
    const { t } = useTranslation(['app']);
    
    return (
        <div className="page-heading glass">
            <h1 className="page-heading-text glass">
                { group && capitalize(t(`groups.${group}.${heading}`)) }
                { !group && capitalize(heading) }
            </h1>
        </div>
    );
    
}
 
export default PageHeading;
