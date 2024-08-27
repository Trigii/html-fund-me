// const { ethers } = require('ethers');
import { ethers } from './ethers-5.2.esm.min.js';
import { abi, contractAddress } from './constants.js';

const connectButton = document.getElementById('connectButton');
const balanceButton = document.getElementById('balanceButton');
const fundButton = document.getElementById('fundButton');
const withdrawButton = document.getElementById('withdrawButton');
connectButton.onclick = connect;
balanceButton.onclick = getBalance;
fundButton.onclick = fund;
withdrawButton.onclick = withdraw;

console.log(ethers);

// function to connect to the metamask wallet (async to avoid asking the user to connect every time we refresh)
async function connect() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' }); // promt the user with metamask wallet connection
        } catch (error) {
            console.log(error);
        }
        connectButton.innerHTML = 'Connected!'; // change the button to "Connected!"
    } else {
        connectButton.innerHTML = 'Please install metamask!'; // if the user doesent have metamask, warn him
    }
}

async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(contractAddress);
        console.log(ethers.utils.formatEther(balance));
    } else {
        connectButton.innerHTML = 'Please install metamask!'; // if the user doesent have metamask, warn him
    }
}

async function fund() {
    const ethAmount = document.getElementById('ethAmount').value; // get value inputed by the user
    console.log(`Funding with ${ethAmount}`);
    if (typeof window.ethereum !== 'undefined') {
        // provider -> connection to the blockchain
        // signer -> wallet
        // contract that we are interacting with:
        // ABI & address
        const provider = new ethers.providers.Web3Provider(window.ethereum); // obtains the provider (rpc endpoint) from metamask connected account (window.ethereum)
        const signer = provider.getSigner(); // get wallet connected to the provider
        const contract = new ethers.Contract(contractAddress, abi, signer); // fundMe contract connected to our signer (wallet)
        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            });
            // wait or listen for the tx to be mined
            await listenForTransactionMine(transactionResponse, provider);
            console.log('Fund done!');
        } catch (error) {
            console.log(error);
        }
    } else {
        connectButton.innerHTML = 'Please install metamask!'; // if the user doesent have metamask, warn him
    }
}

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`);
    // return new Promise();
    // listen for this transaction to be finished (the listener is a different process so calling "listenForTransactionMine" with await wont work)
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                `Completed with ${transactionReceipt.confirmations} confirmations`,
            );
            resolve(); // once the transaction hash is found (transaction is mined), we are going to log it and resolve
        });
    });
}

async function withdraw() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('Withdrawing...');
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(); // get wallet connected to the provider
        const contract = new ethers.Contract(contractAddress, abi, signer); // fundMe contract connected to our signer (wallet)

        try {
            const transactionResponse = await contract.withdraw();
            await listenForTransactionMine(transactionResponse, provider);
        } catch (error) {
            console.log(error);
        }
    } else {
        connectButton.innerHTML = 'Please install metamask!'; // if the user doesent have metamask, warn him
    }
}
