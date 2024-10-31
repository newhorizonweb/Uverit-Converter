


// React
import { useContext } from "react";
import { ConvContext } from '../components/Converter';
 
// Locales
import { useTranslation } from 'react-i18next';

// Define the props interface
interface PropTypes {
    data: any;
}

// Update the component to use props
const RenderSelectOptions: React.FC<PropTypes> = ({ data }) => {

    // Context
    const { converterName } = useContext(ConvContext);

    // Translation
    const { t } = useTranslation(
        [converterName]
    );

    const cleanText = (txt: string) => {
        return txt.replace(/<sup>|<\/sup>|<sub>|<\/sub>|\(x\)/g, '');
    }

    return ( <>
        { data && Object.keys(data).map((group) => (
        group !== 'settings' &&
            
            <optgroup key={ group } label={t(`${group}-units`)} className="conv-optgroup">

            { Object.keys(data[group]).map((unit) => (
            unit !== 'table' &&

                <option key={unit}
                value={`${group}&${unit}_&_${data[group][unit].val}`}>

                    {`${t(`${group}.${unit}`)} 
                    
                    ${data[group][unit].symbol && data[group][unit].symbol !== "-"
                        ? `(${cleanText(data[group][unit].symbol)})`
                        : ""
                    }`}

                </option>

            ))}

            </optgroup>

        ))}
    </> );
};

export default RenderSelectOptions;
