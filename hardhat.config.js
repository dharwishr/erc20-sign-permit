require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
const fs = require("fs");
const privateKey = fs.readFileSync(".secrets/.secret").toString().trim();
const projectId = fs.readFileSync(".secrets/.projectSecret").toString().trim();
const apiKey = fs.readFileSync(".secrets/.apiSecret").toString().trim();

module.exports = {
  defaultNetwork: "hardhat",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: apiKey,
  },
  solidity: "0.8.4",
};
