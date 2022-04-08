import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the Greeter contract`);

  // Initialize the wallet.
  const wallet = new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("Greeter");

  /*
  NOTE: The code bellow will try to deposit ETH to the L2 testnet first, so that you can pay the fees for the deployment.
  Since this requires Georli ETH, which is hard to get, you can skip this part and pay deployment fees with an ERC20 token,
  which you can receive on portal.zksync.io

  // Deposit some funds to L2 in order to be able to perform L2 transactions.
  const depositAmount = ethers.utils.parseEther("0.001");
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: depositAmount,
  });
  // Wait until the deposit is processed on zkSync
  await depositHandle.wait();
  */

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.
  const greeting = "Hi there!";
  /*
  NOTE: This is the deployment code, if you like to deploy and pay fees in for example USDC (0xd35CCeEAD182dcee0F148EbaC9447DA2c4D449c4),
  you can add the USDC address as a parameter. It also could be any other token!
  */
  const greeterContract = await deployer.deploy(artifact, [greeting], "0xd35CCeEAD182dcee0F148EbaC9447DA2c4D449c4");

  // Show the contract info.
  const contractAddress = greeterContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}