pragma solidity >=0.4.21 <0.6.0;
//pragma experimental ABIEncoderV2;


import "./Verifier.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";
import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract MyVerifier is Verifier{

}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is RealEstateERC721Token {
    MyVerifier public verifierContract;

    constructor(address verifierAddress) RealEstateERC721Token() public {
        verifierContract = MyVerifier(verifierAddress);

    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solutions {
        uint index; // tokenId
        address to;
    }

    // TODO define an array of the above struct
    Solutions[] solutions;


    // TODO define a mapping to store unique solutions submitted
    mapping (bytes32 => Solutions) private uniqueSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint index, address to); // tokenId

    // TODO Create a function to add the solutions to the array and emit the event
    function addToSolutions(address to, uint index, bytes32 key) public {
        Solutions memory solutionStruct = Solutions({
            index: index,
            to: to
        });
        solutions.push(solutionStruct);
        uniqueSolutions[key] = solutionStruct;

        emit SolutionAdded(index, to);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintToken(address _to,uint _tokenId, uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input) public {

        bytes32 key = keccak256(abi.encodePacked(a, b[0], b[1], c, input));
        require(uniqueSolutions[key].to == address(0), "should be unique.");
        require(verifierContract.verifyTx(a, b, c, input), "invalid proof");

        addToSolutions(_to,_tokenId,key);
        super.mint(_to,_tokenId);
    }



}





















  


























