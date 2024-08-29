


// React
import Decimal from 'decimal.js';

// Assets
import { useEffect, useMemo, useState } from "react";
import { renderSelectOptions } from "../functions/GenerateSelect";

// TS
interface props {
    data: any;
}



function ConverterFields(props: props){

    // JSON file data with the units and values
    const data = props.data;



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

    // Output Unit Select Value
    const [ outputSelVal, setOutputSelVal ] = useState("");

    // Factor Select Value
    const [ factorSelVal, setFactorSelVal ] = useState(choiceValDef);

    // Exponent Toggle
    const [ isExponential, setIsExponential ] = useState(true);

    // Update the select unit values to the first option on page load
    useEffect(() => {
        const firstSelOpt = (document.querySelector('#units-input option') as HTMLInputElement)?.value;
        setInputSelVal(firstSelOpt);
        setOutputSelVal(firstSelOpt);
    }, [ data ]);



        /* Conversion */

    const limitDecimalInExponential = (val: Decimal) => {

        if (val.isZero()) return "0";

        // Convert the number to exponential notation
        const exponentialString = val.toNumber().toExponential();
    
        // Split the string into coefficient and exponent parts
        const [coefficient, exponent] = exponentialString.split('e');
    
        // Limit the coefficient decimal places
        const number = new Decimal(coefficient).toDecimalPlaces(factorSelVal);

        // Recombine the coefficient and exponent
        return `${number}e${exponent}`;

    }

    const convertToDecimal = (value: string) => {

        // Return 0 for empty input
        if (value.trim() === "") return new Decimal(0);

        // Return decimal.js value or NaN (e.g. when there are letters in the input)
        return !isNaN(Number(value)) ? new Decimal(value) : new Decimal(NaN);

    };
    const convertedVal = useMemo(() => {
        
        const convertUnits = () => {

            // Input Values
            // Use decimal.js to remove js floating poin shitshow
            const inputValue = convertToDecimal(inputVal);
            const inputUnit = convertToDecimal(inputSelVal);
            const outputUnit = convertToDecimal(outputSelVal);

            // Convert to the output value
            const resultRaw = inputValue.times(inputUnit).div(outputUnit);

            // Will return 0 if somthing's wrong (cath 'em all solution)
            let result: string | Decimal = new Decimal(0);

            // Change the conversion based on the current converter settings
            if (choice === "decimal" ||
            (choice === "exponential" && !isExponential)){
                result = resultRaw.toDecimalPlaces(factorSelVal);
            } else if (choice === "exponential") {
                result = limitDecimalInExponential(resultRaw);
            }
            
            return result.toString();

        };

        return convertUnits();

    }, [inputVal, inputSelVal, outputSelVal, factorSelVal, isExponential]);
    
    const operationContent = useMemo(() => {

        // Return if the input number is invalid / is not entered
        if (isNaN(parseFloat(inputVal))) return "---";

        // Input values
        const inputValue = convertToDecimal(inputVal);
        const inputUnit = convertToDecimal(inputSelVal);
        const outputUnit = convertToDecimal(outputSelVal);

        // Limit to x decimal places
        const roundedOutput = (inputUnit.div(outputUnit)).toDecimalPlaces(5);
        return `${inputValue} * ${roundedOutput}`;

    }, [inputVal, inputSelVal, outputSelVal]);



    return (
        <div className="converter-fields">

            <label htmlFor="units-input">From</label>
            <select name="units-input" id="units-input"
            data-testid="units-input" value={ inputSelVal }
            onChange={(e) => setInputSelVal(e.target.value)}>
                { renderSelectOptions(data) }
            </select>

            <div className="replace-units">[switch]</div>

            <label htmlFor="units-output">To</label>
            <select name="units-output" id="units-output"
            data-testid="units-output" value={ outputSelVal }
            onChange={(e) => setOutputSelVal(e.target.value)}>
                { renderSelectOptions(data) }
            </select>

            <input type="text" id="value-input"
                data-testid="value-input"
                aria-label="Enter a number to convert"
                placeholder="0.00"
                value={ inputVal }
                onChange={(e) => setInputVal(e.target.value)}
            />

            <div className="output">
                <div className="value-output">
                    { convertedVal }
                </div>
                <button className="copy-btn">[copy]</button>
            </div>

            { choice && choiceValMin <= choiceValMax &&
                <select name="user-choice" id="user-choice"
                data-testid="user-choice" aria-label="Decimals"
                value={ factorSelVal }
                onChange={(e) => setFactorSelVal(parseInt(e.target.value))}>
                    { choiceValArr.map((val) => (
                        <option key={`choice-val-${val}`} value={ val }>
                            { val }
                        </option>
                    ))}
                </select>
            }

            { choice === "exponential" &&
                <input type="checkbox" id="exponent-toggle"
                    aria-label="Exponential Notation Toggle"
                    checked={ isExponential }
                    onChange={() => setIsExponential(!isExponential)}
                />
            }

            { operation &&
                <div className="operation" data-testid="operation-field">
                    { operationContent }
                </div>
            }

        </div>
    );

}

export default ConverterFields;
