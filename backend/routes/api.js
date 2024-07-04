// const express = require('express');
// const router = express.Router();
// const { ethers } = require('ethers');
// const Registration = require('../models/registration');
// const contractABI = [
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "_title",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "_description",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "_registrationStart",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "_registrationEnd",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "_electionStart",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "_electionEnd",
//         "type": "uint256"
//       }
//     ],
//     "name": "createElection",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "name": "elections",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "internalType": "string",
//         "name": "title",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "description",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "candidatesCount",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "registrationStart",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "registrationEnd",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "electionEnd",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "electionStart",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "winnerId",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "_id",
//         "type": "uint256"
//       }
//     ],
//     "name": "findElectionOwner",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "_id",
//         "type": "uint256"
//       }
//     ],
//     "name": "getCandidates",
//     "outputs": [
//       {
//         "components": [
//           {
//             "internalType": "uint256",
//             "name": "id",
//             "type": "uint256"
//           },
//           {
//             "internalType": "uint256",
//             "name": "age",
//             "type": "uint256"
//           },
//           {
//             "internalType": "string",
//             "name": "qualification",
//             "type": "string"
//           },
//           {
//             "internalType": "string",
//             "name": "name",
//             "type": "string"
//           },
//           {
//             "internalType": "uint256",
//             "name": "voteCount",
//             "type": "uint256"
//           },
//           {
//             "internalType": "string",
//             "name": "party",
//             "type": "string"
//           },
//           {
//             "internalType": "string",
//             "name": "manifesto",
//             "type": "string"
//           }
//         ],
//         "internalType": "struct Ballot.Candidate[]",
//         "name": "",
//         "type": "tuple[]"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "getElections",
//     "outputs": [
//       {
//         "components": [
//           {
//             "internalType": "uint256",
//             "name": "id",
//             "type": "uint256"
//           },
//           {
//             "internalType": "uint256",
//             "name": "winnerId",
//             "type": "uint256"
//           },
//           {
//             "internalType": "address",
//             "name": "owner",
//             "type": "address"
//           },
//           {
//             "internalType": "string",
//             "name": "title",
//             "type": "string"
//           },
//           {
//             "internalType": "string",
//             "name": "description",
//             "type": "string"
//           },
//           {
//             "internalType": "uint256",
//             "name": "candidatesCount",
//             "type": "uint256"
//           },
//           {
//             "internalType": "uint256",
//             "name": "registrationStart",
//             "type": "uint256"
//           },
//           {
//             "internalType": "uint256",
//             "name": "registrationEnd",
//             "type": "uint256"
//           },
//           {
//             "internalType": "uint256",
//             "name": "electionStart",
//             "type": "uint256"
//           },
//           {
//             "internalType": "uint256",
//             "name": "electionEnd",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct Ballot.ElectionData[]",
//         "name": "",
//         "type": "tuple[]"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "_id",
//         "type": "uint256"
//       }
//     ],
//     "name": "getVoters",
//     "outputs": [
//       {
//         "components": [
//           {
//             "internalType": "bool",
//             "name": "registered",
//             "type": "bool"
//           },
//           {
//             "internalType": "bool",
//             "name": "voted",
//             "type": "bool"
//           },
//           {
//             "internalType": "address",
//             "name": "voterAddress",
//             "type": "address"
//           }
//         ],
//         "internalType": "struct Ballot.Voter[]",
//         "name": "",
//         "type": "tuple[]"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "noOfElections",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "_id",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "_age",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "_qualification",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "_name",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "_party",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "_manifesto",
//         "type": "string"
//       }
//     ],
//     "name": "registerCandidateToElection",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "_id",
//         "type": "uint256"
//       }
//     ],
//     "name": "registerVoterToElection",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "_id",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "_candidateId",
//         "type": "uint256"
//       }
//     ],
//     "name": "voteToElection",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ]; // Import your contract ABI
// const contractAddress = '0x6cc5b39416b1F521f8EFd517C6Fc97b03af4336C'; // Replace with your contract address

