import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { StrWithdrawStandard, StrWithdrawStandardInterface } from "../../../contracts/withdrawStrategies/StrWithdrawStandard";
type StrWithdrawStandardConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class StrWithdrawStandard__factory extends ContractFactory {
    constructor(...args: StrWithdrawStandardConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<StrWithdrawStandard & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): StrWithdrawStandard__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50611d4a806100206000396000f3fe6080604052600436106101f25760003560e01c80635e5a24a41161010d578063a4d1e2ca116100a0578063d547741f1161006f578063d547741f1461060b578063e173ad251461062b578063ea9853d014610640578063eb0a7fd014610660578063edd4604c1461068057600080fd5b8063a4d1e2ca14610575578063b396711314610595578063b89f319d146105cb578063ba7a3ad5146105eb57600080fd5b806385535cc5116100dc57806385535cc51461050057806391d1485414610520578063a016b2cd14610540578063a217fddf1461056057600080fd5b80635e5a24a4146104545780637e531a39146104885780637f4879aa146104d55780638456cb59146104eb57600080fd5b806336568abe11610185578063430bf08a11610154578063430bf08a146103b05780634a28ff24146103d05780635c7868921461040f5780635c975abb1461042f57600080fd5b806336568abe1461033b57806339e3aca11461035b5780633f4ba83a1461037b578063429e6e0f1461039057600080fd5b8063248a9ca3116101c1578063248a9ca3146102bb578063254c72a2146102db5780632f2ff15d146102fb57806333dc7f071461031b57600080fd5b806301ffc9a7146101fe5780630690416a146102335780630a69ba4d146102555780631f696df81461028357600080fd5b366101f957005b600080fd5b34801561020a57600080fd5b5061021e61021936600461169d565b6106a7565b60405190151581526020015b60405180910390f35b34801561023f57600080fd5b5061025361024e3660046116ea565b6106de565b005b34801561026157600080fd5b50610275610270366004611705565b610775565b60405190815260200161022a565b34801561028f57600080fd5b506102a361029e366004611742565b610985565b6040516001600160a01b03909116815260200161022a565b3480156102c757600080fd5b506102756102d6366004611742565b6109af565b3480156102e757600080fd5b506102536102f63660046116ea565b6109d1565b34801561030757600080fd5b5061025361031636600461175b565b610a72565b34801561032757600080fd5b506002546102a3906001600160a01b031681565b34801561034757600080fd5b5061025361035636600461175b565b610a94565b34801561036757600080fd5b506009546102a3906001600160a01b031681565b34801561038757600080fd5b50610253610acc565b34801561039c57600080fd5b506003546102a3906001600160a01b031681565b3480156103bc57600080fd5b506004546102a3906001600160a01b031681565b3480156103dc57600080fd5b506103f06103eb366004611787565b610ae2565b604080516001600160a01b03909316835260208301919091520161022a565b34801561041b57600080fd5b5061025361042a36600461187e565b610b51565b34801561043b57600080fd5b50600080516020611cf58339815191525460ff1661021e565b34801561046057600080fd5b506102757fd1473398bb66596de5d1ea1fc8e303ff2ac23265adc9144b1b52065dc4f0934b81565b34801561049457600080fd5b506104c860405180604001604052806014815260200173119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b81525081565b60405161022a91906118b3565b3480156104e157600080fd5b5061027560055481565b3480156104f757600080fd5b50610253610b6b565b34801561050c57600080fd5b5061025361051b3660046116ea565b610b7e565b34801561052c57600080fd5b5061021e61053b36600461175b565b610c0f565b34801561054c57600080fd5b5061025361055b36600461194b565b610c47565b34801561056c57600080fd5b50610275600081565b34801561058157600080fd5b506102a3610590366004611742565b610cfc565b3480156105a157600080fd5b506102a36105b03660046116ea565b6008602052600090815260409020546001600160a01b031681565b3480156105d757600080fd5b506001546102a3906001600160a01b031681565b3480156105f757600080fd5b5061025361060636600461198d565b610d0c565b34801561061757600080fd5b5061025361062636600461175b565b610f81565b34801561063757600080fd5b506104c8610f9d565b34801561064c57600080fd5b5061025361065b3660046116ea565b61102b565b34801561066c57600080fd5b5061025361067b366004611a29565b6110cc565b34801561068c57600080fd5b50610695600181565b60405160ff909116815260200161022a565b60006001600160e01b03198216637965db0b60e01b14806106d857506301ffc9a760e01b6001600160e01b03198316145b92915050565b60006106e9816111ca565b61071e82604051806040016040528060138152602001726c6971756964546f6b656e416464726573735f60681b8152506111d4565b6040516001600160a01b038316907f4245d51ab06b77fea049f6e1eab0e31b343fc4c1e9fe7774373362c37eb2034490600090a250600180546001600160a01b0319166001600160a01b0392909216919091179055565b6001546000906001600160a01b03848116911614806107a157506002546001600160a01b038481169116145b6107f25760405162461bcd60e51b815260206004820152601760248201527f496e76616c696420746f6b656e2072657175657374656400000000000000000060448201526064015b60405180910390fd5b8160ff166001148061080757508160ff166002145b6108535760405162461bcd60e51b815260206004820152601b60248201527f496e76616c696420736f7572636520746f20676574207072696365000000000060448201526064016107e9565b6001600160a01b038084166000908152600860205260408120549091169081156108e9576000826001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a060405180830381865afa1580156108b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108db9190611a6d565b5091945061097d9350505050565b60008460ff16600214610903576108fe6111fd565b61090b565b61090b61123b565b604051630681320d60e51b81526001600160a01b0388811660048301529192509082169063d02641a090602401602060405180830381865afa158015610955573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109799190611abd565b9150505b949350505050565b6006818154811061099557600080fd5b6000918252602090912001546001600160a01b0316905081565b6000908152600080516020611cd5833981519152602052604090206001015490565b60006109dc816111ca565b610a1b826040518060400160405280601a81526020017f777261707065644c6971756964546f6b656e416464726573735f0000000000008152506111d4565b6040516001600160a01b038316907fce01361fe7ff662213b751c96882886f856789c4049c51e47af22049de7976b890600090a250600280546001600160a01b0319166001600160a01b0392909216919091179055565b610a7b826109af565b610a84816111ca565b610a8e8383611251565b50505050565b6001600160a01b0381163314610abd5760405163334bd91960e11b815260040160405180910390fd5b610ac782826112f6565b505050565b6000610ad7816111ca565b610adf611372565b50565b6000807fd1473398bb66596de5d1ea1fc8e303ff2ac23265adc9144b1b52065dc4f0934b610b0f816111ca565b6040805180820182526014815273119d5b98dd1a5bdb881b9bdd08185b1b1bddd95960621b6020820152905162461bcd60e51b81526107e991906004016118b3565b6000610b5c816111ca565b610b678260016113d2565b5050565b6000610b76816111ca565b610adf611511565b6000610b89816111ca565b610bb8826040518060400160405280600d81526020016c7661756c74416464726573735f60981b8152506111d4565b6040516001600160a01b038316907f5c06d966572db101b61cacf1a095f31609e34873f11016fc5cb333651e969f6790600090a250600480546001600160a01b0319166001600160a01b0392909216919091179055565b6000918252600080516020611cd5833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6000610c52816111ca565b610cb683838080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505060408051808201909152600d81526c73747261746567794e616d655f60981b6020820152915061155a9050565b7f21ce9ce25f0f85766c680deb376fbea42cd6d6911f217c0d89f14c439b84fcfd8383604051610ce7929190611ad6565b60405180910390a16000610a8e838583611b8f565b6007818154811061099557600080fd5b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff16600081158015610d525750825b905060008267ffffffffffffffff166001148015610d6f5750303b155b905081158015610d7d575080155b15610d9b5760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610dc557845460ff60401b1916600160401b1785555b610df48b6040518060400160405280600d81526020016c7661756c74416464726573735f60981b8152506111d4565b610e298a604051806040016040528060138152602001726c6971756964546f6b656e416464726573735f60681b8152506111d4565b610e6088604051806040016040528060158152602001747661756c745374726174656779416464726573735f60581b8152506111d4565b610ec487878080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505060408051808201909152600d81526c73747261746567794e616d655f60981b6020820152915061155a9050565b610ecf8960016113d2565b610ed761157e565b610ee2600033611251565b50600480546001600160a01b03808e166001600160a01b031992831617909255600180548d841690831617905560098054928b16929091169190911790556000610f2d878983611b8f565b508315610f7457845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b5050505050505050505050565b610f8a826109af565b610f93816111ca565b610a8e83836112f6565b60008054610faa90611b05565b80601f0160208091040260200160405190810160405280929190818152602001828054610fd690611b05565b80156110235780601f10610ff857610100808354040283529160200191611023565b820191906000526020600020905b81548152906001019060200180831161100657829003601f168201915b505050505081565b6000611036816111ca565b611075826040518060400160405280601881526020017f77697468647261775374726174656779416464726573735f00000000000000008152506111d4565b6040516001600160a01b038316907f28548fb82baba9340b788ecc4911d241c9508404c350e6964e447fbf8d62c12890600090a250600380546001600160a01b0319166001600160a01b0392909216919091179055565b60006110d7816111ca565b6001546001600160a01b038481169116148061110057506002546001600160a01b038481169116145b801561111457506001600160a01b03831615155b6111585760405162461bcd60e51b8152602060048201526015602482015274125b9d985b1a59081d1bdad95b88195b9d195c9959605a1b60448201526064016107e9565b604080516001600160a01b038086168252841660208201527fd2d8394cf7549a5ddbc2ba3dd7b2de8d53c891472d1f2907008ed6a10045fdae910160405180910390a1506001600160a01b03918216600090815260086020526040902080546001600160a01b03191691909216179055565b610adf8133611588565b6001600160a01b038216610b67578060405163eac0d38960e01b81526004016107e991906118b3565b600680546000919061121190600190611c50565b8154811061122157611221611c71565b6000918252602090912001546001600160a01b0316919050565b6000600760008154811061122157611221611c71565b6000600080516020611cd583398151915261126c8484610c0f565b6112ec576000848152602082815260408083206001600160a01b03871684529091529020805460ff191660011790556112a23390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a460019150506106d8565b60009150506106d8565b6000600080516020611cd58339815191526113118484610c0f565b156112ec576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a460019150506106d8565b61137a6115c1565b600080516020611cf5833981519152805460ff191681557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a150565b815160ff821681146114125760405163cb97bcb160e01b8152602060048201526008602482015267776974686472617760c01b60448201526064016107e9565b61141e6007600061166b565b7fdb2c7c26f26f22897028e2e018c1967eef4170d6a2c476a373823d8639da73ec8360405161144d9190611c87565b60405180910390a160005b81811015610a8e576114b884828151811061147557611475611c71565b60200260200101516040518060400160405280601781526020017f61646170746572735769746864726177506174685f5b5d0000000000000000008152506111d4565b60078482815181106114cc576114cc611c71565b60209081029190910181015182546001808201855560009485529290932090920180546001600160a01b0319166001600160a01b039093169290921790915501611458565b6115196115f1565b600080516020611cf5833981519152805460ff191660011781557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258336113b4565b6000825111610b6757806040516318a996bb60e21b81526004016107e991906118b3565b611586611622565b565b6115928282610c0f565b610b675760405163e2517d3f60e01b81526001600160a01b0382166004820152602481018390526044016107e9565b600080516020611cf58339815191525460ff1661158657604051638dfc202b60e01b815260040160405180910390fd5b600080516020611cf58339815191525460ff16156115865760405163d93c066560e01b815260040160405180910390fd5b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff1661158657604051631afcd79f60e31b815260040160405180910390fd5b5080546000825590600052602060002090810190610adf91905b808211156116995760008155600101611685565b5090565b6000602082840312156116af57600080fd5b81356001600160e01b0319811681146116c757600080fd5b9392505050565b80356001600160a01b03811681146116e557600080fd5b919050565b6000602082840312156116fc57600080fd5b6116c7826116ce565b6000806040838503121561171857600080fd5b611721836116ce565b9150602083013560ff8116811461173757600080fd5b809150509250929050565b60006020828403121561175457600080fd5b5035919050565b6000806040838503121561176e57600080fd5b8235915061177e602084016116ce565b90509250929050565b60008060006060848603121561179c57600080fd5b6117a5846116ce565b92506117b3602085016116ce565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126117ea57600080fd5b8135602067ffffffffffffffff80831115611807576118076117c3565b8260051b604051601f19603f8301168101818110848211171561182c5761182c6117c3565b604052938452602081870181019490810192508785111561184c57600080fd5b6020870191505b8482101561187357611864826116ce565b83529183019190830190611853565b979650505050505050565b60006020828403121561189057600080fd5b813567ffffffffffffffff8111156118a757600080fd5b61097d848285016117d9565b60006020808352835180602085015260005b818110156118e1578581018301518582016040015282016118c5565b506000604082860101526040601f19601f8301168501019250505092915050565b60008083601f84011261191457600080fd5b50813567ffffffffffffffff81111561192c57600080fd5b60208301915083602082850101111561194457600080fd5b9250929050565b6000806020838503121561195e57600080fd5b823567ffffffffffffffff81111561197557600080fd5b61198185828601611902565b90969095509350505050565b60008060008060008060a087890312156119a657600080fd5b6119af876116ce565b95506119bd602088016116ce565b9450604087013567ffffffffffffffff808211156119da57600080fd5b6119e68a838b016117d9565b95506119f460608a016116ce565b94506080890135915080821115611a0a57600080fd5b50611a1789828a01611902565b979a9699509497509295939492505050565b60008060408385031215611a3c57600080fd5b611a45836116ce565b915061177e602084016116ce565b805169ffffffffffffffffffff811681146116e557600080fd5b600080600080600060a08688031215611a8557600080fd5b611a8e86611a53565b9450602086015193506040860151925060608601519150611ab160808701611a53565b90509295509295909350565b600060208284031215611acf57600080fd5b5051919050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b600181811c90821680611b1957607f821691505b602082108103611b3957634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115610ac7576000816000526020600020601f850160051c81016020861015611b685750805b601f850160051c820191505b81811015611b8757828155600101611b74565b505050505050565b67ffffffffffffffff831115611ba757611ba76117c3565b611bbb83611bb58354611b05565b83611b3f565b6000601f841160018114611bef5760008515611bd75750838201355b600019600387901b1c1916600186901b178355611c49565b600083815260209020601f19861690835b82811015611c205786850135825560209485019460019092019101611c00565b5086821015611c3d5760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b818103818111156106d857634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b6020808252825182820181905260009190848201906040850190845b81811015611cc85783516001600160a01b031683529284019291840191600101611ca3565b5090969550505050505056fe02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800cd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300a2646970667358221220925fe62b30b2f6ea1360120eb7215e4deeb0f08410a773b8cf19debccbc6ce9e64736f6c63430008180033";
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
            readonly internalType: "string";
            readonly name: "target";
            readonly type: "string";
        }];
        readonly name: "EmptyString";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "EnforcedPause";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ExecuteWithdrawWStrategyError";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ExpectedPause";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "target";
            readonly type: "string";
        }];
        readonly name: "InvalidAdaptersPath";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidInitialization";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NotInitializing";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ReentrancyGuardReentrantCall";
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
            readonly indexed: false;
            readonly internalType: "address[]";
            readonly name: "newDeployPath";
            readonly type: "address[]";
        }];
        readonly name: "AdaptersDeployPathSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address[]";
            readonly name: "newWithdrawPath";
            readonly type: "address[]";
        }];
        readonly name: "AdaptersWithdrawPathSet";
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
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "LiquidTokenSet";
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
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "priceFeed";
            readonly type: "address";
        }];
        readonly name: "PriceFeedSet";
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
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }];
        readonly name: "StrategyNameSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "TokenWrapperSet";
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
            readonly name: "vaultAddress";
            readonly type: "address";
        }];
        readonly name: "VaultAddressSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "strategyAddress";
            readonly type: "address";
        }];
        readonly name: "WithdrawStrategyAddressSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "receiver";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "asset";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "assetsAmount";
            readonly type: "uint256";
        }];
        readonly name: "WithdrawStrategyExecuted";
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
        readonly name: "VAULT_MANAGER_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "WITHDRAW_ADAPTERS_QTY";
        readonly outputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "";
            readonly type: "uint8";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "adaptersDeployPath";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "adaptersWithdrawPath";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "deployedAssetsValue";
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
        }, {
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "executeWithdrawStrategy";
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
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "token_";
            readonly type: "address";
        }, {
            readonly internalType: "uint8";
            readonly name: "source_";
            readonly type: "uint8";
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
            readonly name: "vaultAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "liquidTokenAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "address[]";
            readonly name: "adaptersWithdrawPath_";
            readonly type: "address[]";
        }, {
            readonly internalType: "address";
            readonly name: "vaultStrategyAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "string";
            readonly name: "strategyName_";
            readonly type: "string";
        }];
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "liquidTokenAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
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
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }];
        readonly name: "priceFeedPerToken";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "priceFeed";
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
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "adaptersWithdrawPath_";
            readonly type: "address[]";
        }];
        readonly name: "setAdaptersWithdrawPath";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "liquidTokenAddress_";
            readonly type: "address";
        }];
        readonly name: "setLiquidTokenAddress";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "token_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "feed_";
            readonly type: "address";
        }];
        readonly name: "setPriceFeedPerToken";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "strategyName_";
            readonly type: "string";
        }];
        readonly name: "setStrategyName";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "vaultAddress_";
            readonly type: "address";
        }];
        readonly name: "setVaultAddress";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "withdrawStrategyAddress_";
            readonly type: "address";
        }];
        readonly name: "setWithdrawStrategyAddress";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "wrappedLiquidTokenAddress_";
            readonly type: "address";
        }];
        readonly name: "setWrappedLiquidTokenAddress";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "strategyName";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
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
        readonly name: "vaultAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "vaultStrategyAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "withdrawStrategyAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "wrappedLiquidTokenAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly stateMutability: "payable";
        readonly type: "receive";
    }];
    static createInterface(): StrWithdrawStandardInterface;
    static connect(address: string, runner?: ContractRunner | null): StrWithdrawStandard;
}
export {};
//# sourceMappingURL=StrWithdrawStandard__factory.d.ts.map