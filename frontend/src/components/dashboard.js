import React from 'react';
import { Link } from 'react-router-dom';
import ElectionCard from './ElectionCard';

function Dashboard({ filteredElections, signer }) {
    return (
        <div className="content">
            {filteredElections && filteredElections.map((election) =>
                signer && election.owner === signer.address && (
                    <ElectionCard key={election.id} election={election} signer={signer} />
                ))}
        </div>
    );
}
export default Dashboard;
