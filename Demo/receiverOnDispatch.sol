// (c) 2023, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

// SPDX-License-Identifier: Ecosystem

pragma solidity 0.8.18;

import "https://github.com/ava-labs/teleporter/blob/main/contracts/src/Teleporter/ITeleporterMessenger.sol";
import "https://github.com/ava-labs/teleporter/blob/main/contracts/src/Teleporter/ITeleporterReceiver.sol";
import "./SampleSwap.sol";

contract ReceiverOnDispatch is ITeleporterReceiver {

    ITeleporterMessenger public immutable teleporterMessenger = ITeleporterMessenger(0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf);
    TokenTransfer public swapContract = TokenTransfer(0x73007B30dE8A22F27019428f8B5D989058C9C85b);
  
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

    function swapAndMsg(
        address destinationAddress,
        string calldata message
    ) external {
        swapContract.transfer(lastMessage); // Assuming 'transfer' is the relevant function 
        teleporterMessenger.sendCrossChainMessage(
            TeleporterMessageInput({
                destinationBlockchainID: 0x9f3be606497285d0ffbb5ac9ba24aa60346a9b1812479ed66cb329f394a4b1c7,
                destinationAddress: destinationAddress,
                feeInfo: TeleporterFeeInfo({
                    feeTokenAddress: address(0),
                    amount: 0
                }),
                requiredGasLimit: 100000,
                allowedRelayerAddresses: new address[](0),
                message: abi.encode(message)
            })
        );
    }
}