
const hre = require("hardhat");

async function main() {

  const Contract = await hre.ethers.getContractAt("ERC20Permit");
  const contract = await Contract.deploy("ERC20Test");

  await contract.deployed();

  console.log("Greeter deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