// const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/eth_sepolia'); // Replace with your provider
// const contract = new ethers.Contract(contractAddress, contractABI, provider);

// // Middleware to verify the owner
// const verifyOwner = async (req, res, next) => {
//   const { electionID, signature } = req.body.electionID ? req.body : req.query;
//   try {
//     const ownerAddress = await contract.findElectionOwner(electionID);
//     const message = "Admin";
//     const signerAddress = ethers.utils.verifyMessage(message, signature);

//     if (signerAddress.toLowerCase() !== ownerAddress.toLowerCase()) {
//       return res.status(403).send('Access denied.');
//     }

//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error.');
//   }
// };

// // Route to submit registration data
// router.post('/register', async (req, res) => {
//   const { address, id } = req.body;
//   try {
//     const newRegistration = new Registration({ address, id });
//     await newRegistration.save();
//     res.status(201).send('Registration submitted for approval.');
//   } catch (error) {
//     res.status(500).send('Server error.');
//   }
// });

// // Route to check approval status
// router.get('/check-approval', async (req, res) => {
//   const { address, id } = req.query;
//   try {
//     const registration = await Registration.findOne({ address, id });
//     if (registration) {
//       res.json({ approved: registration.approved });
//     } else {
//       res.status(404).send('Registration not found.');
//     }
//   } catch (error) {
//     res.status(500).send('Server error.');
//   }
// });

// // Route to approve registration
// router.post('/approve', verifyOwner, async (req, res) => {
//   const { address, id } = req.body;
//   try {
//     const registration = await Registration.findOneAndUpdate(
//       { address, id },
//       { approved: true },
//       { new: true }
//     );
//     if (registration) {
//       res.send('Registration approved.');
//     } else {
//       res.status(404).send('Registration not found.');
//     }
//   } catch (error) {
//     res.status(500).send('Server error.');
//   }
// });

// // Route to get all unapproved registrations
// router.get('/unapproved', verifyOwner, async (req, res) => {
//   try {
//     const unapprovedRegistrations = await Registration.find({ approved: false });
//     res.json(unapprovedRegistrations);
//   } catch (error) {
//     res.status(500).send('Server error.');
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const { ethers ,verifyMessage} = require('ethers');
const Registration = require('../models/registration');
const CandidateRegistration = require('../models/candidateRegistration');

// Contract ABI
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_registrationStart",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_registrationEnd",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_electionStart",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_electionEnd",
        "type": "uint256"
      }
    ],
    "name": "createElection",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "elections",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "candidatesCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "registrationStart",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "registrationEnd",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "electionEnd",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "electionStart",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "winnerId",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "findElectionOwner",
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
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getCandidates",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "age",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "qualification",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "party",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "manifesto",
            "type": "string"
          }
        ],
        "internalType": "struct Ballot.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getElections",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "winnerId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "candidatesCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "registrationStart",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "registrationEnd",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "electionStart",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "electionEnd",
            "type": "uint256"
          }
        ],
        "internalType": "struct Ballot.ElectionData[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getVoters",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "registered",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "voted",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "voterAddress",
            "type": "address"
          }
        ],
        "internalType": "struct Ballot.Voter[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "noOfElections",
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_age",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_qualification",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_party",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_manifesto",
        "type": "string"
      }
    ],
    "name": "registerCandidateToElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "registerVoterToElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_candidateId",
        "type": "uint256"
      }
    ],
    "name": "voteToElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]; // Import your contract ABI

