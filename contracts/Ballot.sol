// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Ballot {
    address public contractOwner;

    constructor() {
        contractOwner = msg.sender;
    }

    struct Candidate {
        uint id;
        uint age;
        string qualification;
        string name;
        uint voteCount;
        string party;
        string manifesto;
    }

    struct Voter {
        bool registered;
        bool voted;
        address voterAddress;
    }

    struct Election {
        address owner;
        string title;
        string description;
        uint candidatesCount;
        uint256 registrationStart;
        uint256 registrationEnd;
        uint256 electionEnd;
        uint256 electionStart;
        uint winnerId;
        Candidate[] candidates;
        Voter[] voters;
    }

    mapping(uint256 => Election) public elections;
    uint256 public noOfElections = 1;

    function createElection(
        string memory _title,
        string memory _description,
        uint256 _registrationStart,
        uint256 _registrationEnd,
        uint256 _electionStart,
        uint256 _electionEnd
    ) public returns (uint256) {
        require(
            _registrationStart < _registrationEnd,
            "Invalid registration period"
        );
        require(
            _registrationEnd < _electionStart,
            "Invalid election start time"
        );
        require(_electionStart < _electionEnd, "Invalid election end time");

        Election storage election = elections[noOfElections];
        election.owner = msg.sender;
        election.title = _title;
        election.description = _description;
        election.registrationStart = _registrationStart;
        election.registrationEnd = _registrationEnd;
        election.electionStart = _electionStart;
        election.electionEnd = _electionEnd;
        election.winnerId = 0;
        noOfElections++;
        return noOfElections - 1;
    }

    function registerVoterToElection(uint256 _id) public {
        Election storage election = elections[_id];

        for (uint i = 0; i < election.voters.length; i++) {
            require(
                election.voters[i].voterAddress != msg.sender,
                "You are already registered to vote."
            );
        }

        election.voters.push(Voter(true, false, msg.sender));
    }

    function registerCandidateToElection(
        uint256 _id,
        uint _age,
        string memory _qualification,
        string memory _name,
        string memory _party,
        string memory _manifesto
    ) public {
        Election storage election = elections[_id];
        uint candidateId = election.candidates.length + 1;
        Candidate memory newCandidate = Candidate(
            candidateId,
            _age,
            _qualification,
            _name,
            0,
            _party,
            _manifesto
        );
        election.candidates.push(newCandidate);

        if (election.candidates.length == 1) {
            election.winnerId = candidateId;
        }
    }

    function voteToElection(uint256 _id, uint256 _candidateId) public {
        Election storage election = elections[_id];
        require(
            _candidateId > 0 && _candidateId <= election.candidates.length,
            "Invalid candidate."
        );
        require(
            block.timestamp >= election.electionStart &&
                block.timestamp <= election.electionEnd,
            "Election is not active."
        );

        bool foundVoter = false;
        for (uint i = 0; i < election.voters.length; i++) {
            if (election.voters[i].voterAddress == msg.sender) {
                require(!election.voters[i].voted, "You have already voted.");
                election.voters[i].voted = true;
                foundVoter = true;
                break;
            }
        }
        require(foundVoter, "You are not registered to vote.");

        election.candidates[_candidateId - 1].voteCount++;
        if (
            election.candidates[_candidateId - 1].voteCount >
            election.candidates[election.winnerId - 1].voteCount
        ) {
            election.winnerId = _candidateId;
        }
    }

    function getCandidates(
        uint256 _id
    ) public view returns (Candidate[] memory) {
        Election storage election = elections[_id];
        return election.candidates;
    }

    function getVoters(
        uint256 _id
    ) public view returns (Voter[] memory) {
        Election storage election = elections[_id];
        return election.voters;
    }

    function getElections() public view returns (ElectionData[] memory) {
        ElectionData[] memory electionData = new ElectionData[](noOfElections);

        for (uint i = 1; i < noOfElections; i++) {
            Election storage election = elections[i];
            electionData[i] = ElectionData(
                i + 1,
                election.winnerId,
                election.owner,
                election.title,
                election.description,
                election.candidatesCount,
                election.registrationStart,
                election.registrationEnd,
                election.electionStart,
                election.electionEnd
            );
        }

        return electionData;
    }

    function findElectionOwner(uint256 _id) public view returns (address) {
        Election storage election = elections[_id];
        return election.owner;
    }

    struct ElectionData {
        uint id;
        uint winnerId;
        address owner;
        string title;
        string description;
        uint candidatesCount;
        uint256 registrationStart;
        uint256 registrationEnd;
        uint256 electionStart;
        uint256 electionEnd;
    }
}
