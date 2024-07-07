// import React from 'react';
// import { Link } from 'react-router-dom';
// import ElectionCard from './ElectionCard';

// function Content({ filteredElections, signer }) {
//     return (
//         <div className="content">
//             {filteredElections && filteredElections.map((election) => (
//                 <ElectionCard key={election.id} election={election} signer={signer} />
//             ))}
//         </div>
//     );
// }
// export default Content;
import React, { useState, useEffect } from 'react';
import ElectionCard from './ElectionCard';

function Content({ filteredElections, signer }) {
    const [currentPage, setCurrentPage] = useState(1);
    const electionsPerPage = 6;

    // Sort elections based on vote end date
    const sortedElections = filteredElections.sort((a, b) => {
        const now = Date.now();
        const aEnded = a.voteEndDate < now;
        const bEnded = b.voteEndDate < now;

        if (aEnded && !bEnded) return 1; // a has ended, b has not ended
        if (!aEnded && bEnded) return -1; // a has not ended, b has ended
        return a.voteEndDate - b.voteEndDate; // both have same status, sort by nearest voting time
    });

    const indexOfLastElection = currentPage * electionsPerPage;
    const indexOfFirstElection = indexOfLastElection - electionsPerPage;
    const currentElections = sortedElections.slice(indexOfFirstElection, indexOfLastElection);

    const totalPages = Math.ceil(sortedElections.length / electionsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className='fp'>
            <div className="content">
                {currentElections.map((election) => (
                    <ElectionCard key={election.id} election={election} signer={signer} />
                ))}

            </div>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Content;


