// migrating the appropriate contracts
var MyVerifier = artifacts.require("./MyVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var RealEstateERC721Token = artifacts.require('./RealEstateERC721Token.sol')
// const mnemonic = "spirit supply whale amount human item harsh scare congress discover talent hamster";
// const Web3 = require("web3");



module.exports = function(deployer, network) {
    if (network == 'development') {
        deployer.deploy(MyVerifier).then(async(contract) => {
            deployer.deploy(SolnSquareVerifier, contract.address);
        });
    }

    if (network == 'rinkeby' || network == 'rinkeby-fork') {
        deployer.deploy(RealEstateERC721Token).then(contract => {
            console.log(`RealEstateERC721Token address : ${contract.address}`);
        })
    }


      // if (network == 'rinkeby') {
      //
      //   promise.then(async (instance) => {
      //     // const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/b7f9b8737bb5483fa65b04196b442877");
      //     // const web3 = new Web3(provider);
      //     // const accounts = await web3.eth.getAccounts();
      //
      //     // need to change this address according to your wallet.
      //     const address = '0x27D8D15CbC94527cAdf5eC14B69519aE23288B95';
      //     let i;
      //     for (i = 10; i < 20; i++) {
      //       let tx = await instance.mintToken(address, i,
      //           proofJSON.proof.a, proofJSON.proof.b, proofJSON.proof.c, proofJSON.inputs);
      //       if (tx.logs[0].event == "SolutionAdded") {
      //         console.log(`i token added.`)
      //       }
      //     }
      //   })
      //
      //
      // }


};
