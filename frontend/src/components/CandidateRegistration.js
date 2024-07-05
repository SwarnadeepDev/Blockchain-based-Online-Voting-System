import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CandidateRegistrationForm({ updateElections, signer, elections, contract }) {
  const { PremId } = useParams();
  const [address, setAddress] = useState('');
  const [id, setId] = useState('');
  const [approved, setApproved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to submit data for approval
  const handleApproval = async () => {
    if (address && id) {
      try {
        const message = "candidate";
        const signature = await signer.signMessage(message);
        const response = await axios.post('https://blockchain-based-online-voting-system-1.onrender.com/api/register-candidate', { address, id, electionID: PremId, signature });
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
      const response = await axios.get(`https://blockchain-based-online-voting-system-1.onrender.com/api/check-candidate-approval`, {
        params: { address, id, electionID: PremId }
      });
      if (response.data.approved) {
        setApproved(true);
        setErrorMessage('');
      } else {
        setErrorMessage('Candidate not approved yet.');
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
      const name = document.getElementById('name').value;
      const party = document.getElementById('party').value;
      const manifesto = document.getElementById('manifesto').value;
      const age = document.getElementById('age').value;
      const qualification = document.getElementById('qualification').value;

      const election = elections.find(election => election.id === parseInt(PremId));
      if (!election) {
        setErrorMessage("Election not found");
        return;
      }

      const currentDate = new Date();
      const registrationStartDate = new Date(election.startDate * 1000);
      const registrationEndDate = new Date(election.endDate * 1000);

      if (!(currentDate >= registrationStartDate && currentDate < registrationEndDate)) {
        setErrorMessage("Candidate can only be added during registration period");
        return;
      }

      const tx = await contract.registerCandidateToElection(
        election.id,
        parseInt(age),
        qualification,
        name,
        party,
        manifesto
      );
      await tx.wait(); 

      const candidate = {
        name,
        party,
        manifesto,
        age: parseInt(age),
        qualification,
        votes: 0,
        id: election.candidates.length + 1
      };

      election.candidates.push(candidate);
      updateElections(elections);

      setErrorMessage('');
      alert('Candidate registered successfully 🎉');
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while registering the candidate.');
    }
  };

  if (!PremId || PremId <= 0 || PremId > elections.length) {
    return <div className="content">Invalid PremId</div>;
  }

  return (
    <div className='content'>
      <div className='content1'>
        <h2>Candidate Registration Form</h2>
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
          <form className="candidate-registration-form" onSubmit={handleRegistration}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="party">Party:</label>
              <input type="text" id="party" name="party" required />
            </div>
            <div className="form-group">
              <label htmlFor="manifesto">Manifesto:</label>
              <textarea id="manifesto" name="manifesto" required />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input type="number" id="age" name="age" required />
            </div>
            <div className="form-group">
              <label htmlFor="qualification">Qualification:</label>
              <input type="text" id="qualification" name="qualification" required />
            </div>
            <button type="submit" className="check-approval-btn">Register</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CandidateRegistrationForm;
