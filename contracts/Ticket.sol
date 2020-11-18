// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Tickets {
    struct Ticket {
        uint eventId;
        uint seatId;
    }

    Ticket[] internal tickets;
}