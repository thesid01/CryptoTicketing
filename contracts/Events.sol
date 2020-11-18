// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './EventTicket.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/utils/Pausable.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';

contract Events is EventTicket, Pausable, Ownable {
	using SafeMath for uint;
    using SafeMath for uint256;

	address tokenAddress;

	struct Event {
		address payable owner;
		string name;
		uint time;
		uint price;
		bool token;
		bool limited;
		uint seats;
		uint sold;
		string ipfs;
	}

	Event[] private allEvents;
    
    mapping(address => uint256[]) private ownedEvents;

	event CreatedEvent(address indexed owner, uint eventId);
	event SoldTicket(address indexed buyer, uint indexed eventId, uint ticketId);

	constructor(address _token) public {
		tokenAddress = _token;
	}

    modifier goodTime(uint _time) {
        require(_time > now);
        _;
    }

    modifier eventExist(uint _id) {
        require(_id < allEvents.length);
        _;
    }

	function changeToken(address _token) public onlyOwner() {
		tokenAddress = _token;
	}

	function createEvent(
		string memory _name,
		uint _time,
		uint _price,
		bool _token,
		bool _limited,
		uint _seats,
		string memory _ipfs
	)
    goodTime(_time)
    whenNotPaused()
    public {
        Event memory _event = Event({
			owner: msg.sender,
			name: _name,
			time: _time,
			price: _price,
			token: _token,
			limited: _limited,
			seats: _seats,
			sold: 0,
			ipfs: _ipfs
		});
        allEvents.push(_event);
		uint _eventId = allEvents.length.sub(1);
		ownedEvents[msg.sender].push(_eventId);
		emit CreatedEvent(msg.sender, _eventId);
	}

	function eventsOf(address _owner) public view returns(uint[] memory) {
		return ownedEvents[_owner];
	}

	function getEvent(uint _id)
		public
		view
		eventExist(_id)
	returns(
		string memory name,
		uint time,
		uint price,
		bool token,
		bool limited,
		uint seats,
		uint sold,
		string memory ipfs,
		address owner
	) {
		Event memory _event = allEvents[_id];
		return(
			_event.name,
			_event.time,
			_event.price,
			_event.token,
			_event.limited,
			_event.seats,
			_event.sold,
			_event.ipfs,
			_event.owner
		);
	}

	function getEventsCount() public view returns(uint) {
		return allEvents.length;
	}

	function buyTicket(uint _eventId)
		public
		payable
		eventExist(_eventId)
		goodTime(allEvents[_eventId].time)
		whenNotPaused()
	{
		Event memory _event = allEvents[_eventId];

		if (_event.limited) require(_event.seats > _event.sold);

		if (!_event.token) {
			require(msg.value >= _event.price);
			_event.owner.transfer(_event.price);
		} else {
			if (!ERC20(tokenAddress).transferFrom(msg.sender, _event.owner, _event.price)) {
				revert();
			}
		}

		uint seat = _event.sold.add(1);
		allEvents[_eventId].sold = seat;

		Ticket memory _ticket = Ticket({
			eventId: _eventId,
			seatId: seat
		});
        tickets.push(_ticket);
		uint _ticketId = tickets.length.sub(1);
        _mint(msg.sender, _ticketId);
		emit SoldTicket(msg.sender, _eventId, _ticketId);
	}
}