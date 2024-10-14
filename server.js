import express from "express";
import mongoose from "mongoose";
import { createHash } from "crypto";
import PinataSDK from "@pinata/sdk";
import cors from "cors";
import Web3 from "web3"; // Import Web3.js

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://shrawan2401:shrawan7650@cluster0.vhy52pl.mongodb.net/hacktone?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schemas
const mainSchema = new mongoose.Schema({}, { timestamps: true });
const detailsSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Main",
      required: true,
    },
    oxygenRate: { type: Number, required: true },
    bloodPressure: { type: Number, required: true },
    heartbeatRate: { type: Number, required: true },
  },
  { timestamps: true }
);

const hashedDataSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Main",
      required: true,
    },
    hashedData: { type: String, required: true },
  },
  { timestamps: true }
);

// Models
const Main = mongoose.model("Main", mainSchema);
const Details = mongoose.model("Details", detailsSchema);
const HashedData = mongoose.model("HashedData", hashedDataSchema);

// Initialize Pinata SDK
const pinata = new PinataSDK(
  "77ea31f55a481eb9f8a0",
  "0f1340612386a9cd02da448e91768797a908de3f2b5a4ecdbf76cbbb0553f559"
);

// Initialize Web3
const web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/a2bad02fd1ad41518900629a65c8c704")); // Replace with your Ethereum node URL
const contractAddress = "0xB93ECB1E90C1801C6f59d15a367e5f80Fb23eeaF"; // Replace with your deployed contract address
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dataHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_systolicBP",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_diastolicBP",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_heartRate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_oxygenSaturation",
				"type": "uint256"
			}
		],
		"name": "addHealthRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "authorizeUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "authorizedUsers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userID",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getRecord",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userID",
				"type": "string"
			}
		],
		"name": "getUserRecordCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userHealthRecords",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "userID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dataHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "systolicBP",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "diastolicBP",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "heartRate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "oxygenSaturation",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isHighBP",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isHighHR",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isLowOxygen",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const patientDataStorageContract = new web3.eth.Contract(contractABI, contractAddress);

// Function to hash data
const hashData = (patientId, oxygenRate, bloodPressure, heartbeatRate) => {
//   console.log(`Patient ID: ${patientId}`);
//   console.log(`Oxygen Rate: ${oxygenRate}`);
//   console.log(`Blood Pressure: ${bloodPressure}`);
//   console.log(`Heartbeat Rate: ${heartbeatRate}`);
  const dataString = `${patientId}-${oxygenRate}-${bloodPressure}-${heartbeatRate}`;
  return createHash("sha256").update(dataString).digest("hex");
};

// Function to save patient data
const savePatientData = async (oxygenRate, bloodPressure, heartbeatRate) => {
  try {
    const mainRecord = new Main({});
    await mainRecord.save();
    const patientId = mainRecord._id;

    const details = new Details({
      patientId,
      oxygenRate,
      bloodPressure,
      heartbeatRate,
    });
    await details.save();
    console.log("Details saved:", details);

    const hashedData = hashData(patientId, oxygenRate, bloodPressure, heartbeatRate);
    const hashedRecord = new HashedData({ patientId, hashedData });
    await hashedRecord.save();

    // Upload hashed data to IPFS via Pinata
    const pinataResult = await pinata.pinJSONToIPFS({ details });
1
    // Add record to smart contract
    const accounts = await web3.eth.getAccounts(); // Get the account to send the transaction
    await patientDataStorageContract.methods.addRecord(patientId.toString(), pinataResult.IpfsHash).send({ from: accounts[0] });

    return { success: true, ipfsCID: pinataResult.IpfsHash, patientId };
  } catch (error) {
    console.error("Error saving patient data:", error);
    return { success: false, error: error.message };
  }
};

// API route for patient data submission
app.post("/api/patient-data", async (req, res) => {
  const { oxygenRate, bloodPressure, heartbeatRate } = req.body;
  console.log(req.body);

  if (!oxygenRate || !bloodPressure || !heartbeatRate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const result = await savePatientData(oxygenRate, bloodPressure, heartbeatRate);
  console.log("Result:", result);
  if (result.success) {
    return res.json({
      message: "Data saved successfully",
      ipfsCID: result.ipfsCID,
      patientId: result.patientId,
    });
  } else {
    return res.status(500).json({ message: "Error saving data", error: result.error });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
