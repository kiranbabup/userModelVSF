import React, { useState, useEffect } from 'react';
import './App.css';
import risk1 from './images/risk1.png';
import risk2 from './images/risk2.png';
import risk3 from './images/risk3.png';
import risk4 from './images/risk4.png';
import risk5 from './images/risk5.png';

const StockSearch = () => {
  const [values, setValues] = useState([]);
  const [myArray, setMyArray] = useState([]);
  const [keyValuePairs, setKeyValuePairs] = useState({});
  const [sort, setSort] = useState([]);
  const [sort1, setSort1] = useState([]);
  const [img, setMyImg] = useState('');
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(new Set());
  const [totalSum, setTotalSum] = useState(0); 

  const [showTable1, setShowTable1] = useState(false);
  const [showTable2, setShowTable2] = useState(false);
  const [showTable3, setShowTable3] = useState(false);
  const [valueArray, setValueArray] = useState([]);

  useEffect(() => {
    fetch('https://sheets.googleapis.com/v4/spreadsheets/18IDm-Ut2i3zXsLSxLU5h-Ox9Xm0Bxi1kK9qVrPLR2dA/values/Latest_values?alt=json&key=AIzaSyAq3ypn4xpDpaquusYVJ3e00OHhLnH7__k')
      .then(response => response.json())
      .then(response => {
        const valuesData = response.values.slice(1);
        setValues(valuesData);

        const industrySet = new Set();
        valuesData.forEach(row => {
          if (row[3] !== "#N/A") {
            industrySet.add(row[3]);
          }
        });
        const industries = Array.from(industrySet).sort();
        setMyArray(industries);

        const keyValueMap = {};
        industries.forEach(industry => {
          const industryValues = valuesData.filter(row => row[3] === industry).map(row => row[4]);
          keyValueMap[industry] = industryValues;
        });
        setKeyValuePairs(keyValueMap);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const myfun1 = (index) => {
    const filteredValues = values.filter(value => value[3].includes(myArray[index]));
    const sortValues = filteredValues.map(value => value[4]);
    const sort1Values = filteredValues.map(value => `${value[0]},,${value[4]},,${value[5]},,${value[6]}`);
    setSort(sortValues);
    setSort1(sort1Values);
    setShowTable1(true);
  };

  const handleClick = (event, value, splitValue) => {
    const numericValue = parseFloat(splitValue.split(',,')[1]);

    let updatedLoad = new Set(load);
    updatedLoad.add(splitValue);

    setValueArray(prevValueArray => [...prevValueArray, numericValue]);

    setLoad(updatedLoad);
    setShowTable2(true);
  };

  const handleDelete = (value) => {
    const updatedLoad = new Set(load);
    updatedLoad.delete(value);
    setLoad(updatedLoad);
    setShowTable2(false);
    if (updatedLoad.size === 0) {
      setShowTable3(false); 
    }
  };

  const myfunn = (index) => {
    let imgSrc = '';
    let text = '';

    if (index > '2.5' && index <= '10') {
      imgSrc = risk1;
      text = index.split(',,')[1];
    } else if (index > '1.3' && index <= '2.5') {
      imgSrc = risk2;
      text = index.split(',,')[1];
    } else if (index > '0.8' && index <= '1.3') {
      imgSrc = risk3;
      text = index.split(',,')[1];
    } else if (index > '0.4' && index <= '0.8') {
      imgSrc = risk4;
      text = index.split(',,')[1];
    } else {
      imgSrc = risk5;
      text = index.split(',,')[1];
    }
    setMyImg(`<img src="${imgSrc}" alt="Page Image">`);
    document.getElementById('image').innerHTML = `<img src="${imgSrc}" alt="Page Image">`;
    document.getElementById('text').innerHTML = text;
  };

  useEffect(() => {
    let sum = 0;
    Array.from(load).forEach(value => {
      const numericValue = parseFloat(value.split(',,')[1]);
      sum += numericValue;
    });

    setTotalSum(sum);
    setShowTable3(load.size > 0); 
  }, [load]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {showTable3 && (
        <div id="table3">
          <table border="1">
            <thead>
              <tr>
                <th>#</th>
                <th>Stock</th>
                <th>%</th>
                <th>Del</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(load).map((value, i) => {
                const numericValue = parseFloat(value.split(',,')[1]);
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{value.split(',,')[0]}</td>
                    <td>{((numericValue / totalSum) * 100).toFixed(1)}</td>
                    <td style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleDelete(value)}>
                      <button>-</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <table id="table" border={1}>
          <thead>
            <tr>
              <th>Stock Name</th>
              <th>Value </th>
            </tr>
          </thead>
          <tbody>
            {myArray.map((value, index) => {
              let undervalue = 0;
              let balanced = 0;
              let overvalue = 0;

              keyValuePairs[value].forEach(val => {
                if (val > 1.3 && val <= 10) {
                  undervalue++;
                } else if (val > 0.8 && val <= 1.3) {
                  balanced++;
                } else {
                  overvalue++;
                }
              });

              let ovl = '';
              if (undervalue >= balanced && undervalue > overvalue) {
                ovl = "Undervalued";
              } else if (balanced > undervalue && balanced > overvalue) {
                ovl = "Balanced";
              } else {
                ovl = "Overvalue";
              }

              return (
                <tr key={index} onClick={() => myfun1(index)}>
                  <td>{value}</td>
                  <td style={{
                    backgroundColor: ovl === 'Undervalued' ? '#63BE7B' :
                      ovl === 'Overvalue' ? '#F8696B' :
                        ovl === 'Balanced' ? '#FFEB3B' :
                          '#FFEF9C'
                  }}>
                    {ovl}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {showTable1 && (
          <div id="table1">
            <table border="1">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                  <th>Quality</th>
                  <th>Growth</th>
                  <th>Add</th>
                </tr>
              </thead>
              <tbody>
                {sort.map((value, i) => {
                  const splitValues = sort1[i].split(',,');
                  const value4 = parseFloat(splitValues[1]);
                  const value2 = parseFloat(splitValues[2]);
                  const value3 = parseFloat(splitValues[3]);

                  let tdClassName = '';
                  if (value4 > 2.5 && value4 <= 10) {
                    tdClassName = 'darkgreen-value';
                  } else if (value4 > 1.3 && value4 <= 2.5) {
                    tdClassName = 'lightgreen-value';
                  } else if (value4 > 0.8 && value4 <= 1.3) {
                    tdClassName = 'yellow-value';
                  } else if (value4 > 0.4 && value4 <= 0.8) {
                    tdClassName = 'orange-value';
                  } else {
                    tdClassName = 'vlow-value';
                  }

                  let tdClassName2 = '';
                  if (value2 > 80 && value2 <= 100) {
                    tdClassName2 = 'darkgreen-value';
                  } else if (value2 > 60 && value2 <= 80) {
                    tdClassName2 = 'lightgreen-value';
                  } else if (value2 > 40 && value2 <= 60) {
                    tdClassName2 = 'yellow-value';
                  } else if (value2 > 20 && value2 <= 40) {
                    tdClassName2 = 'orange-value';
                  } else {
                    tdClassName2 = 'vlow-value';
                  }

                  let tdClassName3 = '';
                  if (value3 > 80 && value3 <= 100) {
                    tdClassName3 = 'darkgreen-value';
                  } else if (value3 > 60 && value3 <= 80) {
                    tdClassName3 = 'lightgreen-value';
                  } else if (value3 > 40 && value3 <= 60) {
                    tdClassName3 = 'yellow-value';
                  } else if (value3 > 20 && value3 <= 40) {
                    tdClassName3 = 'orange-value';
                  } else {
                    tdClassName3 = 'vlow-value';
                  }

                  return (
                    <tr key={i} onClick={() => myfunn(`${value},,${splitValues[0]}`)}>
                      <td>{splitValues[0]}</td>
                      <td className={tdClassName}>{splitValues[1]}</td>
                      <td className={tdClassName2}>{splitValues[2]}</td>
                      <td className={tdClassName3}>{splitValues[3]}</td>
                      <td
                        onClick={(event) => {
                          handleClick(event, value, `${splitValues[0]},,${splitValues[1]}`);
                          event.stopPropagation();
                        }}
                        style={{ textAlign: 'center', cursor: 'pointer' }}
                      >
                        +
                      </td>
                    </tr>
                  );
                }
                )}
              </tbody>
            </table>
          </div>
        )}

        <div>
          <div id="image"></div>
          <div id="text" style={{ margin: '0', padding: '50px', justifyContent: 'center', alignItems: 'center' }}></div>
        </div>
      </div>
    </>
  );
};

// export default StockSearch;
