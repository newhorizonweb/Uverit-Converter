


import Decimal from 'decimal.js';

export const isBaseValid = (input: string, base: number) => {
    return input.toLowerCase().replace('.', '').split('')
        .every(char => !isNaN(parseInt(char, base)));
};
 
export const numSys = (
    inputVal: string, 
    fromBase: number, 
    toBase: number, 
    precision: number
): string => {

    // Integer and fractional parts
    let [intInp, fractionInp] = (inputVal ?? "0").split('.');

    // Prevent errors when omitting "0", like ".1001"
    intInp = intInp || "0";

    // Convert integer part
    const decimalInteger = new Decimal(parseInt(intInp, fromBase));
    let convertedInteger = decimalInteger.toNumber().toString(toBase);

    // Handle the fractional part if it exists
    let convertedFraction = '';

    if (fractionInp){

        // Convert the fractional part to decimal
        const fractionalSum = fractionInp.split('').reduce((acc, digit, i) => {
            const digitValue = new Decimal(parseInt(digit, fromBase));
            const position = new Decimal(fromBase).pow(-1 * (i + 1));
            return acc.plus(digitValue.times(position));
        }, new Decimal(0));

        // Calculate fractional digits
        let decimalFraction = fractionalSum;
        const toBaseDecimal = new Decimal(toBase);

        // Calculate one extra digit for rounding
        const decimals = Array.from({ length: precision + 1 }).map(() => {
            const product = decimalFraction.times(toBaseDecimal);
            const digit = product.floor();
            decimalFraction = product.minus(digit);
            return digit.toNumber();
        });

        // Rounding based on the extra digit
        const shouldRoundUp = decimals[precision] >= toBase / 2;

        if (shouldRoundUp){
            
            let index = precision - 1;

            while (index >= 0){
                decimals[index] += 1;
                if (decimals[index] >= toBase) {
                    decimals[index] = 0;
                    index--;
                } else break;
            }

            // Handle carrying over to the integer part
            if (index < 0){
                convertedInteger = (parseInt(convertedInteger, toBase) + 1).toString(toBase);
            }

        }

        // Convert digits to target base and join
        const roundedDecimals = decimals
            .slice(0, precision)
            .map(digit => digit.toString(toBase));

        // Only add fraction digits if it's not all zeros, like "e.0"
        // It can happen when rounding up to the integer digit
        if (roundedDecimals.some(digit => digit !== '0')){
            convertedFraction = '.' + roundedDecimals.join('');
        }

    }

    // Remove trailing zeros
    const fraction = convertedFraction.replace(/(\.[0-9a-zA-Z]*[1-9a-zA-Z])0+$/, '$1');

    return convertedFraction ? convertedInteger + fraction : convertedInteger;

};
