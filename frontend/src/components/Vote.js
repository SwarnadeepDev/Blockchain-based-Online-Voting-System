import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Vote({ updateElections, signer, elections, contract }) { // Add contractAddress and contractABI as props
    const { PremId } = useParams();
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const election = elections.find(election => election.id === parseInt(PremId));
                if (!election) {
                    setErrorMessage("Election not found");
                    return;
                }
                setCandidates(election.candidates);
            } catch (error) {
                console.error(error);
                setErrorMessage("Election not found");
            }
        };

        fetchCandidates();
    }, [PremId, elections]);

    const handleSelectChange = (event) => {
        setSelectedCandidate(event.target.value);
    };

    const handleVote = async () => {
        try {
            const candidateId = selectedCandidate;
            const signerAddress = await signer.getAddress();
            const election = elections.find(election => election.id === parseInt(PremId));
    
            if (!election) {
                console.log("Election not found");
                return;
            }
    
            const currentDate = new Date();
            const votingStartDate = new Date(election.voteStartDate * 1000);
            const votingEndDate = new Date(election.voteEndDate * 1000);
            console.log(currentDate);
            console.log(votingStartDate);
            console.log(votingEndDate);
    
            if (!(currentDate >= votingStartDate && currentDate < votingEndDate)) {
                console.log('Voting is only allowed during the voting period');
                return;
            }
    
            const candidate = election.candidates.find(candidate => candidate.id === parseInt(candidateId));
            if (!candidate) {
                console.log("Candidate not found");
                return;
            }
    
            const userIndex = election.registeredUsers.findIndex(user => user.address === signerAddress);
            if (userIndex !== -1) {
                // Smart contract interaction
                const tx = await contract.voteToElection(election.id, candidate.id);
                await tx.wait(); // Wait for the transaction to be mined

                // Update local state
                candidate.votes++;
                election.registeredUsers[userIndex].voted = true;
                updateElections(elections);
                setErrorMessage('');
                alert('Vote submitted successfully');
            } else {
                console.log("User not registered");
                return;
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred while submitting your vote.');
        }
    };

    if (!PremId || PremId <= 0 || PremId > elections.length) {
        return <div className="content">Invalid PremId</div>; 
    }

    return (
        <div className='content'>
            <div className='content1'>
                <h2>Voter Form</h2>
                {errorMessage && (
                    <div className="error-message">{errorMessage} </div>
                )}
                <form className="voter-form">
                    <div className="form-group">
                        <label htmlFor="candidate-select">Select Candidate:</label>
                        <select
                            id="candidate-select"
                            name="candidate-select"
                            value={selectedCandidate} 
                            onChange={handleSelectChange}
                            required
                        >
                            <option value="">Select a candidate</option>
                            {candidates.map(candidate => (
                                <option key={candidate.id} value={candidate.id}>
                                    {`${candidate.id} - ${candidate.name}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        className="vote-btn"
                        onClick={handleVote}
                    >
                        Vote
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Vote;
