import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, ReferenceLine, LabelList, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import TooltipWidget from '../widgets/Tooltip';

const numberToPercentFormatter = value => (`${value}%`);

const InterestRateGraph = props => (
  <div className="dashboard-interest-graph-wrapper">
    <div className="dashboard-data-unit-caption">
      <h2 className="caption-text">Your earned interest rate over time</h2>
      <TooltipWidget
        height={10}
        width={10}
        message='Starting from the day of your first deposit, this graph shows the per-day average interest rate you&apos;ve earned on your deposit. If you add all these up and divide by the number of days, you get the average interest rate number one dashboard unit to the left. Remember, your interest rate changes slightly changes based on the amount of borrowing and lending activity on the Compound platform.' />
    </div>
    <div className="dashboard-graph-button-group">
      <label htmlFor="drop" className="dropdown-toggle">Options ▼</label>
          <input type="checkbox" id="drop" />
      <ul className="dropdown-menu dashboard-graph-button-dropdown">
        <li><a className="button--buttongroup" onClick={() => props.changeInterestGraphNumDaysToFilter(1)}>Today</a></li>
        <li><a className="button--buttongroup" onClick={() => props.changeInterestGraphNumDaysToFilter(7)}>Last 7 days</a></li>
        <li><a className="button--buttongroup" onClick={() => props.changeInterestGraphNumDaysToFilter(30)}>Last 30 days</a></li>
        <li><a className="button--buttongroup" onClick={() => props.changeInterestGraphNumDaysToFilter(60)}>Last 60 days</a></li>
      </ul>
    </div>
    <ResponsiveContainer className="chart-container" width='100%' height={300}>
      <LineChart
        className="line-chart-container"
        data={props.interestRateGraphData}
        margin={{
          top: 20, right: 20, left: 20, bottom: 150,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[4, 12]} tickFormatter={numberToPercentFormatter} />
        <Tooltip />
        <Legend />
        <ReferenceLine x='5/28' stroke="green" label="Today" />
        <Line type="monotone" dataKey="interestRate" stroke="#FA7268"
          dot={{ stroke: '#FA7268', strokeWidth: 4 }} activeDot={{ r: 8 }}
          animationDuration={2000} >
          <LabelList dataKey="interestRate" position="top" offset={15} formatter={numberToPercentFormatter}/>
          </Line>
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default InterestRateGraph;
