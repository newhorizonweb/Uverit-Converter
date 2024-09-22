

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
    
    // Convert Superscript and subscript
    const parseText = (txt: string) => {

        if (/<sup>/.test(txt)){
            const parts = txt.split(/<sup>|<\/sup>/);
            return parts.map((part, index) =>
                index % 2 === 0 ? part : <sup key={index}>{part}</sup>
            );
        } else if (/<sub>/.test(txt)){
            const parts = txt.split(/<sub>|<\/sub>/);
            return parts.map((part, index) =>
                index % 2 === 0 ? part : <sub key={index}>{part}</sub>
            );
        } else {
            return txt;
        }
        
    }

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
                                            { parseText(data[group][unit][col]) }
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
