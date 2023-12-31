const ethers = require("ethers");
const solc = require("solc");
const dotenv = require("dotenv");

dotenv.config();

export default async function handler(req, res) {
  try {
    const { source, network, contractName, chainId } = req.body;

    let provider = null;

    if (network === "goerli") {
      provider = new ethers.JsonRpcProvider(
        `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
      );
    } else if (network === "mumbai") {
      provider = new ethers.JsonRpcProvider(
        `https://rpc-mumbai.maticvigil.com`
      );
    } else if (network === "zksync") {
      provider = new ethers.JsonRpcProvider("https://rinkeby.zksync.io/");
    } else if (network === "base-goerli") {
      provider = new ethers.JsonRpcProvider(
        `https://rpc.notadegen.com/base/goerli`
      );
    } else if (network === "scroll") {
      provider = new ethers.JsonRpcProvider("https://alpha-rpc.scroll.io/l2");
    } else if (network === "apothem") {
      provider = new ethers.JsonRpcProvider("https://erpc.apothem.network");
    } else if (network === "XDC") {
      provider = new ethers.JsonRpcProvider("https://rpc.xdcrpc.com");
    }

    const pk =
      network === "apothem"
        ? "af627ed2e5bb8aaed8ca4ceea05dfc24001e64072474d8f095aae749031fed15"
        : "af627ed2e5bb8aaed8ca4ceea05dfc24001e64072474d8f095aae749031fed15";

    const wallet = new ethers.Wallet(pk, provider);

    const fileName = `${contractName}.sol`;

    // Compile the Solidity file using solc
    const input = {
      language: "Solidity",
      sources: {
        [fileName]: {
          content: source,
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["abi", "evm.bytecode"],
          },
        },
      },
    };
    const output = JSON.parse(
      solc.compile(JSON.stringify(input), { version: "0.8.8" })
    );

    console.log(output);

    // Get the compiled contract's ABI and bytecode
    const abi = output.contracts[fileName][contractName].abi;
    const bytecode =
      output.contracts[fileName][contractName].evm.bytecode.object;

    // Create an instance of the ContractFactory
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);

    // Deploy the contract
    const contract = await factory.deploy({ chainId });
    await contract.waitForDeployment();

    const address = await contract.getAddress();

    console.log("Contract deployed to:", address);

    return res.status(200).json({
      address,
    });
  } catch (e) {
    console.log(e);
  }
  return res.status(200);
}
