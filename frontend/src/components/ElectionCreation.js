import React, { useEffect, useState } from 'react';

function ElectionCreation({ state, elections, updateElections }) {
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const ulContainer = document.querySelector('.ul-container');
        if (ulContainer) {
            ulContainer.style.display = 'none';
        }
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const voteStartDate = document.getElementById('votestartDate').value;
        const voteEndDate = document.getElementById('voteendDate').value;

        // Remove previous error messages
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.remove();
        });

        // Check if all fields are filled
        let isValid = true;

        if (!title) {
            showError(document.getElementById('title'), 'Title is required.');
            isValid = false;
        }

        if (!description) {
            showError(document.getElementById('description'), 'Description is required.');
            isValid = false;
        }

        if (!startDate) {
            showError(document.getElementById('startDate'), 'Registration start date is required.');
            isValid = false;
        }

        if (!endDate) {
            showError(document.getElementById('endDate'), 'Registration end date is required.');
            isValid = false;
        }

        if (!voteStartDate) {
            showError(document.getElementById('votestartDate'), 'Vote start date is required.');
            isValid = false;
        }

        if (!voteEndDate) {
            showError(document.getElementById('voteendDate'), 'Vote end date is required.');
            isValid = false;
        }

        // Check date order
        if (startDate && endDate && startDate >= endDate) {
            showError(document.getElementById('endDate'), 'Registration end date must be after start date.');
            isValid = false;
        }

        if (voteStartDate && voteEndDate && voteStartDate >= voteEndDate) {
            showError(document.getElementById('voteendDate'), 'Vote end date must be after vote start date.');
            isValid = false;
        }

        if (endDate && voteStartDate && endDate >= voteStartDate) {
            showError(document.getElementById('votestartDate'), 'Vote start date must be after registration end date.');
            isValid = false;
        }

        if (!isValid) {
            setErrorMessage('Please correct the errors above.');
            return;
        }

        setErrorMessage('');

        // Convert date strings to UNIX timestamps
        const registrationStart = Math.floor(new Date(startDate).getTime() / 1000);
        const registrationEnd = Math.floor(new Date(endDate).getTime() / 1000);
        const electionStart = Math.floor(new Date(voteStartDate).getTime() / 1000);
        const electionEnd = Math.floor(new Date(voteEndDate).getTime() / 1000);

        try {
            // Call the smart contract function to create the election
            const tx = await state.contract.createElection(
                title,
                description,
                registrationStart,
                registrationEnd,
                electionStart,
                electionEnd
            );
            await tx.wait();

            console.log('Election created successfully');

            // Add the new election to the state
            const newElection = {
                id: elections.length + 1,
                title: title,
                description: description,
                startDate: registrationStart,
                endDate: registrationEnd,
                voteStartDate: electionStart,
                voteEndDate: electionEnd,
                owner: await state.signer.getAddress(),
                registeredUsers: [],
                candidates: []
            };
            updateElections([...elections, newElection]);
        } catch (error) {
            console.error('Error creating election:', error);
            setErrorMessage('An error occurred while creating the election.');
        }
    }

    function showError(inputElement, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        inputElement.parentNode.appendChild(errorElement);
    }

    return (
        <div className='content'>
            <div className="form-container">
                <div id="createFormContainer">
                    <h2>Create Election</h2>
                    <form id="eventForm">
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input type="text" id="title" name="title" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" name="description" required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="startDate">Registration Start Date and Time:</label>
                            <input type="datetime-local" id="startDate" name="startDate" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">Registration End Date and Time:</label>
                            <input type="datetime-local" id="endDate" name="endDate" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="votestartDate">Vote Start Date and Time:</label>
                            <input type="datetime-local" id="votestartDate" name="votestartDate" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="voteendDate">Vote End Date and Time:</label>
                            <input type="datetime-local" id="voteendDate" name="voteendDate" required />
                        </div>
                        <button id="form-submit" type="submit" onClick={handleSubmit}>Submit</button>
                    </form>
                    {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}
                </div>
            </div>
        </div>
    );
}

export default ElectionCreation;
