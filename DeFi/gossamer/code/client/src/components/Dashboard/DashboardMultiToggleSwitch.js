import React from 'react';
import MultiToggle from 'react-multi-toggle';
import { withRouter } from 'react-router-dom';

const DashboardMultiToggleSwitch = props => (
  <MultiToggle
    options={[
      { displayName: 'Earnings', value: 'earnings' },
      { displayName: 'Manage', value: 'manage' },
      { displayName: 'History', value: 'history' },
    ]}
    selectedOption={props.currentPage}
    onSelectOption={props.changePage}
  />
);

export default withRouter(DashboardMultiToggleSwitch);
