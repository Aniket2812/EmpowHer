require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
