require("@nomiclabs/hardhat-waffle");

const projectId = ""
const privateWalletKey = ""

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.3",
  networks: {
    rinkeby: {
     url: `https://rinkeby.infura.io/v3/${projectId}`, //Infura url with projectId
     accounts: [privateWalletKey] // add the account that will deploy the contract (private key)
    },
  }
};
