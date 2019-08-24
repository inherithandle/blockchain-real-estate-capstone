var MyVerifier = artifacts.require('MyVerifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var proofJSON = require('../../zokrates/code/square/proof')

contract('SolnSquareVerifier', accounts => {

    const account_one = accounts[0];

    describe('SolnSquareVerifier test set', function () {

        beforeEach(async function () {
            let myVerifier = await MyVerifier.new({from: account_one});
            this.contract = await SolnSquareVerifier.new(myVerifier.address, {from: account_one});
        })

        it('verify and mint', async function () {
            let tx = await this.contract.mintToken(account_one, 1234, proofJSON.proof.a, proofJSON.proof.b,
                proofJSON.proof.c, proofJSON.inputs)
            let totalSupply = await this.contract.totalSupply()
            // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
            assert.equal(totalSupply, 1, "total supply should be one since we did mint function.")


            // Test if a new solution can be added for contract - SolnSquareVerifier
            assert.equal(tx.logs[0].event, "SolutionAdded");
            assert.equal(tx.logs[0].args.to, account_one);
            assert.equal(tx.logs[0].args.index, 1234);
        });
    });
});