const contractAddress = '0x6cc5b39416b1F521f8EFd517C6Fc97b03af4336C'; // Replace with your contract address
const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/eth_sepolia'); // Replace with your provider
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Middleware to verify the owner
const verifyOwner = async (req, res, next) => {
  const { electionID, signature } = req.body.electionID ? req.body : req.query;
  try {
    const ownerAddress = await contract.findElectionOwner(electionID);
    const message = "Admin";
    const signerAddress = verifyMessage(message, signature);

    if (signerAddress.toLowerCase() !== ownerAddress.toLowerCase()) {
      return res.status(403).send('Access denied.');
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
};


router.post('/register', async (req, res) => {
  const { address, id, electionID, signature } = req.body;
  try {
    const message = "user";
    const signerAddress = verifyMessage(message, signature);

    if (signerAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(403).send('Invalid signature.');
    }

    const existingRegistration = await Registration.findOne({ id, electionID, approved: true });

    if (existingRegistration) {
      return res.status(400).send('This ID is already approved for this election.');
    }

    const newRegistration = new Registration({ address, id, electionID });
    await newRegistration.save();
    res.status(201).send('Registration submitted for approval.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
});



// Route to check approval status
router.get('/check-approval', async (req, res) => {
  const { address, id, electionID } = req.query;
  try {
    const registration = await Registration.findOne({ address, id, electionID });
    if (registration) {
      res.json({ approved: registration.approved });
    } else {
      res.status(404).send('Registration not found.');
    }
  } catch (error) {
    res.status(500).send('Server error.');
  }
});


// Route to approve registration
// Route to approve registration
router.post('/approve', verifyOwner, async (req, res) => {
  const { address, id, electionID } = req.body;
  try {
    const registration = await Registration.findOneAndUpdate(
      { address, id, electionID },
      { approved: true },
      { new: true }
    );

    if (registration) {
      // Delete all other registrations with the same id and electionID
      await Registration.deleteMany({ id, electionID, approved: false });

      res.send('Registration approved and related unapproved registrations deleted.');
    } else {
      res.status(404).send('Registration not found.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
});



// Route to get all unapproved registrations for a specific election
router.get('/unapproved', verifyOwner, async (req, res) => {
  const { electionID } = req.query;
  try {
    const unapprovedRegistrations = await Registration.find({ approved: false, electionID });
    res.json(unapprovedRegistrations);
  } catch (error) {
    res.status(500).send('Server error.');
  }
});


// Route to submit registration data
router.post('/register-candidate', async (req, res) => {
  const { address, id, electionID, signature } = req.body;
  try {
    const message = "candidate";
    const signerAddress = verifyMessage(message, signature);

    if (signerAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(403).send('Invalid signature.');
    }

    const existingRegistration = await CandidateRegistration.findOne({ id, electionID, approved: true });

    if (existingRegistration) {
      return res.status(400).send('This ID is already approved for this election.');
    }

    const newRegistration = new CandidateRegistration({ address, id, electionID });
    await newRegistration.save();
    res.status(201).send('Registration submitted for approval.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
});

// Route to check approval status
router.get('/check-candidate-approval', async (req, res) => {
  const { address, id, electionID } = req.query;
  try {
    const registration = await CandidateRegistration.findOne({ address, id, electionID });
    if (registration) {
      res.json({ approved: registration.approved });
    } else {
      res.status(404).send('Registration not found.');
    }
  } catch (error) {
    res.status(500).send('Server error.');
  }
});

// Route to approve registration
router.post('/approve-candidate', verifyOwner, async (req, res) => {
  const { address, id, electionID } = req.body;
  try {
    const registration = await CandidateRegistration.findOneAndUpdate(
      { address, id, electionID },
      { approved: true },
      { new: true }
    );

    if (registration) {
      // Delete all other registrations with the same id and electionID
      await CandidateRegistration.deleteMany({ id, electionID, approved: false });

      res.send('Registration approved and related unapproved registrations deleted.');
    } else {
      res.status(404).send('Registration not found.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
});

// Route to get all unapproved registrations for a specific election
router.get('/unapproved-candidates', verifyOwner, async (req, res) => {
  const { electionID } = req.query;
  try {
    const unapprovedRegistrations = await CandidateRegistration.find({ approved: false, electionID });
    res.json(unapprovedRegistrations);
  } catch (error) {
    res.status(500).send('Server error.');
  }
});

module.exports = router;

