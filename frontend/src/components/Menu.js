import {React,useEffect} from 'react';
import { Link } from 'react-router-dom';

function Menu() {
    useEffect(() => {
        const ulContainer = document.querySelector('.ul-container');
        if (ulContainer ) {
            ulContainer.style.display = 'none';
        }
    }, []); 

    return (
        <div className='ul-container'>
            <ul className="menu">
                <li><Link to="/connectwallet"><i class="fa-solid fa-wallet"></i>&nbsp; &nbsp; &nbsp;&nbsp;Connect wallet</Link></li>
                <li><Link to="/election"><i class="fas fa-home"></i>&nbsp; &nbsp; &nbsp;&nbsp;Home</Link></li>
                <li><Link to="/dashboard"><i class="fa-solid fa-tv"></i>&nbsp; &nbsp; &nbsp;Dashboard</Link></li>
                <li><Link to="/Result"><i class="fa-solid fa-toggle-on"></i>&nbsp; &nbsp; &nbsp;&nbsp;Toggle Mode</Link></li>
                <li><Link to="/creation" className="button">Create Election</Link></li>
            </ul>
        </div>
    );
}

export default Menu;
