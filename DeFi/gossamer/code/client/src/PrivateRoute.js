import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (
  {
    component: Component,
    auth,
    checkingSession,
    userData,
    getUserData,
    getTokenToUSDConversionRate,
    financialData,
    callSmartContractFunction,
    pollForUserDepositThenSupply,
    userStatus,
    amountSupplied,
    changeUserStatus,
    renderNavbar,
    ...rest
  },
) => {
  if (!checkingSession) {
    return (
      <Route
        {...rest}
        render={props => (
          auth.isAuthenticated() === true
            ? <Component {...props}
                userData={userData}
                financialData={financialData}
                getUserData={getUserData}
                getTokenToUSDConversionRate={getTokenToUSDConversionRate}
                callSmartContractFunction={callSmartContractFunction}
                pollForUserDepositThenSupply={pollForUserDepositThenSupply}
                userStatus={userStatus}
                amountSupplied={amountSupplied}
                changeUserStatus={changeUserStatus}
                renderNavbar={renderNavbar}
              />
            : <Redirect to='/' />
        )}
      />
    );
  }
  return null;
};

export default PrivateRoute;
