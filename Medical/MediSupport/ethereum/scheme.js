import web3 from "./web3";
import Scheme from "./build/Scheme.json"

export default (address) => {
    return new web3.eth.Contract(
            JSON.parse(Scheme.interface),
            address
        );
}