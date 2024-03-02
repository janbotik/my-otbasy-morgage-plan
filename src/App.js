import React, { useState } from 'react';

const InterestCalculator = () => {
  const [existingDepo, setExistingDepo] = useState('');
  const [existingDepoInt, setExistingDepoInt] = useState('');
  const [targetSum, setTargetSum] = useState('');
  const [monthlyDeposit, setMonthlyDeposit] = useState('');

  const [data, setData] = useState([]);

  const performCalculations = () => {
    const parsedExistingDepo = parseFloat(existingDepo) || 0;
    const parsedExistingDepoInt = parseFloat(existingDepoInt) || 0;
    const parsedTargetSum = parseFloat(targetSum) || 0;
    const parsedMonthlyDeposit = parseFloat(monthlyDeposit) || 0;

    if (parsedExistingDepo > 0 && parsedExistingDepoInt >= 0 && parsedTargetSum > 0) {
      const monthlyRate = Math.pow(1 + 0.02, 1 / 12) - 1;
      let totalSum = parsedExistingDepo;
      let cumRate = parsedExistingDepoInt;
      const newData = [];

      for (let i = 0; i < 60; i++) {
        cumRate += totalSum * monthlyRate;
        totalSum = totalSum * (1 + monthlyRate) + parsedMonthlyDeposit;
        newData.push({
          month: i + 1,
          monthlyDeposit: parsedMonthlyDeposit,
          total: Math.round(totalSum),
          interest: Math.round(cumRate),
          op: ((cumRate * 1000) / parsedTargetSum).toFixed(2)
        });
      }

      setData(newData);
    } else {
      setData([]); // Reset data if input values are not valid
    }
  };

  return (
    <div>
      <h2>Interest Calculation</h2>
      <div>
        <label>
          Existing Deposit: 
          <input 
            type="number"
            placeholder="0"
            value={existingDepo}
            onFocus={e => e.target.value === '0' && setExistingDepo('')}
            onBlur={e => e.target.value === '' && setExistingDepo('0')}
            onChange={e => setExistingDepo(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Existing Deposit Interest: 
          <input 
            type="number"
            placeholder="0"
            value={existingDepoInt}
            onFocus={e => e.target.value === '0' && setExistingDepoInt('')}
            onBlur={e => e.target.value === '' && setExistingDepoInt('0')}
            onChange={e => setExistingDepoInt(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Target Sum: 
          <input 
            type="number"
            placeholder="0"
            value={targetSum}
            onFocus={e => e.target.value === '0' && setTargetSum('')}
            onBlur={e => e.target.value === '' && setTargetSum('0')}
            onChange={e => setTargetSum(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Monthly Deposit: 
          <input 
            type="number"
            placeholder="0"
            value={monthlyDeposit}
            onFocus={e => e.target.value === '0' && setMonthlyDeposit('')}
            onBlur={e => e.target.value === '' && setMonthlyDeposit('0')}
            onChange={e => setMonthlyDeposit(e.target.value)}
          />
        </label>
      </div>
      <button onClick={performCalculations}>Calculate</button>
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Monthly Deposit</th>
              <th>Total</th>
              <th>Interest</th>
              <th>OP (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ month, monthlyDeposit, total, interest, op }) => (
              <tr key={month}>
                <td>{month}</td>
                <td>{monthlyDeposit}</td>
                <td>{total}</td>
                <td>{interest}</td>
                <td>{op}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InterestCalculator;
