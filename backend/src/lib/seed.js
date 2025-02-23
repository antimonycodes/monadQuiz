import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/Question.js";
// import Question from "./models/Question.js";

dotenv.config();

const questions = [
  {
    question: "What is Monad blockchain primarily designed for?",
    options: [
      "To create a Bitcoin alternative",
      "To enhance Ethereum's gas fees",
      "To achieve high-speed transactions while maintaining decentralization",
      "To provide a centralized payment system",
    ],
    answer:
      "To achieve high-speed transactions while maintaining decentralization",
  },
  {
    question: "Which consensus mechanism does Monad use?",
    options: [
      "Proof of Work",
      "HotStuff-based BFT",
      "Delegated Proof of Stake",
      "Nakamoto Consensus",
    ],
    answer: "HotStuff-based BFT",
  },
  {
    question: "What is the key advantage of Monad's parallel execution?",
    options: [
      "It enables transactions to be processed faster",
      "It reduces smart contract vulnerabilities",
      "It eliminates the need for validators",
      "It removes the need for blockchain confirmations",
    ],
    answer: "It enables transactions to be processed faster",
  },
  {
    question: "Which programming languages were used to develop Monad?",
    options: [
      "Rust and C++",
      "Java and Python",
      "Go and Solidity",
      "Swift and TypeScript",
    ],
    answer: "Rust and C++",
  },
  {
    question:
      "How does Monad ensure Ethereum Virtual Machine (EVM) compatibility?",
    options: [
      "By implementing a custom Solidity compiler",
      "By using a sidechain connected to Ethereum",
      "By mirroring Ethereum's execution model",
      "By creating a fork of Ethereum",
    ],
    answer: "By mirroring Ethereum's execution model",
  },
  {
    question: "Which feature of Monad helps in reducing network congestion?",
    options: [
      "Larger block sizes",
      "Sharding",
      "Optimized execution and concurrency",
      "Lower validator count",
    ],
    answer: "Optimized execution and concurrency",
  },
  {
    question: "What type of storage method does MonadDB use?",
    options: [
      "A centralized cloud database",
      "A blockchain-based NoSQL database",
      "A custom storage engine optimized for SSDs",
      "Traditional relational databases",
    ],
    answer: "A custom storage engine optimized for SSDs",
  },
  {
    question:
      "What allows developers to migrate dApps from Ethereum to Monad easily?",
    options: [
      "A Monad-Ethereum bridge",
      "Full EVM compatibility",
      "Automated Solidity conversion tools",
      "Special Monad-only smart contracts",
    ],
    answer: "Full EVM compatibility",
  },
  {
    question: "Which NFT marketplace has expanded support for Monad?",
    options: ["OpenSea", "Magic Eden", "Rarible", "Foundation"],
    answer: "Magic Eden",
  },
  {
    question: "How does Monad improve DeFi applications?",
    options: [
      "By eliminating the need for smart contracts",
      "By offering higher speeds and lower transaction costs",
      "By requiring KYC verification for all users",
      "By restricting DeFi projects to specific countries",
    ],
    answer: "By offering higher speeds and lower transaction costs",
  },
  {
    question: "Which venture firms invested in Monad’s Series A funding?",
    options: [
      "Binance Labs, Sequoia Capital, and ConsenSys",
      "OKX Ventures, Paradigm, and Coinbase Ventures",
      "Google Ventures, SoftBank, and a16z",
      "Chainlink Labs, Polygon Studios, and Y Combinator",
    ],
    answer: "OKX Ventures, Paradigm, and Coinbase Ventures",
  },
  {
    question:
      "What mechanism ensures that Monad’s parallel execution produces correct results?",
    options: [
      "A concurrency control mechanism",
      "Manual transaction verification",
      "Randomized smart contract execution",
      "Gas fee prioritization",
    ],
    answer: "A concurrency control mechanism",
  },
  {
    question: "What is the purpose of deferred execution in Monad?",
    options: [
      "To separate transaction execution from block production",
      "To delay transactions for better batching",
      "To prevent miners from front-running trades",
      "To allow validators to select which transactions to process",
    ],
    answer: "To separate transaction execution from block production",
  },
  {
    question: "Which project is leveraging Monad for DeFi lending and staking?",
    options: ["Aave", "Uniswap", "Demask Finance", "Compound"],
    answer: "Demask Finance",
  },
  {
    question: "What is Monad’s approach to improving blockchain scalability?",
    options: [
      "Using sidechains for faster transactions",
      "Implementing parallel execution and efficient consensus",
      "Increasing the number of validators",
      "Lowering gas fees to near zero",
    ],
    answer: "Implementing parallel execution and efficient consensus",
  },
  {
    question: "Why is Monad’s EVM compatibility beneficial for developers?",
    options: [
      "They can migrate existing Ethereum dApps with minimal changes",
      "They must rewrite their smart contracts in a new language",
      "They can only use Monad’s native programming language",
      "They need to stake MONAD tokens to deploy contracts",
    ],
    answer: "They can migrate existing Ethereum dApps with minimal changes",
  },
  {
    question:
      "How does Monad reduce security risks while improving performance?",
    options: [
      "By reducing the number of validators",
      "By relying on centralized processing",
      "Through consensus optimization and parallel execution",
      "By restricting transaction speeds",
    ],
    answer: "Through consensus optimization and parallel execution",
  },
  {
    question:
      "Which type of applications benefit most from Monad’s architecture?",
    options: [
      "Traditional banking applications",
      "Decentralized applications requiring high transaction throughput",
      "Cloud storage platforms",
      "Social media platforms only",
    ],
    answer: "Decentralized applications requiring high transaction throughput",
  },
  {
    question: "How does Monad handle transaction ordering efficiently?",
    options: [
      "By allowing miners to choose any transaction order",
      "By batching transactions in a single queue",
      "Through parallel execution and ordering mechanisms",
      "By giving priority to higher gas fees",
    ],
    answer: "Through parallel execution and ordering mechanisms",
  },
  {
    question: "What is the primary focus of Monad blockchain?",
    options: [
      "Creating a new stablecoin",
      "Enhancing the efficiency of smart contract execution",
      "Replacing Ethereum as the dominant smart contract platform",
      "Operating as a privacy-focused network",
    ],
    answer: "Enhancing the efficiency of smart contract execution",
  },
];

console.log("MongoDB URI:", process.env.MONGODB_URL); // Debugging line

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Question.deleteMany({});
    await Question.insertMany(questions);

    console.log("Database seeded!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDB();
