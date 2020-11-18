pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

/**
* @title StableToken
* @dev It is a basic ERC20 Token with unlimited mint() function.
*/
contract StableToken is ERC20 {

	constructor(uint256 initialSupply) ERC20("Event Token Rupee", "ETR") public {
        _mint(msg.sender, initialSupply);
    }

	// event Mint(address indexed to, uint256 amount);

	// function mint() public returns(bool) {
	// 	uint amount = 100000000000000000000;
	// 	totalSupply = totalSupply.add(amount);
	// 	balanceOf[msg.sender] = balanceOf[msg.sender].add(amount);
	// 	emit Mint(msg.sender, amount);
	// 	emit Transfer(address(0), msg.sender, amount);
	// 	return true;
	// }
}
