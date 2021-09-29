// deploy code will go here
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'bronze then gasp carbon wagon weapon infant fetch ready mountain scheme absent',
    'https://rinkeby.infura.io/v3/75e2902f956341cbaad5e73251c1902e'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ gas: '500000000', from: accounts[0]});

    console.log('Contract deployed to', result.options.address);
};
deploy();
