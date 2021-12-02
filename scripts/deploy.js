
const hre = require("hardhat");

async function main() {
  

  const TestPermit = await hre.ethers.getContractFactory("TestPermit");
  const testPermit = await TestPermit.deploy("TestERC", "TRC");

  await testPermit.deployed();

  console.log("Greeter deployed to:", testPermit.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
