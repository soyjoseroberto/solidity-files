const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
// Always need to pass in a provider to ganache
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    // interface is the ABI
    // inbox is an obj you can use to interact with the contract in Ethereum
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi, there!'] })
        .send({ from: accounts[0], gas:'1000000'});

});

describe('Inbox', () => {
    it('deploys a contract', () => {
        // ok func tests for truthy values
        assert.ok(inbox.options.address);
    });
});
