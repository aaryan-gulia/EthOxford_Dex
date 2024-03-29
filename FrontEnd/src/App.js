
import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { GearFill } from 'react-bootstrap-icons';

import VeraChainLogo from './components/VeraChain.png';
import PageButton from './components/PageButton';
import ConnectButton from './components/ConnectButton';
import ConfigModal from './components/ConfigModal';
import CurrencyField from './components/CurrencyField';
import Dropdown from "./components/Dropdown";

import BeatLoader from "react-spinners/BeatLoader";
import { getWethContract, getUniContract, getPrice, runSwap } from './AlphaRouterService'

function App() {
  const [provider, setProvider] = useState(undefined)
  const [signer, setSigner] = useState(undefined)
  const [signerAddress, setSignerAddress] = useState(undefined)

  const [slippageAmount, setSlippageAmount] = useState(2)
  const [deadLineMinutes, setDeadLineMinutes] = useState(10)
  const [showModal, setShowModal] = useState(undefined)

  const [inputAmount, setInputAmount] = useState(undefined)
  const [outputAmount, setOutputAmount] = useState(undefined)
  const [transaction, setTransaction] = useState(undefined)
  const [loading, setLoading] = useState(undefined)
  const [ratio, setRatio] = useState(undefined)
  const [wethContract, setWethContract] = useState(undefined)
  const [uniContract, setUniContract] = useState(undefined)
  const [wethAmount, setWethAmount] = useState(undefined)
  const [uniAmount, setUniAmount] = useState(undefined)




  useEffect(() => {
    const onLoad = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)

      const wethContract = getWethContract()
      setWethContract(wethContract)

      const uniContract = getUniContract()
      setUniContract(uniContract)
    }
    onLoad()
  }, [])

  const getSigner = async provider => {
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer)
  }

  const isConnected = () => signer !== undefined
  const getWalletAddress = () => {
    signer.getAddress()
      .then(address => {
        setSignerAddress(address)

      // todo: connect weth and uni contracts

      wethContract.balanceOf(address)
      .then(res => {
        setWethAmount(Number(ethers.utils.formatEther(res)) )
      })
      uniContract.balanceOf(address)
      .then(res => {
        setUniAmount( Number(ethers.utils.formatEther(res)) )
      })
    })
  }

  if (signer !== undefined) {
    getWalletAddress()
  }

  const getSwapPrice = (inputAmount) => {
    setLoading(true)
    setInputAmount(inputAmount)
    setTransaction(42.5)
    setOutputAmount(inputAmount*42.5)
    setRatio(12)
    setLoading(false)

    // const swap = getPrice(
    //   inputAmount,
    //   slippageAmount,
    //   Math.floor(Date.now()/1000 + (deadLineMinutes * 60)),
    //   signerAddress
    // ).then(data => {
    //   setTransaction(data[0])
    //   setOutputAmount(data[1])
    //   setRatio(data[2])
    //   setLoading(false)
    // })
  }
  

  return (
    <div className="App">
      <div className="appNav">
        <div className="my-2 buttonContainer buttonContainerTop">
          <PageButton name={"Swap"} isBold={true} />
          <PageButton name={"Pool"} />
          {/* <PageButton name={"Vote"} /> */}
          <PageButton name={"Charts"} />
          <img
            src={VeraChainLogo}
            alt="VeraChain logo"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '64px',
              height: '64px',
            }}
          />        </div>

        <div className="rightNav">
          <div className="connectButtonContainer">
            <ConnectButton
              provider={provider}
              isConnected={isConnected}
              signerAddress={signerAddress}
              getSigner={getSigner}
            />
          </div>
          <div className="my-2 buttonContainer">
            <PageButton name={"..."} isBold={true} />
          </div>
        </div>
      </div>

      <div className="appBody">
        <div className="swapContainer">
          <div className="swapHeader">
            <span className="swapText">Swap</span>
            <span className="gearContainer" onClick={() => setShowModal(true)}>
              <GearFill />
            </span>
            {showModal && (
              <ConfigModal
                onClose={() => setShowModal(false)}
                setDeadLineMinutes={setDeadLineMinutes}
                deadLineMinutes={deadLineMinutes}
                setSlippageAmount={setSlippageAmount}
                slippageAmount={slippageAmount} />
            )}
          </div>

          <div className="swapBody">
            <CurrencyField
              field="input"
              tokenName="USDC"
              getSwapPrice={getSwapPrice}
              signer={signer}
              balance={wethAmount} />
            <CurrencyField
              field="output"
              tokenName="AVAX"
              value={outputAmount}
              signer={signer}
              balance={uniAmount}
              spinner={BeatLoader}
              loading={loading} />
          <Dropdown />
          </div>

          <div className="ratioContainer">
            {ratio && (
              <>
                {`1 USDC = 42.5 AVAX`}
              </>
            )}
          </div>

          <div className="swapButtonContainer">
            {isConnected() ? (
              <div
                onClick={() => runSwap(transaction, signer)}
                className="swapButton"
              >
                Swap
              </div>
            ) : (
              <div
                onClick={() => getSigner(provider)}
                className="swapButton"
              >
                Connect Wallet
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;
