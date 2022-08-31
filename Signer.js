const { ethers } = require("ethers");
const { signERC2612Permit } = require('eth-permit');

const abi = [

  "function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external"

];


async function main() {

let privateKey = "0x000000000000000000000000000000";
let gasPayerPriv = "0x0000000000000000000000000000";


let spender = "0x0000000000000000000000000000";
let rpcUrl = "https://"; 
let tokenAddress = "0x0000000000000000000000000000";
let value = "100000000000000000000000000";

const rpcProvider = new ethers.providers.JsonRpcProvider(rpcUrl);

const signerWallet = new ethers.Wallet(privateKey, rpcProvider); 
const signerAddress = await signerWallet.getAddress();

const allowanceParameters = await signERC2612Permit(signerWallet, tokenAddress, signerAddress, spender, value); 
console.log( allowanceParameters ); 


const gasPayerWallet = new ethers.Wallet(gasPayerPriv, rpcProvider); 
tokenContract = new ethers.Contract(tokenAddress, abi, gasPayerWallet); 

const execution = await tokenContract.permit(signerAddress, spender, value, allowanceParameters.deadline, allowanceParameters.v, allowanceParameters.r, allowanceParameters.s);

console.log("Program has ended.");


}

main();
