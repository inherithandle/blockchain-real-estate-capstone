var RealEstateERC721Token = artifacts.require('RealEstateERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await RealEstateERC721Token.new( {from: account_one});
            assert.equal(true, true, "true is true!");
        })

        it('should return total supply', async function () {
            await this.contract.mint(account_one, 1234)
            let totalSupply = await this.contract.totalSupply()
            assert.equal(totalSupply, 1, "total supply should be one since we did mint function.")
        })

        it('should get token balance', async function () {
            await this.contract.mint(account_one, 1234)
            let balance = await this.contract.balanceOf(account_one)
            assert.equal(balance, 1, "account[0] balance should be one since we did mint function.")
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            await this.contract.mint(account_one, 1234)
            let tokenURI = await this.contract.tokenURI(1234)
            assert.equal("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1234", tokenURI)
        })

        it('should transfer token from one owner to another', async function () {
            await this.contract.mint(account_one, 1234)
            await this.contract.transferFrom(account_one, account_two, 1234)
            let accountOneBalance = await this.contract.balanceOf(account_one)
            let accountTwoBalance = await this.contract.balanceOf(account_two)
            assert.equal(accountOneBalance, 0, "account[0] balance should be zero")
            assert.equal(accountTwoBalance, 1, "account[1] balance should be one")
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await RealEstateERC721Token.new( {from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
            try {
                await this.contract.mint(account_one, 1234, {from: account_two})
            } catch (error) {
                let expectedErrMessage = 'Error: Returned error: VM Exception while processing transaction: revert caller must be a contract owner. -- Reason given: caller must be a contract owner..'
                assert.equal(expectedErrMessage, error)
            }
        })

        it('should return contract owner', async function () {
            let owner = await this.contract.owner()
            assert.equal(owner, account_one, "owner is account_one")
        })

    });
})