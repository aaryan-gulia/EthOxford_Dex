pragma solidity 0.8.18;

import "https://github.com/ava-labs/teleporter/blob/main/contracts/src/Teleporter/ITeleporterMessenger.sol";
import "https://github.com/ava-labs/teleporter/blob/main/contracts/src/Teleporter/ITeleporterReceiver.sol";

contract ReceiverOnDispatch is ITeleporterReceiver {

    ITeleporterMessenger public immutable teleporterMessenger = ITeleporterMessenger(0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf);
  
    uint public lastMessage;

    function receiveTeleporterMessage(
        bytes32 originChainID,
        address originSenderAddress,
        bytes calldata message
    ) external {
        // Only the Teleporter receiver can deliver a message.
        require(msg.sender == address(teleporterMessenger), "ReceiverOnDispatch: unauthorized TeleporterMessenger");

        // Store the message.
        lastMessage = abi.decode(message, (uint));
    }
}