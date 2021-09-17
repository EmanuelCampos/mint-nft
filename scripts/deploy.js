const hre = require("hardhat"); //import the hardhat

async function main() {
  const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  console.log("Deploying contracts with the account:", deployer.address); 

  const FactoryNFT = await hre.ethers.getContractFactory("FactoryNFT"); // Getting the Contract
  const factoryNFT = await FactoryNFT.deploy(); //deploying the contract

  await factoryNFT.deployed(); // waiting for the contract to be deployed

  console.log("FactoryNFT deployed to:", factoryNFT.address); // Returning the contract address on the rinkeby
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); // Calling the function to deploy the contract 