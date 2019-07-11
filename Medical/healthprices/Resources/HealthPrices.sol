pragma solidity ^0.4.26;
/*
HealthPrices.net (C) 2019 Seena Zandipour
*/
contract HealthPrices {
  struct Average {
      uint total;
      uint count;
  }
  mapping(string => mapping(string => Average)) AvgValues;

  function submitCost(string region, string procedure, uint _cost) public
  {
    AvgValues[region][procedure].total += _cost; // Switch this function to use SafeMath lib
    AvgValues[region][procedure].count++;
  }

  function getAverage(string region, string procedure) public view returns (uint avg){ // Switch to float
    return uint(AvgValues[region][procedure].total) / uint(AvgValues[region][procedure].count);
  }
}
