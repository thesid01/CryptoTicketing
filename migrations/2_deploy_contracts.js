var Events = artifacts.require("Events");
var StableToken = artifacts.require("StableToken");

module.exports = function(deployer) {
	deployer.deploy(StableToken, 18000).then(function() {
		return deployer.deploy(Events, StableToken.address);
  });
};