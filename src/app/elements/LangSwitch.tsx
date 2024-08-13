


// React
import { useEffect, useRef, useState } from 'react';
import '../../assets/css/lang-switch.css';
import i18next from "i18next";

// Assets
import { langIcon } from "../core/SvgIcons";
import Flag_US from '../../assets/img/flags/us.svg';
import Flag_DE from '../../assets/img/flags/de.svg';
import Flag_ES from '../../assets/img/flags/es.svg';
import Flag_FR from '../../assets/img/flags/fr.svg';
import Flag_IT from '../../assets/img/flags/it.svg';
import Flag_PL from '../../assets/img/flags/pl.svg';



function LangSwitch(){

    // Language List
    const langList = [
        {
            langName: "English",
            code: "en",
            country: Flag_US,
        },
        {
            langName: "Deutsch",
            code: "de",
            country: Flag_DE,
        },
        {
            langName: "Español",
            code: "es",
            country: Flag_ES,
        },
        {
            langName: "Français",
            code: "fr",
            country: Flag_FR,
        },
        {
            langName: "Italiano",
            code: "it",
            country: Flag_IT,
        },
        {
            langName: "Polski",
            code: "pl",
            country: Flag_PL,
        }
    ];

    // Language list popup
    const [isLangExpand, setIsLangExpand] = useState(false);

    // Current language
    const [currLang, setCurrLang] = useState(
        localStorage.getItem("i18nextLng") ?? ""
    );

    // Change language
    const chngLang = (langCode: string) => {
        i18next.changeLanguage(langCode);
        setCurrLang(langCode);
        setIsLangExpand(false);
    };

    // Update the language on page load
    // AFTER the localStorage is set by the i18next
    useEffect(() => {
        chngLang(localStorage.getItem("i18nextLng") ?? "")
    }, []);

    // Language Switch Div
    const langSwitchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        
        const handleClickOutside = (event: MouseEvent) => {
            if (langSwitchRef.current &&
            event.target instanceof Node &&
            !langSwitchRef.current.contains(event.target)){
                setIsLangExpand(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        
    }, [langSwitchRef]);



    return (
        <div ref={langSwitchRef} data-testid="lang-switch"
        className={`lang-switch ${isLangExpand ? "lang-expanded" : ""}`}>

            <div className="lang-btn" data-testid="lang-btn"
            onClick={() => setIsLangExpand(!isLangExpand)}>
                { langIcon }
            </div>

            <div className="lang-popup glass">
                <div className="lang-popup-inner glass">

                    {langList.map(({ langName, code, country }) => (
                        <div className={`lang-item
                            ${currLang === code ? 'curr-lang' : ''}`}
                            data-testid={`lang-switch-${langName}`}
                            onClick={() => {chngLang(code)}} key={code}>

                            <div className="lang-flag">
                                <img src={country} alt={`${code} flag`} />
                            </div>
                            <p>{ langName }</p>

                        </div>
                    ))}
                    
                </div>
            </div>

        </div>
    );
}

export default LangSwitch;
