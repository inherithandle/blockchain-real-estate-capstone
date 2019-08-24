// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var MyVerifier = artifacts.require('MyVerifier');
var proofJSON = require('../../zokrates/code/square/proof')
// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps

    
// Test verification with incorrect proof
contract('MyVerifier', accounts => {

    const account_one = accounts[0];

    describe('MyVerifier test set', function () {

        beforeEach(async function () {
            this.contract = await MyVerifier.new({from: account_one});
        })

        it('verify preimage for square ', async function () {
            let verifyJSON = await this.contract.verifyTx(proofJSON.proof.a, proofJSON.proof.b, proofJSON.proof.c, proofJSON.inputs)
            assert.equal(verifyJSON.logs[0].event, "Verified");
            assert.equal(verifyJSON.logs[0].args['0'], "Transaction successfully verified.");
        });
    });
});