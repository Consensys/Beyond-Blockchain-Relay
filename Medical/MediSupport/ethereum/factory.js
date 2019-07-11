import web3 from "./web3";
import SchemeFactory from "./build/SchemeFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(SchemeFactory.interface),
  "0x81580DdaB58990b238DF5B3C35F8248e8E39e85a"
);

export default instance;
