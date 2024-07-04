const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { expect } = require("chai");
  
  describe("Ballot Contract", function () {
    // Define a fixture to reuse the same setup in every test
    async function deployBallotFixture() {
      const [owner, addr1, addr2] = await ethers.getSigners();
  
      const Ballot = await ethers.getContractFactory("Ballot");
      const ballot = await Ballot.deploy();
  
      return { ballot, owner, addr1, addr2 };
    }
  
    describe("Deployment", function () {
      it("Should set the right contract owner", async function () {
        const { ballot, owner } = await loadFixture(deployBallotFixture);
        expect(await ballot.contractOwner()).to.equal(owner.address);
      });
    });
  
    describe("Election Creation", function () {
      it("Should create an election", async function () {
        const { ballot, owner } = await loadFixture(deployBallotFixture);
  
        await ballot.createElection(
          "Presidential Election",
          "Elect the next president",
          Math.floor(Date.now() / 1000),
          Math.floor(Date.now() / 1000) + 1000,
          Math.floor(Date.now() / 1000) + 2000,
          Math.floor(Date.now() / 1000) + 3000
        );
  
        const election = await ballot.elections(1); // Accessing the first election
        expect(election.title).to.equal("Presidential Election");
        expect(election.description).to.equal("Elect the next president");
        expect(await ballot.findElectionOwner(1)).to.equal(owner.address);
      });
  
      it("Should not create an election with invalid times", async function () {
        const { ballot } = await loadFixture(deployBallotFixture);
  
        await expect(
          ballot.createElection(
            "Invalid Election",
            "Invalid Times",
            Math.floor(Date.now() / 1000) + 2000,
            Math.floor(Date.now() / 1000) + 1000,
            Math.floor(Date.now() / 1000) + 3000,
            Math.floor(Date.now() / 1000) + 4000
          )
        ).to.be.revertedWith("Invalid registration period");
      });
    });
  
    describe("Voter Registration", function () {
      it("Should register a voter", async function () {
        const { ballot, owner } = await loadFixture(deployBallotFixture);
  
        await ballot.createElection(
          "Election",
          "Election Description",
          Math.floor(Date.now() / 1000),
          Math.floor(Date.now() / 1000) + 1000,
          Math.floor(Date.now() / 1000) + 2000,
          Math.floor(Date.now() / 1000) + 3000
        );
  
        await ballot.registerVoterToElection(1);
        const voters = await ballot.getVoters(1);
        expect(voters[0].voterAddress).to.equal(owner.address);
      });
  
      it("Should not register the same voter twice", async function () {
        const { ballot } = await loadFixture(deployBallotFixture);
  
        await ballot.createElection(
          "Election",
          "Election Description",
          Math.floor(Date.now() / 1000),
          Math.floor(Date.now() / 1000) + 1000,
          Math.floor(Date.now() / 1000) + 2000,
          Math.floor(Date.now() / 1000) + 3000
        );
  
        await ballot.registerVoterToElection(1);
        await expect(ballot.registerVoterToElection(1)).to.be.revertedWith(
          "You are already registered to vote."
        );
      });
    });
  
    describe("Candidate Registration", function () {
      it("Should register a candidate", async function () {
        const { ballot } = await loadFixture(deployBallotFixture);
  
        await ballot.createElection(
          "Election",
          "Election Description",
          Math.floor(Date.now() / 1000),
          Math.floor(Date.now() / 1000) + 1000,
          Math.floor(Date.now() / 1000) + 2000,
          Math.floor(Date.now() / 1000) + 3000
        );
  
        await ballot.registerCandidateToElection(
          1,
          35,
          "PhD",
          "Alice",
          "Party A",
          "Manifesto A"
        );
        const candidates = await ballot.getCandidates(1);
        expect(candidates[0].name).to.equal("Alice");
      });
    });
  
    describe("Voting", function () {
      it("Should allow voting", async function () {
        const { ballot } = await loadFixture(deployBallotFixture);
  
        await ballot.createElection(
          "Election",
          "Election Description",
          Math.floor(Date.now() / 1000),
          Math.floor(Date.now() / 1000) + 1000,
          Math.floor(Date.now() / 1000) + 2000,
          Math.floor(Date.now() / 1000) + 3000
        );
  
        await ballot.registerCandidateToElection(
          1,
          35,
          "PhD",
          "Alice",
          "Party A",
          "Manifesto A"
        );
        await ballot.registerVoterToElection(1);
  
        await time.increaseTo(Math.floor(Date.now() / 1000) + 2000);
  
        await ballot.voteToElection(1, 1);
        const candidates = await ballot.getCandidates(1);
        expect(candidates[0].voteCount).to.equal(1);
      });
  
      it("Should not allow double voting", async function () {
        const { ballot } = await loadFixture(deployBallotFixture);
  
        await ballot.createElection(
          "Election",
          "Election Description",
          Math.floor(Date.now() / 1000),
          Math.floor(Date.now() / 1000) + 1000,
          Math.floor(Date.now() / 1000) + 2000,
          Math.floor(Date.now() / 1000) + 3000
        );
  
        await ballot.registerCandidateToElection(
          1,
          35,
          "PhD",
          "Alice",
          "Party A",
          "Manifesto A"
        );
        await ballot.registerVoterToElection(1);
  
        await time.increaseTo(Math.floor(Date.now() / 1000) + 2000);
  
        await ballot.voteToElection(1, 1);
        await expect(ballot.voteToElection(1, 1)).to.be.revertedWith(
          "You have already voted."
        );
      });
    });
  });
  