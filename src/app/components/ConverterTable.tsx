

// React
import { useContext } from "react";
import { ConvContext } from './Converter';

// Locales
import { useTranslation } from 'react-i18next';

// Assets
import '../../assets/css/converter-table.css';
import '../../assets/css/print.css';
import { pdfIcon } from "../core/SvgIcons";



function ConverterTable(){

    // Context
    const {
        data, converterName
    } = useContext(ConvContext);
    
    // Translation
    const { t } = useTranslation(
        ["app", "converter", converterName]
    );
    
    // Change notation to return a tag instead of string
    const parseNotation = (notation: string) => {
        const parts = notation.split(/<sup>|<\/sup>/);
        return parts.map((part, index) => 
            index % 2 === 0 ? part : <sup key={index}>{part}</sup>
        );
    }

    const printTables = () => {
        window.print();
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
                                            { col === "notation" ? (
                                                parseNotation(data[group][unit][col])
                                            ) : (
                                                data[group][unit][col]
                                            )}
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

            <button className="print-btn svg-icon glass no-print"
            aria-label={t('converter:table-print')}
            onClick={ printTables }>
                { pdfIcon }
            </button>

        </section>
    );

}

export default ConverterTable;
