


// TS
interface props {
    data: any;
}



function ConverterTable(props: props){

    // JSON file data with the units and values
    const data = props.data;

    return (
        <table className="converter-table">
            { data && Object.keys(data).map((group) => (
            group !== 'settings' &&
                
                <tbody key={ group }>

                    <tr>
                        <th colSpan={ data[group].table.length + 1 }>
                            { group } units
                        </th>
                    </tr>

                    <tr>
                        <th>
                            Name (to translate i18n)
                        </th>

                        { data[group].table.map((col: string) => (
                            <th key={ col } className={col}>
                                { col }
                            </th>
                        ))}

                    </tr>
                    
                    { Object.keys(data[group]).map((unit) => (
                        unit !== 'table' &&
    
                        <tr key={ unit } className={ unit }>

                            <td>{ unit }</td>

                            { data[group].table.map((col: string) => (
                                <td key={ data[group][unit][col] }
                                className={ col }>
                                    { data[group][unit][col] }
                                </td>
                            ))}

                        </tr>

                    ))}

                </tbody>

            ))}

        </table>
    );

}

export default ConverterTable;
