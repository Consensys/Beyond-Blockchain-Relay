const routes = require("next-routes")();

routes
    .add("/schemes/new", "/schemes/new")
    .add("/schemes/:address", "/schemes/show")
    .add("/schemes/:address/claims", "/schemes/claims/index")
    .add("/schemes/:address/claims/new", "/schemes/claims/new");

module.exports = routes;