


// Assets
import '../../assets/css/page-heading.css';
import { capitalize } from '../functions/CapitalizeText';

// TS
interface PropTypes{
    heading: string
}

const PageHeading = (props: PropTypes) => {

    const heading = props.heading;

    return (
        <div className="page-heading glass">
            <h1 className="page-heading-text glass">{ capitalize(heading) }</h1>
        </div>
    );
    
}
 
export default PageHeading;
