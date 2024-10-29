


// React
import { useEffect, useMemo, useState, useContext } from "react";
import { ConvContext } from './Converter';
import Decimal from 'decimal.js';

// Locales
import { useTranslation } from 'react-i18next';

// Assets
import '../../assets/css/converter-fields.css';
import { switchUnitsIcon, copyIcon, copiedIcon, expoIcon } from "../core/SvgIcons";
import { isBaseValid, numSys } from "../functions/NumSys";

// Components
import RenderSelectOptions from "../functions/GenerateSelect";



function ConverterFields(){

    // Context
    const {
        data, converterName
    } = useContext(ConvContext);

    // Translation
    const { t } = useTranslation(
        ["app", "converter", converterName]
    );

        /* User Choice & Operation Field */

    // Operation Field
    const operation = JSON.parse(data.settings["operation"]);

    // User Choice Range
    const choice = data.settings["choice"];
    const choiceValMin = parseInt(data.settings["choice-val-min"]);
    const choiceValMax = parseInt(data.settings["choice-val-max"]);
    const choiceValDef = parseInt(data.settings["choice-val-def"]);

    // Make an array from the JSON choice value range
    const choiceValArr =
        Array.from({ length: choiceValMax - choiceValMin + 1 },
        (_, i) => choiceValMin + i);



        /* Inputs */

    // Input Value
    const [ inputVal, setInputVal ] = useState("");

    // Input Unit Select Value
    const [ inputSelVal, setInputSelVal ] = useState("");
    const [ inputSelName, setInputSelName ] = useState("");

    // Output Unit Select Value
    const [ outputSelVal, setOutputSelVal ] = useState("");
    const [ outputSelName, setOutputSelName ] = useState("");

    const [ copiedResult, setCopiedResult ] = useState(false);

    // Factor Select Value
    const [ factorSelVal, setFactorSelVal ] = useState(choiceValDef);

    // Exponent Toggle
    const [ isExponential, setIsExponential ] = useState(true);
    
    // Update the select unit values to the first option on page load
    useEffect(() => {
        
        const select = (document.querySelector('#units-input') as HTMLSelectElement);

        // Default options (first and second if not found)
        const inputDef = parseInt(data.settings["input-def"] || 0);
        const outputDef = parseInt(data.settings["output-def"] || 1);

        // Input
        setInputSelVal(select.options[inputDef]?.value.split('_&_')[1] ?? 0);
        setInputSelName(select.options[inputDef]?.value ?? '');

        // Output
        setOutputSelVal(select.options[outputDef]?.value.split('_&_')[1] ?? 1);
        setOutputSelName(select.options[outputDef]?.value ?? '');

    }, [ data ]);

        /* Focus */

    const [keyboardFocus, setKeyboardFocus] = useState(false);

    const blurElem = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.target.blur();
    }

    useEffect(() => {

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Tab'){
                setKeyboardFocus(true);
            }
        };
        const handleMouseDown = () => {
            setKeyboardFocus(false);
        };
        const handleScroll = () => {
            if (document.activeElement instanceof HTMLElement){
                document.activeElement.blur();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    useEffect(() => {
        if (keyboardFocus){
            document.body.classList.add("keyboard-focus");
        } else {
            document.body.classList.remove("keyboard-focus");
        }
    }, [ keyboardFocus ]);

    

        /* Conversion */

    const checkExpoDecimals = (val: Decimal) => {

        if (val.isZero()) return "0";

        const strVal = val.toString();

        // Check if the number uses exponential notation
        // Which automatically happens with big numbers
        if (!strVal.includes('e') && !strVal.includes('E')){
            return val.toDecimalPlaces(factorSelVal);
        } else {
            const [coefficient, exponent] = strVal.split('e');
            const number = new Decimal(coefficient).toDecimalPlaces(factorSelVal);

            // Recombine the coefficient and exponent
            return !isNaN(Number(val)) ?
                `${number}e${exponent}` : new Decimal(NaN);
        }

    }

    const limitDecimalExpo = (val: Decimal) => {

        if (val.isZero()) return "0";

        // Convert the number to exponential notation
        const exponentialString = new Decimal(val).toExponential();
        
        // Split the string into coefficient and exponent parts
        const [coefficient, exponent] = exponentialString.split('e');
    
        // Limit the coefficient decimal places
        const number = new Decimal(coefficient).toDecimalPlaces(factorSelVal);

        // Recombine the coefficient and exponent
        return !isNaN(Number(val)) ?
            `${number}e${exponent}` : new Decimal(NaN);
        
    }

    const convertToDecimal = (value: string) => {
        
        // Return 0 for empty input
        if (value.trim() === "") return new Decimal(0);

        // Return decimal.js value or NaN
        // e.g. when there are letters in the input
        return !isNaN(Number(value)) ?
            new Decimal(value) : new Decimal(NaN);

    };

        /* Formulas */

    const toFormula = (value: Decimal, formula: string) => {
        const extFormula = formula.split('|')[0];
        const fn = new Function("Decimal", "val",
            `return ${extFormula.split('=>')[1]}`
        );
        return fn(Decimal, new Decimal(value));
    };
    
    const fromFormula = (value: Decimal, formula: string) => {
        const extFormula = formula.split('|')[1];
        const fn = new Function("Decimal", "val",
            `return ${extFormula.split('=>')[1]}`
        );
        return fn(Decimal, new Decimal(value));
    };

        /* Result Conversion */

    const convertedVal = useMemo(() => {
        
        const convertUnits = () => {

            // Will return 0 if somthing's wrong (cath 'em all solution)
            let result: string | Decimal = new Decimal(0);

            if (converterName === "temperature" ||
                converterName === "data_storage"
            ){

                const baseValue = toFormula(
                    new Decimal(Number(inputVal)), inputSelVal
                );
                
                const resultRaw = outputSelVal && inputVal ?
                    fromFormula(baseValue, outputSelVal) :
                    new Decimal(0);
                
                if (choice === "decimal" ||
                    (choice === "exponential" && !isExponential)
                ){
                    result = checkExpoDecimals(resultRaw);
                } else if (choice === "exponential"){
                    result = limitDecimalExpo(resultRaw);
                }
                
            } else if (converterName === "numeral_systems"){

                // Base validation
                const validBase = (base: number) =>
                    Math.max(2, Math.min(36, base));
                
                const fromBase = validBase(Number(inputSelVal));
                const toBase = validBase(Number(outputSelVal));

                // Input validation (invalid characters)
                if (!isBaseValid(inputVal, fromBase)) return "NaN";

                // Converted value
                const resultRaw = numSys(
                    inputVal, fromBase, toBase, factorSelVal
                ).toString();
                
                result = resultRaw;

            } else {

                // Input Values
                // Use decimal.js to remove js floating poin shitshow
                const inputValue = convertToDecimal(inputVal);
                const inputUnit = convertToDecimal(inputSelVal);
                const outputUnit = convertToDecimal(outputSelVal);

                // Convert to the output value
                const resultRaw = inputValue.times(inputUnit).div(outputUnit);

                // Change the conversion based on the current converter settings
                if (choice === "decimal" ||
                    (choice === "exponential" && !isExponential)
                ){
                    result = checkExpoDecimals(resultRaw);
                } else if (choice === "exponential"){
                    result = limitDecimalExpo(resultRaw);
                }

            }
                
            return result.toString();

        };

        return convertUnits();

    }, [inputVal, inputSelVal, outputSelVal, factorSelVal, isExponential]);
 


        /* Features */

    const switchUnits = () => {
        setInputSelVal(outputSelVal);
        setInputSelName(outputSelName);

        setOutputSelVal(inputSelVal);
        setOutputSelName(inputSelName);
    };

    const copyResult = () => {

        const resultVal = (document.querySelector('#result-field') as HTMLElement)?.innerText;

        // Show the "copied" icon and then remove it
        navigator.clipboard.writeText(resultVal).then(() => {

            setCopiedResult(true);

            setTimeout(() => {
                setCopiedResult(false);
            }, 1000)

        }).catch(function(error) {
            console.error('Failed to copy text: ', error);
        });
        
    };

    const operationContent = useMemo(() => {

        // Return if the input number is invalid / is not entered
        if (isNaN(parseFloat(inputVal))) return "-----";

        // Input values
        const inputValue = convertToDecimal(inputVal).toFixed(); // Prevent expo notat.
        const inputUnit = convertToDecimal(inputSelVal);
        const outputUnit = convertToDecimal(outputSelVal);
        
        // Limit the output number to x decimal places
        const limitToX = 5;
        const minNum = new Decimal(10).pow(-limitToX);
        const maxNum = new Decimal(10).pow(limitToX);

        const output = inputUnit.div(outputUnit);
        let roundedOutput;

        if (output.lt(minNum) || output.gt(maxNum)){
            roundedOutput = limitDecimalExpo(
                new Decimal(output.toExponential(limitToX))
            );
        } else {
            roundedOutput = output.toDecimalPlaces(limitToX);
        }
        
        return {
            inputValue: inputValue,
            roundedOutput: roundedOutput
        }

    }, [inputVal, inputSelVal, outputSelVal]);



    return (
        <div className="converter-fields glass no-print"
        data-testid="converter-fields">

            <div className="conv-section conv-inputs">

                <div className="conv-from conv-elem column">

                    <div className="conv-elem column">
                        <p className="inp-label">
                            {t('converter:from')}
                        </p>

                        <div className="conv-select">
                            <select name="units-input" id="units-input"
                            className="conv-inp glass small-scroll pointer hover"
                            data-testid="units-input" value={ inputSelName }
                            aria-label={`${t('converter:units')} ${t('converter:from')}`}
                            onChange={(e) => {
                                const eVal = e.target.value;
                                setInputSelVal(eVal.split('_&_')[1]);
                                setInputSelName(eVal);
                                blurElem(e);
                            }}>
                                <RenderSelectOptions
                                    data={ data }
                                />
                            </select>
                        </div>
                    </div>

                    <input type="text" id="value-input"
                        className="conv-inp glass hover"
                        data-testid="value-input"
                        aria-label={t("converter:enter-number")}

                        inputMode="numeric"
                        maxLength={24}
                        placeholder="0.00"
                        pattern="[0-9]*"
                        value={ inputVal }
                        onChange={(e) => setInputVal(e.target.value)}
                    />

                </div>

                <div className="switch-units conv-elem column no-flex">
                    <p>&nbsp;</p>
                    <button className="switch-units-btn svg-icon glass"
                    data-testid="switch-units"
                    aria-label={t("converter:switch-units")}
                    onClick={ switchUnits }>
                        { switchUnitsIcon }
                    </button>
                </div>

                <div className="conv-to conv-elem column">

                    <div className="conv-elem column">
                        <p className="inp-label">
                            {t('converter:to')}
                        </p>

                        <div className="conv-select">
                            <select name="units-output" id="units-output"
                            className="conv-inp glass small-scroll pointer hover"
                            data-testid="units-output"
                            value={ outputSelName }
                            aria-label={`${t('converter:units')} ${t('converter:to')}`}
                            onChange={(e) => {
                                const eVal = e.target.value;
                                setOutputSelVal(eVal.split('_&_')[1]);
                                setOutputSelName(eVal);
                                blurElem(e);
                            }}>
                                <RenderSelectOptions
                                    data={ data }
                                />
                            </select>
                        </div>
                    </div>

                    <div className="result-field conv-inp glass" id="result-field">
                        <p data-testid="result-txt">
                            { convertedVal }
                        </p>
                    </div>

                </div>

            </div>

            <div className="conv-section conv-features">

            
                <div className="operation conv-elem column">
                { operation && <>
                    <p className="inp-label">
                        {t("converter:operation")}
                    </p>

                    <div className="conv-inp glass operation-field"
                    data-testid="operation-field">
                        { operationContent === "-----" ? (
                            <p className="operation-center">
                                { operationContent }
                            </p>
                        ) : (
                            <p>
                                <span 
                                className="operation-input">
                                    {operationContent.inputValue.toString()}
                                    </span>
                                <span>&nbsp;*&nbsp;</span>
                                <span>
                                    {operationContent.roundedOutput.toString()}
                                </span>
                            </p>
                        )}
                    </div>
                </>}
                </div>

                <div className="gap-placeholder">
                    <p>&nbsp;</p>
                    <div></div>
                </div>

                <div className="conv-elem conv-features-user">

                    { choice && choiceValMin <= choiceValMax &&
                    <div className="conv-elem conv-decimals column no-flex">
                        <p className="inp-label">
                            {t("converter:decimals")}
                        </p>

                        <div className="conv-select">
                            <select name="user-choice"
                            className="user-choice conv-inp small-scroll glass pointer hover"
                            data-testid="user-choice"
                            aria-label={t("converter:decimals")}
                            value={ factorSelVal }
                            onChange={(e) => {
                                setFactorSelVal(parseInt(e.target.value));
                                blurElem(e);
                            }}>
                                { choiceValArr.map((val) => (
                                    <option key={`choice-val-${val}`} value={ val }>
                                        { val }
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                    }

                    { choice === "exponential" &&
                        <button className={`svg-icon expo-btn svg-icon glass
                            ${isExponential ? "expo-enabled" : ""}
                        `}
                        data-testid="exponential-btn"
                        aria-label={t('converter:expo-toggle')}
                        onClick={() => setIsExponential(!isExponential)}>
                            { expoIcon }
                        </button>
                    }

                    <button className={`copy-btn svg-icon glass 
                        ${ copiedResult ? "copied-result" : "" }
                    `}
                    data-testid="copy-btn"
                    aria-label={t("converter:copy-result")}
                    onClick={ copyResult }>
                        { copiedResult ? copiedIcon : copyIcon }
                    </button>

                </div>

            </div>
            
        </div>
    );

}

export default ConverterFields;
