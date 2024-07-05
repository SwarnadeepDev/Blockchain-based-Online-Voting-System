import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RegistrationForm({ updateElections, signer, elections, contract }) {
  let { PremId } = useParams();
  const [address, setAddress] = useState('');
  const [id, setId] = useState('');
  const [approved, setApproved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to submit data for approval
  const handleApproval = async () => {
    if (address && id) {
      try {
        const message = "user";
        const signature = await signer.signMessage(message);
        const response = await axios.post('https://blockchain-based-online-voting-system-1.onrender.com/api/register', { address, id, electionID: PremId ,signature});
        if (response.status === 201) {
          alert('Data submitted for approval.');
        } else {
          setErrorMessage('Failed to submit data for approval. Please try again.');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('An error occurred while submitting data for approval.');
      }
    } else {
      setErrorMessage('Please enter both Address and ID.');
    }
  };

  // Function to check approval status
  const checkApprovalStatus = async () => {
    try {
      const response = await axios.get(`https://blockchain-based-online-voting-system-1.onrender.com/api/check-approval`, {
        params: { address, id, electionID: PremId }
      });
      if (response.data.approved) {
        setApproved(true);
        setErrorMessage('');
      } else {
        setErrorMessage('User not approved yet.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while checking approval status.');
    }
  };

  // Function to handle registration after approval
  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      const election = elections.find(election => election.id === parseInt(PremId));
      if (!election) {
        setErrorMessage("Election not found");
        return;
      }

      const currentDate = new Date();
      const registrationStartDate = new Date(election.startDate * 1000);
      const registrationEndDate = new Date(election.endDate * 1000);

      if (!(currentDate >= registrationStartDate && currentDate < registrationEndDate)) {
        setErrorMessage("User can only be added during registration period");
        return;
      }
      const tx = await contract.registerVoterToElection(election.id);
      await tx.wait(); // Wait for transaction to be mined

      election.registeredUsers.push({ address: signer.address, voted: false, registered: true });
      updateElections(elections);

      alert('Registration successful on blockchain.');
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred during registration.');
    }
  };

  return (
    <div className="content">
      <div className="content1">
        <h2>Registration Form</h2>
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
        <div className="form-group">
          <label htmlFor="address">MetaMask Wallet Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter MetaMask Wallet Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">ID No:</label>
          <input
            type="text"
            id="id"
            name="id"
            placeholder="Enter ID No"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <button type="button" className="approval-btn" onClick={handleApproval}>Submit for Approval</button>
        <button type="button" className="check-approval-btn" onClick={checkApprovalStatus}>Check Approval Status</button>
        {approved && (
          <button type="button" className="check-approval-btn" onClick={handleRegistration}>Register</button>
        )}
      </div>
    </div>
  );
}

export default RegistrationForm;
