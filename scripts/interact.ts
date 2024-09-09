import { ethers } from "hardhat";

async function main() {
  const cellboard = await ethers.getContractAt(
    "IColorHack",
    "0x28eC3aE0ca476640FD0ec8f3ef003C64635e5d23"
  );

  await cellboard.setColors();

  const number = await cellboard.getColor(4, 3);

  console.log(Number(number));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
