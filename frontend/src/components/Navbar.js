import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";

function Navbar({ elections, setFilteredElections }) {
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredElections(elections);
        } else {
            const filtered = elections.filter(election =>
                (election.name && election.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (election.description && election.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredElections(filtered.length > 0 ? filtered : elections);
        }
    }, [searchQuery, elections, setFilteredElections]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        if (searchQuery.trim() === '') {
            setFilteredElections(elections);
        } else {
            const filtered = elections.filter(election =>
                // (election.id.toLowerCase().includes(searchQuery.toLowerCase()))||
                (election.title && election.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (election.description && election.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredElections(filtered.length > 0 ? filtered : elections);
        }
    };

    function handleClick() {
        const ulContainer = document.querySelector('.ul-container');
        if (ulContainer.style.display === 'none') {
            ulContainer.style.display = 'flex';
        } else {
            ulContainer.style.display = 'none';
        }
    }

    return (
        <nav className="navbar">
            <div className="logo-search">
                <div className="logo"></div>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search Elections..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="button-profile">
                <Link to="/creation" className="button">Create Election</Link>
                {/* <div className="profile"></div> */}
            </div>
            <div className="handbargermenu" onClick={handleClick}><i className="fa-solid fa-bars"></i></div>
        </nav>
    );
}

export default Navbar;
