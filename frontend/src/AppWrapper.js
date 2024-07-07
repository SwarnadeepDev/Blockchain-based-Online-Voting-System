import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/Error';
import Content from './components/content';
import ElectionCreation from './components/ElectionCreation';
import RegistrationForm from './components/RegistrationForm';
import Vote from './components/Vote';
import CandidateRegistrationForm from './components/CandidateRegistration';
import Connectwallet from './components/connectwallet';
import Dashboard from './components/dashboard';
import Result from './components/Result';
import ElectionDetails from './components/ElectionDetails';
import App from './App';
import Approvals from './components/Approvals';
function AppWrapper() {
    const [connected, setConnected] = useState(false);
    const updateConnected = (updatedConnected) => setConnected(updatedConnected);
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null
    });
    const updateSetState = (updatedState) => setState(updatedState);
    const [elections, setElections] = useState([]);
    const [filteredElections, setFilteredElections] = useState([]);

    const updateElections = (updatedElections) => {
        setElections(updatedElections);
        setFilteredElections(updatedElections); // Initialize filteredElections with all elections
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const { contract } = state;
                if (!contract) return;

                const electionData = await contract.getElections();
                console.log(electionData);

                // Skip the first election
                const filteredElectionData = electionData.slice(1);
                console.log('Filtered Election Data:', filteredElectionData);

                const electionArray = filteredElectionData.map((election) => {
                    const id = election[0];
                    const registrationStart = election[6];
                    const electionStart = election[8];
                    const electionEnd = election[9];
                    const registrationEnd = election[7];

                    return {
                        id: typeof id === 'bigint' ? Number(id) - 1 : id - 1,
                        owner: election[2],
                        title: election[3],
                        description: election[4],
                        startDate: typeof registrationStart === 'bigint' ? Number(registrationStart) : registrationStart,
                        voteStartDate: typeof electionStart === 'bigint' ? Number(electionStart) : electionStart,
                        voteEndDate: typeof electionEnd === 'bigint' ? Number(electionEnd) : electionEnd,
                        endDate: typeof registrationEnd === 'bigint' ? Number(registrationEnd) : registrationEnd,
                        candidates: [],
                        registeredUsers: []
                    };
                });

                for (const election of electionArray) {
                    const candidates = await contract.getCandidates(election.id);
                    election.candidates = candidates.map(candidate => ({
                        id: Number(candidate.id),
                        name: candidate.name,
                        party: candidate.party,
                        manifesto: candidate.manifesto,
                        age: Number(candidate.age),
                        qualification: candidate.qualification,
                        votes: Number(candidate.voteCount)
                    }));

                    const voters = await contract.getVoters(election.id);
                    election.registeredUsers = voters.map(voter => ({
                        address: voter.voterAddress,
                        voted: voter.voted,
                        registered: voter.registered
                    }));
                }

                updateElections(electionArray);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        fetchInitialData();
        console.log(state);
    }, [state]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <App elections={elections} setFilteredElections={setFilteredElections} updateSetState={updateSetState} updateConnected={updateConnected} />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "election",
                    element: <Content filteredElections={filteredElections} signer={state.signer} />,
                },
                {
                    path: "dashboard",
                    element: <Dashboard filteredElections={filteredElections} signer={state.signer} />,
                },
                {
                    path: "candidate/:PremId",
                    element: <CandidateRegistrationForm  updateElections={updateElections} signer={state.signer} elections={elections} contract={state.contract} />
                },
                {
                    path: "creation",
                    element: <ElectionCreation state={state} elections={elections} updateElections={updateElections} connected={connected} />
                },
                {
                    index : true,
                    // path: "connectwallet",
                    element: <Connectwallet updateSetState={updateSetState} updateConnected={updateConnected} connected={connected} updateElections={updateElections} />,
                },
                {
                    path: "Vote/:PremId",
                    element: <Vote updateElections={updateElections} signer={state.signer} elections={elections} contract={state.contract} />,
                },
                {
                    path: "Result/:PremId",
                    element: <Result elections={elections} />,
                },
                {
                    path: "Register/:PremId",
                    element: <RegistrationForm updateElections={updateElections} signer={state.signer} elections={elections} contract={state.contract} />,
                },
                {
                    path: "ElectionDetails/:PremId",
                    element: <ElectionDetails elections={elections} />,
                },
                {
                    path: "Approvals",
                    element: <Approvals signer={state.signer}/>,
                },
            ],
        },
    ]);

    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

export default AppWrapper;
