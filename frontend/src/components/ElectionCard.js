import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ElectionCard({ election, signer }) {
    const [remainingTime, setRemainingTime] = useState(0);
    const [timerLabel, setTimerLabel] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const { remainingTime, timerLabel } = getRemainingTimeInfo(election);
            setRemainingTime(remainingTime);
            setTimerLabel(timerLabel);
        }, 1000);

        return () => clearInterval(interval);
    }, [election]);

    const getRemainingTimeInfo = (election) => {
        const currentDate = new Date();
        const registrationStartDate = new Date(election.startDate * 1000);
        const registrationEndDate = new Date(election.endDate * 1000);
        const votingStartDate = new Date(election.voteStartDate * 1000);
        const votingEndDate = new Date(election.voteEndDate * 1000);

        if (currentDate < registrationStartDate) {
            return {
                remainingTime: (registrationStartDate - currentDate) / 1000,
                timerLabel: "Registration will start in:"
            };
        } else if (currentDate < registrationEndDate) {
            return {
                remainingTime: (registrationEndDate - currentDate) / 1000,
                timerLabel: "Registration will end in:"
            };
        } else if (currentDate < votingStartDate) {
            return {
                remainingTime: (votingStartDate - currentDate) / 1000,
                timerLabel: "Voting will start in:"
            };
        } else if (currentDate < votingEndDate) {
            return {
                remainingTime: (votingEndDate - currentDate) / 1000,
                timerLabel: "Voting will end in:"
            };
        } else {
            return {
                remainingTime: 0,
                timerLabel: "Vote has ended see the result"
            };
        }
    };

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);

        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const getButtonText = () => {
        const currentDate = new Date();
        const registrationStartDate = new Date(election.startDate * 1000);
        const registrationEndDate = new Date(election.endDate * 1000);
        const votingStartDate = new Date(election.voteStartDate * 1000);
        const votingEndDate = new Date(election.voteEndDate * 1000);

        if (currentDate < registrationStartDate) {
            return "";
        } else if (currentDate >= registrationStartDate && currentDate < registrationEndDate) {
            return "Register";
        } else if (currentDate >= votingStartDate && currentDate < votingEndDate) {
            return "Vote";
        } else if (currentDate >= votingEndDate) {
            return "Result";
        }
        else {
            return "";
        }
    };

    return (
        <div className="card">
            <div className="button-container">
            
                {getButtonText() && (
                    <Link to={`/${getButtonText()}/${election.id}`}>
                    <button className="register-btn">{getButtonText()}</button>
                    </Link>
                )}
                <Link to={`/ElectionDetails/${election.id}`}>
                    <button className="details-btn">See Details</button>
                </Link>
            </div>
            <h2 className="title">{election.title}</h2>
            <p className="description">{election.description}</p>
            <p className="timer-label">{timerLabel}</p>
            <div id="countdown" className="countdown">{formatTime(remainingTime)}</div>
            {timerLabel === "Registration will end in:" && (
                <Link to={`/candidate/${election.id}`}>
                    <button className="candidate-registration-btn">Candidate Registration</button>
                </Link>
            )}
        </div>
    );
}

export default ElectionCard;
