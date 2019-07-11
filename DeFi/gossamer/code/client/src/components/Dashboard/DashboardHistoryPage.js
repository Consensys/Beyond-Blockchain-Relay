import React from 'react';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';

const DashboardHistoryPage = (props) => {
  const NewLayout = ({ Table }) => (
    <div>
      <Table />
    </div>
  );

  const figureOutColor = (value) => {
    if (value > 0) {
      return <span style={{ color: 'green' }}>{value}</span>;
    }
    return <span style={{ color: 'red' }}>{value}</span>;
  };

  const DateColumn = ({ value }) => (
    <span style={{ fontStyle: 'italic' }}>{value}</span>
  );

  const AmountColumn = ({ value }) => (
    <span style={{ color: 'red' }}>{figureOutColor(value)}</span>
  );

  return (
    <div>
      <h1 className="title-text--bold dashboard-title-text">Your history</h1>
      <div className="dashboard-history-table-wrapper">
      <h2 className="medium-text">
        This is a record of every deposit and withdrawal you&apos;ve made on our platform since you created an account.
        For each transaction, you can see the exact date and time, amount and token used. <br/><br/>  If you have questions, feel free
        to ask on the support chat below! We&apos;ll get back to you as soon as we can.
      </h2>
      <Griddle
        data={props.userData.transactionHistory}
        plugins={[plugins.LocalPlugin]}
        pageProperties={{ currentPage: 1, pageSize: 100 }}
        components={{
          Layout: NewLayout,
        }}
      >
        <RowDefinition>
          <ColumnDefinition id="date" title="Date" customComponent={DateColumn} />
          <ColumnDefinition id="action" title="Action" />
          <ColumnDefinition id="amount" title="Amount" customComponent={AmountColumn} />
          <ColumnDefinition id="token" title="Token" />
          <ColumnDefinition id="txHash" title="Transaction Hash" />
        </RowDefinition>
      </Griddle>
      </div>
    </div>
  );
};

export default DashboardHistoryPage;
