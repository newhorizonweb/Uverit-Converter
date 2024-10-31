

// React
import { useContext } from "react";
import { ConvContext } from './Converter';

// Locales
import { useTranslation } from 'react-i18next';

// Assets
import '../../assets/css/converter-table.css';
import '../../assets/css/print.css';
import { pdfIcon, multiPagePdfIcon } from "../core/SvgIcons";



function ConverterTable(){

    // Context
    const {
        data, converterName
    } = useContext(ConvContext);
    
    // Translation
    const { t } = useTranslation(
        ["app", "converter", converterName]
    );
    
    // Convert superscript and subscript tags
    const parseText = (txt: string) => {

        // Split the string
        const parts = txt.split(/(<\/?sub>|<\/?sup>)/);
    
        return parts.map((part, index) => {
            switch (part){
                case "<sub>":
                    return <sub key={index}>{parts[index + 1]}</sub>;

                case "<sup>":
                    return <sup key={index}>{parts[index + 1]}</sup>;

                case "</sub>":
                case "</sup>":
                    return null; // Skip closing tags

                default:
                    if (index > 0 && (parts[index - 1] === "<sub>" ||
                    parts[index - 1] === "<sup>")){
                        // Detect the text between the sub/sup tags
                        // and skip it (it's already inserted above)
                        return null;
                    }
                    return part; // Return normal text
            }
        }).filter(Boolean); // Remove null values
    };
    
    const printTables = () => {
        window.print();
    }

    // Each table is on a spearate page
    const printTablesSep = () => {
        document.body.classList.add("separate-pages");
        window.print();
        document.body.classList.remove("separate-pages");
    }



    return (
        <section className="unit-tables wrapper glass">
        
        { data && Object.keys(data).map((group) => (
        group !== 'settings' &&

            <div className="pdf-table-padding" key={ group }>
            <div className="outer-table glass">

                <h3 className="group-heading">
                    { t(`${converterName}:${group}-units`) }
                </h3>

                <div className="table-wrapper small-scroll">
                    <table className="converter-table">

                        <thead>

                            <tr className="col-names">

                                <th className="name">
                                    {t('converter:name')}
                                </th>

                                { data[group].table.map((col: string) => (
                                    <th key={ col } className={col}>
                                        {t(`converter:${col}`)}
                                    </th>
                                ))}

                            </tr>

                        </thead>

                        <tbody key={ group }>
                            
                            { Object.keys(data[group]).map((unit) => (
                                unit !== 'table' &&
            
                                <tr key={ unit } className={ unit }>

                                    <td className="name">
                                    { t(`${converterName}:${group}:${unit}`) }
                                    </td>

                                    { data[group].table.map((col: string) => (
                                        <td key={data[group][unit][col]}
                                        className={col}>
                {(() => {
                    const cellData = data[group][unit][col];
                    return !cellData.includes("t('")
                        ? parseText(cellData)
                        : t(`${converterName}:table-content:${cellData.replace(/^t\('|'\)$/g, '')}`);
                })()}
                                        </td>
                                    ))}

                                </tr>

                            ))}

                        </tbody>

                    </table>
                </div>
            
            </div>
            </div>
            
        ))}

            <div className="print-btns">
                <button className="print-btn svg-icon glass no-print"
                aria-label={t('converter:table-print')}
                title={t('converter:table-print')}
                onClick={ printTables }>
                    { pdfIcon }
                </button>

                <button className="print-btn svg-icon glass no-print"
                aria-label={t('converter:table-print')}
                title={t('converter:multi-table-print')}
                onClick={ printTablesSep }>
                    { multiPagePdfIcon }
                </button>
            </div>

        </section>
    );

}

export default ConverterTable;
