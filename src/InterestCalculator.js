import React, { useState, useEffect } from 'react';

const InterestCalculator = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const calculateInterest = () => {
      const monthlyRate = Math.pow(1 + 0.02, 1 / 12) - 1;
      const existingDepo = 2458248 + 2319035 + 2513278 + 700000;
      let existingDepoInt = 61503 + 53471 + 61383;
      const months = 24;
      const monthlyDeposit = 0;
      const monthlyDeposits = Array(120).fill(0).map((_, index) => index < months ? monthlyDeposit : 0);
      let totalSum = existingDepo;
      const targetSum = 16000000;
      let cumRate = existingDepoInt;
      const newData = [];

      for (let i = 0; i < 60; i++) {
        cumRate += totalSum * monthlyRate;
        totalSum = totalSum * (1 + monthlyRate) + monthlyDeposits[i];
        newData.push({
          month: i + 1,
          monthlyDeposit: monthlyDeposits[i],
          total: Math.round(totalSum),
          interest: Math.round(cumRate),
          op: (cumRate * 1000 / targetSum).toFixed(2)
        });
      }

      setData(newData);
    };

    calculateInterest();
  }, []);

  return (
    <div>
      <h2>Interest Calculation</h2>
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
    </div>
  );
};

export default InterestCalculator;
