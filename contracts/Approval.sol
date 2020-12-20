// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Approval is Ownable {
	// using SafeMath for uint;
    // using SafeMath for uint256;
    
    constructor()
    public{
        TotalRequests = 0;
    }
    
    struct Request {
        string aadharNo;
        string name;
        uint age;
        string photoProof;
        bool approved;
        address requestAddress;
    }
    
    mapping(string => bool) aadhar;
    mapping(address => string) addToAadhar;
    mapping(string => address) addToAddress;
    
    mapping(uint => Request) requests;
    uint TotalRequests;
    mapping(address => bool) approved;
    mapping(address => bool) requested;
    
    event requestCreated(string ssn, string hash);
    
    modifier validAadhar(string memory val) {
        require(aadhar[val] == false);
        _;
    }
    
    modifier hasRequested(address add) {
        require(requested[add] == false);
        _;
    }
    
    modifier validId(uint id) {
        require(id<TotalRequests);
        _;
    }
    
    function requestApproval(string memory ssn, string memory hash, string memory _name, uint _age) 
    validAadhar(ssn)
    hasRequested(msg.sender)
    public
    {
        Request memory _request = Request({
			aadharNo: ssn,
			photoProof: hash,
            name: _name,
            age: _age,
			approved: false,
            requestAddress: msg.sender
		});
		requests[TotalRequests] = _request;
		TotalRequests+=1;
		requested[msg.sender] = true;
		emit requestCreated(ssn, hash);
    }
    
    function approve(uint id)
    onlyOwner()
    validId(id)
    public
    {
        Request storage _r = requests[id];
        _r.approved = true;
        aadhar[_r.aadharNo] = true;
        addToAadhar[_r.requestAddress] = _r.aadharNo;
        addToAddress[_r.aadharNo] = _r.requestAddress;
        approved[_r.requestAddress] = true;
    }
    
    function getRequest(uint id)
    public
    view
    returns(string memory, string memory, bool, string memory, uint){
        return (requests[id].aadharNo, requests[id].photoProof, requests[id].approved, requests[id].name, requests[id].age);
    }
    
    function getTotalRequestsCount()
    public
    view
    returns(uint){
        return TotalRequests;
    }

    function getAddress(string memory _aadhar)
    public
    view
    returns(address){
        return addToAddress[_aadhar];
    }
    
    function isApproved(address add)
    public
    view
    returns(bool)
    {
        return approved[add];
    }
}