// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract EventTicket is ERC721("EventTicket", "🎟️") {
    struct Ticket {
        uint eventId;
        uint seatId;
        address payable owner;
        bool isValid;
        bool refundRequested;
    }

    mapping(address => uint256[]) private ownedTickets;
    
    Ticket[] internal tickets;
    uint256[] refundRequest;

    modifier validRequestRefund(uint _tid, address _owner) {
        require(_tid < refundRequest.length);
        require(_owner == tickets[_tid].owner);
        require(tickets[_tid].isValid);
        require(!tickets[_tid].refundRequested);
        _;
    }

    function ticketsOf(address _owner) public view returns(uint[] memory) {
		return ownedTickets[_owner];
	}

	function getTicket(uint _id) public view returns(uint, uint, bool, bool) {
		require(_id < tickets.length);
		Ticket memory _ticket = tickets[_id];
		return(_ticket.eventId, _ticket.seatId, _ticket.isValid, _ticket.refundRequested);
	}

    function setTicket(uint _id, address add) public{
        ownedTickets[add].push(_id);
    }

    function requestRefund(uint ticketId)
    // validRequestRefund(ticketId, msg.sender)
    public
    {
        refundRequest.push(ticketId);
        tickets[ticketId].refundRequested = true;
    }
}