import React from 'react';
import { Link } from 'react-router-dom';
import ElectionCard from './ElectionCard';

function Content({ filteredElections, signer }) {
    return (
        <div className="content">
            {filteredElections && filteredElections.map((election) => (
                <ElectionCard key={election.id} election={election} signer={signer} />
            ))}
        </div>
    );
}
export default Content;
