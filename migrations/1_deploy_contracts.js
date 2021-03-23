const GraphLinqDepositor = artifacts.require("GraphLinqDepositor");

module.exports = function(deployer) {
    // graphlinq deployer, graphlinq token contract address
    deployer.deploy(GraphLinqDepositor, "0x9f508e0E6c2d55b2508ae70D6E9B448790F4a0ea", "0x9f508e0E6c2d55b2508ae70D6E9B448790F4a0ea");
};
