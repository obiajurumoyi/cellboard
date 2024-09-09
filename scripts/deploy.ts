import { ethers } from "hardhat";

async function main() {
  const cellboard = await ethers.deployContract("CellBoard", []);

  await cellboard.waitForDeployment();

  console.log(cellboard.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
