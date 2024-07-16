import React, { useEffect, useState } from 'react';
import './stock1Styles.css'; // Import your CSS file

const SearchYourStocks = () => {
    const [values, setValues] = useState([]);
    const [myArray, setMyArray] = useState([]);
    const [keyValuePairs, setKeyValuePairs] = useState({});
    const [selectedStock, setSelectedStock] = useState(null);
    const [sort, setSort] = useState([]);
    const [sortDetails, setSortDetails] = useState([]);

    useEffect(() => {
        fetch('https://sheets.googleapis.com/v4/spreadsheets/18IDm-Ut2i3zXsLSxLU5h-Ox9Xm0Bxi1kK9qVrPLR2dA/values/Latest_values?alt=json&key=AIzaSyAq3ypn4xpDpaquusYVJ3e00OHhLnH7__k')
            .then(response => response.json())
            .then(data => {
                const fetchedValues = data.values.slice(1);
                setValues(fetchedValues);

                let industrySet = new Set();
                fetchedValues.forEach(row => {
                    if (row[3] && row[3] !== "#N/A") {
                        industrySet.add(row[3]);
                    }
                });
                
                setMyArray(Array.from(industrySet));
                const tempKeyValuePairs = {};
                industrySet.forEach(industry => {
                    tempKeyValuePairs[industry] = fetchedValues
                        .filter(row => row[3] === industry)
                        .map(row => row[4]);
                });
                setKeyValuePairs(tempKeyValuePairs);
            });
    }, []);

    const handleStockClick = (index) => {
        const stock = myArray[index];
        const stockValues = keyValuePairs[stock] || [];
        // Add logic to display stock details or create a table
        // Set the selected stock for rendering details
        // console.log(stockValues);
        setSelectedStock(stock);
    };

    const renderTable = () => {
        return (
            <table border="1">
                <thead>
                    <tr>
                        <th>Stocks</th>
                        <th>Values</th>
                    </tr>
                </thead>
                <tbody>
                    {myArray.map((industry, index) => {
                        const undervalue = keyValuePairs[industry]?.filter(v => v > 1.3 && v <= 10).length || 0;
                        const balanced = keyValuePairs[industry]?.filter(v => v > 0.8 && v <= 1.3).length || 0;
                        const overvalue = keyValuePairs[industry]?.filter(v => v <= 0.8).length || 0;
                        let statusClass = '';

                        if (undervalue >= balanced && undervalue > overvalue) {
                            statusClass = 'darkgreen-value';
                        } else if (balanced > undervalue && balanced > overvalue) {
                            statusClass = 'yellow-value';
                        } else {
                            statusClass = 'vlow-value';
                        }

                        return (
                            <tr key={index} onClick={() => handleStockClick(index)}>
                                <td>{industry}</td>
                                <td className={statusClass}>{statusClass}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Search Your Stock</h2>
            <h4>Right Time, Right Price, Right Stock, Right Proportion</h4>
            <div>
                {renderTable()}
            </div>
            {selectedStock && <div>{/* Render additional stock details here */}</div>}
        </div>
    );
};

export default SearchYourStocks;