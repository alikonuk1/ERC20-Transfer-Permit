const { ethers } = require("ethers");
const { signERC2612Permit } = require('eth-permit');


//Contract's functions
const abi = [

  "function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external"

];


async function main() {

//First part will generate permit values.

let privateKey = "0x000000000000000000000000000000"; //Wallet's private key which will let another address spend it's tokens
let gasPayerPriv = "0x0000000000000000000000000000"; //Wallet's private key to execute the permit function. It might be any account which has ethers.


let spender = "0x0000000000000000000000000000"; //Address to give permit. It can be any account address externally-owned or contract.
let rpcUrl = "https://"; //RPC URL.
let tokenAddress = "0x0000000000000000000000000000"; //Token contract address which will be given transfer permit to
let value = "100000000000000000000000000"; //Permitted amount to spend

const rpcProvider = new ethers.providers.JsonRpcProvider(rpcUrl);

const signerWallet = new ethers.Wallet(privateKey, rpcProvider); //Wallet object of signer who will give allowance.
const signerAddress = await signerWallet.getAddress();

const allowanceParameters = await signERC2612Permit(signerWallet, tokenAddress, signerAddress, spender, value); //Sign operation
console.log( allowanceParameters ); //Result values can be used manually to execute permit() function with web3 providers and websites like etherscan or bscscan.


//Next part will execute permit() function. If user wants execute manually next part is not required.

const gasPayerWallet = new ethers.Wallet(gasPayerPriv, rpcProvider); //Wallet to execute permit function
tokenContract = new ethers.Contract(tokenAddress, abi, gasPayerWallet); //Token contract to give permit. Gas Payer Wallet will be used to execute permit() function.

const execution = await tokenContract.permit(signerAddress, spender, value, allowanceParameters.deadline, allowanceParameters.v, allowanceParameters.r, allowanceParameters.s);

console.log("Program has ended.");


}

main();
