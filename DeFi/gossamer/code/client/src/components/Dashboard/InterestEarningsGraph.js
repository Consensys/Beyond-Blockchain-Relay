import React from 'react';
import {
  Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import TooltipWidget from '../widgets/Tooltip';

const renderLegend = (value, entry, index) => {
  const content = [`Your money with ${value}`, `${value} High Yield Savings Acct`, 'Avg S&P 500 (stock market) returns', `${value} High Yield Savings Acct`];

  const { color } = entry;
  if (index === 0) {
    return <span style={{ color }}><strong>{content[index]}</strong></span>;
  }
  return <span style={{ color }}>{content[index]}</span>;
};

const InterestEarningsGraph = props => (
  <div className="dashboard-hero-graph-wrapper">
    <div className="dashboard-data-unit-caption">
      <h2 className="caption-text">Your potential gains vs. normal investing options</h2>
      <TooltipWidget
        height={10}
        width={10}
        message='If you deposited $10,000 - how much better would you do with us over 3 years vs. traditional investment alternatives? You can see for yourself right here.' />
    </div>
    <p className="small-text">This is a future projection of your earnings over a <strong>3-year horizon</strong> if you deposited <strong>$10,000</strong>, compared against competitor investments. Not only are we on the cutting edge, but our expected return will make you <strong>more money than the stock market, index funds or savings accounts.</strong></p>
    <ResponsiveContainer className="chart-container" width='100%' height='100%'>
      <LineChart
        data={props.balanceData}
        margin={{
          top: 30, right: 40, bottom: 150, left: 50,
        }} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis label={{ value: 'Potential Balance ($)', angle: -90, position: 'insideLeft' }} domain={[10000, 'dataMax + 145']} type="number" padding={{ left: 150, right: 30, bottom: 30 }} />
        <Tooltip
          formatter={(value, name) => ([`$${value.toFixed(2).toLocaleString()}`, `Your money with ${name}`])}
          />
        <Legend
          formatter={renderLegend}
          />
        <Line dataKey="us" stroke="#009874" fill="#009874" animationBegin={500} legendType='star' strokeWidth={3} />
        <Line dataKey="Marcus" stroke="#CCCC00" strokeDasharray="5 5" />
        <Line dataKey="SP" stroke="#000080" strokeDasharray="5 5" />
        <Line dataKey="AmEx" stroke="#FFA500" strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default InterestEarningsGraph;
