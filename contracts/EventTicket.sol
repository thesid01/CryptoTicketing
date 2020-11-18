// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract EventTicket is ERC721("EventTicket", "🎟️") {
    struct Ticket {
        uint eventId;
        uint seatId;
    }

    mapping(address => uint256[]) private ownedTickets;
    
    Ticket[] internal tickets;

    function ticketsOf(address _owner) public view returns(uint[] memory) {
		return ownedTickets[_owner];
	}

	function getTicket(uint _id) public view returns(uint, uint) {
		require(_id < tickets.length);
		Ticket memory _ticket = tickets[_id];
		return(_ticket.eventId, _ticket.seatId);
	}

}