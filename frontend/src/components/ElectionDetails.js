import React from 'react';
import { useParams } from 'react-router-dom';

function ElectionDetails({ elections }) {
    // Extracting the PremId from the URL params
    const { PremId } = useParams();

    // Finding the specific election based on PremId
    const election = elections.find(election => election.id === parseInt(PremId));

    if (!election) {
        return <p>No election found with ID {PremId}</p>;
    }

    return (
        <div className='content'>
            <div className="election-details">
                <h2>{election.title}</h2>
                <p><strong>Election ID:</strong> {election.id}</p>
                <p><strong>Description:</strong> {election.description}</p>
                <p><strong>Owner:</strong> {election.owner}</p>
                <p><strong>Registration Start Date:</strong> {new Date(election.startDate).toLocaleString()}</p>
                <p><strong>Registration End Date:</strong> {new Date(election.endDate).toLocaleString()}</p>
                <p><strong>Voting Start Date:</strong> {new Date(election.voteStartDate).toLocaleString()}</p>
                <p><strong>Voting End Date:</strong> {new Date(election.voteEndDate).toLocaleString()}</p>
                <p><strong>Registered Voters:</strong> {election.registeredUsers.length}</p>
                <div className="candidates-list">
                    <h3>Candidates:</h3>
                    {election.candidates.length > 0 ? (
                        <ul>
                            {election.candidates.map((candidate, index) => (
                                <li key={index}>
                                    <strong>Name:</strong> {candidate.name}, <strong>Age:</strong> {candidate.age}, <strong>Party:</strong> {candidate.party}, <strong>Manifesto:</strong> {candidate.manifesto}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No candidates registered yet.</p>
                    )}
                </div>
                <div className="registered-users-list">
                    <h3>Registered Voters:</h3>
                    {election.registeredUsers.length > 0 ? (
                        <ul>
                            {election.registeredUsers.map((user, index) => (
                                <li key={index}>
                                    {user.address} - {user.voted ? 'Voted' : 'Not Voted'}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No registered voters yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ElectionDetails;
