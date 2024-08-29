

 
export const renderSelectOptions = (data: any) => {
    return ( <>
        { data && Object.keys(data).map((group) => (
           group !== 'settings' &&
           
           <optgroup key={ group } label={`${group} units`}>

                { Object.keys(data[group]).map((unit) => (

                    unit !== 'table' &&

                    <option key={ unit }
                    value={ data[group][unit].val }>
                        { unit }
                    </option>

                ))}

            </optgroup>

        ))}
    </> );
};
