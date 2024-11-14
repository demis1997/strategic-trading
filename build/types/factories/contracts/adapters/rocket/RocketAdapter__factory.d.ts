import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { RocketAdapter, RocketAdapterInterface } from "../../../../contracts/adapters/rocket/RocketAdapter";
type RocketAdapterConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class RocketAdapter__factory extends ContractFactory {
    constructor(...args: RocketAdapterConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<RocketAdapter & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): RocketAdapter__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50612244806100206000396000f3fe6080604052600436106101c65760003560e01c80636a4234eb116100f7578063ca7acdcd11610095578063e567e86911610064578063e567e86914610567578063f0fa55a91461057c578063f8c8765e1461059c578063fc9cee3c146105bc57600080fd5b8063ca7acdcd146104e9578063d02641a014610509578063d16352af14610529578063d547741f1461054757600080fd5b806391d14854116100d157806391d1485414610474578063970de3811461049457806398d1e967146104b4578063a217fddf146104d457600080fd5b80636a4234eb146103f25780637e531a39146104125780638456cb591461045f57600080fd5b806336568abe116101645780634f0e0ef31161013e5780634f0e0ef31461034e5780635354c2b11461036e5780635c975abb146103ad5780636a39fe60146103d257600080fd5b806336568abe146103035780633e032a3b146103235780633f4ba83a1461033957600080fd5b80631bacfd0b116101a05780631bacfd0b14610261578063248a9ca3146102a35780632ee09f42146102c35780632f2ff15d146102e357600080fd5b806301ffc9a7146101d25780630676c1b71461020757806313e69bf81461023f57600080fd5b366101cd57005b600080fd5b3480156101de57600080fd5b506101f26101ed366004611cb5565b6105d1565b60405190151581526020015b60405180910390f35b34801561021357600080fd5b50600354610227906001600160a01b031681565b6040516001600160a01b0390911681526020016101fe565b34801561024b57600080fd5b5061025f61025a366004611cfb565b610608565b005b34801561026d57600080fd5b506102957f4fe08aea4652d25d7d2c09148537810c0b7e49021cc60dd467483872e4452ff581565b6040519081526020016101fe565b3480156102af57600080fd5b506102956102be366004611d16565b6106c6565b3480156102cf57600080fd5b5061025f6102de366004611cfb565b6106e8565b3480156102ef57600080fd5b5061025f6102fe366004611d2f565b61079e565b34801561030f57600080fd5b5061025f61031e366004611d2f565b6107c0565b34801561032f57600080fd5b5061029560015481565b34801561034557600080fd5b5061025f6107f8565b34801561035a57600080fd5b50600054610227906001600160a01b031681565b34801561037a57600080fd5b5061038e610389366004611d69565b61080e565b604080516001600160a01b0390931683526020830191909152016101fe565b3480156103b957600080fd5b506000805160206121ef8339815191525460ff166101f2565b3480156103de57600080fd5b5061038e6103ed366004611de1565b610dc3565b3480156103fe57600080fd5b5061025f61040d366004611cfb565b611173565b34801561041e57600080fd5b5061045260405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525081565b6040516101fe9190611f0c565b34801561046b57600080fd5b5061025f611229565b34801561048057600080fd5b506101f261048f366004611d2f565b61123c565b3480156104a057600080fd5b5061038e6104af366004611f3f565b611274565b3480156104c057600080fd5b50600454610227906001600160a01b031681565b3480156104e057600080fd5b50610295600081565b3480156104f557600080fd5b50600554610227906001600160a01b031681565b34801561051557600080fd5b50610295610524366004611cfb565b6112bd565b34801561053557600080fd5b506003546001600160a01b0316610227565b34801561055357600080fd5b5061025f610562366004611d2f565b61132b565b34801561057357600080fd5b50610452611347565b34801561058857600080fd5b5061025f610597366004611d16565b6113d5565b3480156105a857600080fd5b5061025f6105b7366004611f69565b611444565b3480156105c857600080fd5b50600154610295565b60006001600160e01b03198216637965db0b60e01b148061060257506301ffc9a760e01b6001600160e01b03198316145b92915050565b6000610613816116b9565b610645826040518060400160405280601081526020016f70726f746f636f6c416464726573735f60801b8152506116c3565b6040516e70726f746f636f6c4164647265737360881b8152600f016040519081900381206001600160a01b0384168252907f943e9d45a11aaae5d87503e3bc248665d9807856e5cf2bdb4a988bee444227819060200160405180910390a250600380546001600160a01b0319166001600160a01b0392909216919091179055565b60009081526000805160206121cf833981519152602052604090206001015490565b60006106f3816116b9565b610721826040518060400160405280600c81526020016b72455448416464726573735f60a01b8152506116c3565b6040516a724554484164647265737360a81b8152600b016040519081900381206001600160a01b0384168252907f943e9d45a11aaae5d87503e3bc248665d9807856e5cf2bdb4a988bee444227819060200160405180910390a250600580546001600160a01b0319166001600160a01b0392909216919091179055565b6107a7826106c6565b6107b0816116b9565b6107ba83836116f0565b50505050565b6001600160a01b03811633146107e95760405163334bd91960e11b815260040160405180910390fd5b6107f38282611795565b505050565b6000610803816116b9565b61080b611811565b50565b600080610819611871565b6108216118a4565b7f4fe08aea4652d25d7d2c09148537810c0b7e49021cc60dd467483872e4452ff561084b816116b9565b610874886040518060400160405280600781526020016673656e6465725f60c81b8152506116c3565b61089f876040518060400160405280600981526020016872656365697665725f60b81b8152506116c3565b6108c78660405180604001604052806006815260200165746f6b656e5f60d01b8152506116c3565b6108f5856040518060400160405280600c81526020016b746f6b656e416d6f756e745f60a01b8152506118ee565b6000546001600160a01b0387811691161461092357604051632f5e77a960e01b815260040160405180910390fd5b60005461093b906001600160a01b0316893088611911565b600054604051632e1a7d4d60e01b8152600481018790526001600160a01b0390911690632e1a7d4d90602401600060405180830381600087803b15801561098157600080fd5b505af1158015610995573d6000803e3d6000fd5b50506004805460408051636ada784760e01b815290516001600160a01b039092169450636ada7847935080830192602092918290030181865afa1580156109e0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a049190611fbd565b610a21576040516326d1807b60e01b815260040160405180910390fd5b60048054604080516301ae78a160e11b815290516001600160a01b039092169263035cf1429282820192602092908290030181865afa158015610a68573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a8c9190611fda565b851015610aac5760405163011bcd8360e41b815260040160405180910390fd5b600085600360009054906101000a90046001600160a01b03166001600160a01b03166312065fe06040518163ffffffff1660e01b8152600401602060405180830381865afa158015610b02573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b269190611fda565b610b309190612009565b90506000600460009054906101000a90046001600160a01b03166001600160a01b031663fd6ce89e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610b87573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bab9190611fda565b905080821115610bce576040516362fc4d6760e11b815260040160405180910390fd5b6000670de0b6b3a7640000600154670de0b6b3a7640000610bef919061201c565b610bf9908a61202f565b610c039190612046565b9050600360009054906101000a90046001600160a01b03166001600160a01b031663d0e30db0896040518263ffffffff1660e01b81526004016000604051808303818588803b158015610c5557600080fd5b505af1158015610c69573d6000803e3d6000fd5b50506005546040516370a0823160e01b8152306004820152600094506001600160a01b0390911692506370a082319150602401602060405180830381865afa158015610cb9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cdd9190611fda565b905081811015610d0f5760405163c60d402760e01b815260048101839052602481018290526044015b60405180910390fd5b6005546001600160a01b03169650945084610d2b878c83611978565b866001600160a01b03168a6001600160a01b03168d6001600160a01b03167f044d4bbddd3af59e620636cb231e96ccd6acfbac6aa9a369ea17075cc839daee8c8a604051610d83929190918252602082015260400190565b60405180910390a45050505050610db960017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055565b9550959350505050565b600080610def896040518060400160405280600781526020016663616c6c65725f60c81b8152506116c3565b610e1a886040518060400160405280600981526020016872656365697665725f60b81b8152506116c3565b610e42876040518060400160405280600681526020016561737365745f60d01b8152506116c3565b610e7785604051806040016040528060138152602001726c6971756964546f6b656e416464726573735f60681b8152506116c3565b610ea6866040518060400160405280600d81526020016c617373657473416d6f756e745f60981b8152506118ee565b610ed8846040518060400160405280601081526020016f616d6f756e74496e4d6178696d756d5f60801b8152506118ee565b600554604051638b32fa2360e01b8152600481018690526000916001600160a01b031690638b32fa2390602401602060405180830381865afa158015610f22573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f469190611fda565b90506000600560009054906101000a90046001600160a01b03166001600160a01b031663d6eb59106040518163ffffffff1660e01b8152600401602060405180830381865afa158015610f9d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fc19190611fda565b905080821115610fd057600080fd5b610fe56001600160a01b0388168c3089611911565b600554604051630852cd8d60e31b8152600481018890526001600160a01b03909116906342966c6890602401600060405180830381600087803b15801561102b57600080fd5b505af115801561103f573d6000803e3d6000fd5b50505050886001600160a01b031663d0e30db0836040518263ffffffff1660e01b81526004016000604051808303818588803b15801561107e57600080fd5b505af1158015611092573d6000803e3d6000fd5b505060405163a9059cbb60e01b81526001600160a01b038e81166004830152602482018790528d16935063a9059cbb925060440190506020604051808303816000875af11580156110e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061110b9190611fbd565b50604080518781526001600160a01b038b811660208301529181018a9052818916918c811691908e16907fb50a58e455523e349c8e52077b9c73c5501c301f58c903c383b2eda002094a689060600160405180910390a4509699959850949650505050505050565b600061117e816116b9565b6111ac826040518060400160405280600c81526020016b77657468416464726573735f60a01b8152506116c3565b6040516a776574684164647265737360a81b8152600b016040519081900381206001600160a01b0384168252907f943e9d45a11aaae5d87503e3bc248665d9807856e5cf2bdb4a988bee444227819060200160405180910390a250600080546001600160a01b0319166001600160a01b0392909216919091179055565b6000611234816116b9565b61080b6119cf565b60009182526000805160206121cf833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60008060405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525060405162461bcd60e51b8152600401610d069190611f0c565b600554604080516339aa885b60e21b815290516000926001600160a01b03169163e6aa216c9160048083019260209291908290030181865afa158015611307573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106029190611fda565b611334826106c6565b61133d816116b9565b6107ba8383611795565b6002805461135490612068565b80601f016020809104026020016040519081016040528092919081815260200182805461138090612068565b80156113cd5780601f106113a2576101008083540402835291602001916113cd565b820191906000526020600020905b8154815290600101906020018083116113b057829003601f168201915b505050505081565b60006113e0816116b9565b61140b8260405180604001604052806009815260200168736c6970706167655f60b81b8152506118ee565b6040518281527ff5a802650e0a86db227cc342f06327d2ca0ff5cf2b12e0084fc5d8a7db2c54fd9060200160405180910390a150600155565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff1660008115801561148a5750825b905060008267ffffffffffffffff1660011480156114a75750303b155b9050811580156114b5575080155b156114d35760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff1916600117855583156114fd57845460ff60401b1916600160401b1785555b61152f896040518060400160405280601081526020016f70726f746f636f6c416464726573735f60801b8152506116c3565b6115678860405180604001604052806016815260200175726f636b657453657474696e6773416464726573735f60501b8152506116c3565b611595876040518060400160405280600c81526020016b77657468416464726573735f60a01b8152506116c3565b6115c3866040518060400160405280600c81526020016b72455448416464726573735f60a01b8152506116c3565b6115cb611a18565b6115d3611a20565b6115db611a30565b6115e66000336116f0565b50600380546001600160a01b03808c166001600160a01b031992831617909255600480548b8416908316179055600080548a8416908316179055600580549289169290911691909117905567016345785d8a0000600155604080518082019091526006815265149bd8dad95d60d21b602082015260029061166790826120f2565b5083156116ae57845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050505050565b61080b8133611a40565b6001600160a01b0382166116ec578060405163eac0d38960e01b8152600401610d069190611f0c565b5050565b60006000805160206121cf83398151915261170b848461123c565b61178b576000848152602082815260408083206001600160a01b03871684529091529020805460ff191660011790556117413390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a46001915050610602565b6000915050610602565b60006000805160206121cf8339815191526117b0848461123c565b1561178b576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a46001915050610602565b611819611a79565b6000805160206121ef833981519152805460ff191681557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a150565b6000805160206121ef8339815191525460ff16156118a25760405163d93c066560e01b815260040160405180910390fd5b565b7f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f008054600119016118e857604051633ee5aeb560e01b815260040160405180910390fd5b60029055565b816000036116ec57806040516303b3e63560e41b8152600401610d069190611f0c565b6040516001600160a01b0384811660248301528381166044830152606482018390526107ba9186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b038381831617835250505050611aa9565b6040516001600160a01b038381166024830152604482018390526107f391859182169063a9059cbb90606401611946565b60017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055565b6119d7611871565b6000805160206121ef833981519152805460ff191660011781557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25833611853565b6118a2611b0c565b611a28611b0c565b6118a2611b55565b611a38611b0c565b6118a2611b5d565b611a4a828261123c565b6116ec5760405163e2517d3f60e01b81526001600160a01b038216600482015260248101839052604401610d06565b6000805160206121ef8339815191525460ff166118a257604051638dfc202b60e01b815260040160405180910390fd5b6000611abe6001600160a01b03841683611b7e565b90508051600014158015611ae3575080806020019051810190611ae19190611fbd565b155b156107f357604051635274afe760e01b81526001600160a01b0384166004820152602401610d06565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff166118a257604051631afcd79f60e31b815260040160405180910390fd5b6119a9611b0c565b611b65611b0c565b6000805160206121ef833981519152805460ff19169055565b6060611b8c83836000611b93565b9392505050565b606081471015611bb85760405163cd78605960e01b8152306004820152602401610d06565b600080856001600160a01b03168486604051611bd491906121b2565b60006040518083038185875af1925050503d8060008114611c11576040519150601f19603f3d011682016040523d82523d6000602084013e611c16565b606091505b5091509150611c26868383611c30565b9695505050505050565b606082611c4557611c4082611c8c565b611b8c565b8151158015611c5c57506001600160a01b0384163b155b15611c8557604051639996b31560e01b81526001600160a01b0385166004820152602401610d06565b5080611b8c565b805115611c9c5780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b600060208284031215611cc757600080fd5b81356001600160e01b031981168114611b8c57600080fd5b80356001600160a01b0381168114611cf657600080fd5b919050565b600060208284031215611d0d57600080fd5b611b8c82611cdf565b600060208284031215611d2857600080fd5b5035919050565b60008060408385031215611d4257600080fd5b82359150611d5260208401611cdf565b90509250929050565b801515811461080b57600080fd5b600080600080600060a08688031215611d8157600080fd5b611d8a86611cdf565b9450611d9860208701611cdf565b9350611da660408701611cdf565b9250606086013591506080860135611dbd81611d5b565b809150509295509295909350565b634e487b7160e01b600052604160045260246000fd5b600080600080600080600060e0888a031215611dfc57600080fd5b611e0588611cdf565b9650611e1360208901611cdf565b9550611e2160408901611cdf565b945060608801359350611e3660808901611cdf565b925060a0880135915060c088013567ffffffffffffffff80821115611e5a57600080fd5b818a0191508a601f830112611e6e57600080fd5b813581811115611e8057611e80611dcb565b604051601f8201601f19908116603f01168101908382118183101715611ea857611ea8611dcb565b816040528281528d6020848701011115611ec157600080fd5b82602086016020830137600060208483010152809550505050505092959891949750929550565b60005b83811015611f03578181015183820152602001611eeb565b50506000910152565b6020815260008251806020840152611f2b816040850160208701611ee8565b601f01601f19169190910160400192915050565b60008060408385031215611f5257600080fd5b611f5b83611cdf565b9150611d5260208401611cdf565b60008060008060808587031215611f7f57600080fd5b611f8885611cdf565b9350611f9660208601611cdf565b9250611fa460408601611cdf565b9150611fb260608601611cdf565b905092959194509250565b600060208284031215611fcf57600080fd5b8151611b8c81611d5b565b600060208284031215611fec57600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561060257610602611ff3565b8181038181111561060257610602611ff3565b808202811582820484141761060257610602611ff3565b60008261206357634e487b7160e01b600052601260045260246000fd5b500490565b600181811c9082168061207c57607f821691505b60208210810361209c57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156107f3576000816000526020600020601f850160051c810160208610156120cb5750805b601f850160051c820191505b818110156120ea578281556001016120d7565b505050505050565b815167ffffffffffffffff81111561210c5761210c611dcb565b6121208161211a8454612068565b846120a2565b602080601f831160018114612155576000841561213d5750858301515b600019600386901b1c1916600185901b1785556120ea565b600085815260208120601f198616915b8281101561218457888601518255948401946001909101908401612165565b50858210156121a25787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600082516121c4818460208701611ee8565b919091019291505056fe02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800cd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300a26469706673582212209ee080102fcebf69185eb1ae348df3af9175c70b808a36cdd170dd562342928b64736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "AccessControlBadConfirmation";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "neededRole";
            readonly type: "bytes32";
        }];
        readonly name: "AccessControlUnauthorizedAccount";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "target";
            readonly type: "address";
        }];
        readonly name: "AddressEmptyCode";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "AddressInsufficientBalance";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "EnforcedPause";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ExceedCapacity";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ExpectedPause";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "FailedInnerCall";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidInitialization";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "MinDeposit";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NotInitializing";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OnlyWETHAllowed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ReentrancyGuardReentrantCall";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }];
        readonly name: "SafeERC20FailedOperation";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "required";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "actual";
            readonly type: "uint256";
        }];
        readonly name: "SlippageExceededOnDeposit";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "required";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "actual";
            readonly type: "uint256";
        }];
        readonly name: "SlippageExceededOnWithdrawal";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "StakingPaused";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "target";
            readonly type: "string";
        }];
        readonly name: "ZeroAddress";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "target";
            readonly type: "string";
        }];
        readonly name: "ZeroAmount";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "string";
            readonly name: "which";
            readonly type: "string";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "newAddress";
            readonly type: "address";
        }];
        readonly name: "AddressUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "tokenAmount";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "liquidTkn";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "liquidTknAmount";
            readonly type: "uint256";
        }];
        readonly name: "DepositedOnProtocol";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint64";
            readonly name: "version";
            readonly type: "uint64";
        }];
        readonly name: "Initialized";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "Paused";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "previousAdminRole";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "newAdminRole";
            readonly type: "bytes32";
        }];
        readonly name: "RoleAdminChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "RoleGranted";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "RoleRevoked";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "newSlippage";
            readonly type: "uint256";
        }];
        readonly name: "SlippageUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "Unpaused";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "caller_";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "receiver_";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "liquidTokenAddress_";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "amountSpent";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "asset_";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "assetsAmount_";
            readonly type: "uint256";
        }];
        readonly name: "WithdrawFromProtocol";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "DEFAULT_ADMIN_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "REVERT_MSG";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "VAULT_STRATEGY_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "claimEarnings";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "sender_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "receiver_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "token_";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenAmount_";
            readonly type: "uint256";
        }, {
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly name: "deposit";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "liquidTkn";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "liquidTknAmount";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getProtocol";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }];
        readonly name: "getRoleAdmin";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getSlippage";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "getTokenPrice";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "grantRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "hasRole";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "protocolAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "rocketSettingsAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "wethAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "rETHAddress_";
            readonly type: "address";
        }];
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "pause";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "paused";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "protocolAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "protocolName";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "rETHAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "callerConfirmation";
            readonly type: "address";
        }];
        readonly name: "renounceRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "revokeRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "rocketSettingsAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "rETHAddress_";
            readonly type: "address";
        }];
        readonly name: "setRETHAddress";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "slippage_";
            readonly type: "uint256";
        }];
        readonly name: "setSlippage";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "wethAddress_";
            readonly type: "address";
        }];
        readonly name: "setWETHAddress";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "protocolAddress_";
            readonly type: "address";
        }];
        readonly name: "setprotocolAddress";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "slippage";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "interfaceId";
            readonly type: "bytes4";
        }];
        readonly name: "supportsInterface";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "unpause";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "wethAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "caller_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "receiver_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "asset_";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "assetsAmount_";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "liquidTokenAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountInMaximum_";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly name: "withdraw";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly stateMutability: "payable";
        readonly type: "receive";
    }];
    static createInterface(): RocketAdapterInterface;
    static connect(address: string, runner?: ContractRunner | null): RocketAdapter;
}
export {};
//# sourceMappingURL=RocketAdapter__factory.d.ts.map