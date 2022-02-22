import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import Domains from "../utils/Domains.json";
import polygonLogo from "../assets/polygonlogo.png";
import ethLogo from "../assets/ethlogo.png";
import { networks } from "../utils/networks";

const Container = styled.div`
  height: 100%;
  background-color: while;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const NotConnected = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  max-width: 550px;
`;

const Image = styled.img`
  margin-bottom: 30px;
`;

const ConnectWalletButton = styled.button`
  background-image: linear-gradient(
    to right,
    #ff8177 0%,
    #ff867a 0%,
    #ff8c7f 21%,
    #f99185 52%,
    #cf556c 78%,
    #b12a5b 100%
  );
  background-size: 200% 200%;
  animation: gradient-animation 4s ease infinite;
  font-weight: 500;
  font-size: 20px;
  color: white;
  font-family: "Poppins", sans-serif;
  border-radius: 10px;
  width: 50%;
`;

const ConnectWalletContainer = styled.div``;

const HeaderContainer = styled.div`
  padding-top: 30px;
`;

const Title = styled.p`
  margin: 0;
  color: red;
  font-weight: 600;
  font-size: 34px;
  font-family: "Poppins", sans-serif;
`;

const Footer = styled.footer`
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 10px 10px 10px;
`;

const Left = styled.div`
  text-align: left;
  margin-left: 10%;
`;

const Subtitle = styled.span`
  font-size: 25px;
  color: white;
`;

const FormContainer = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormInput = styled.input`
  border: 0;
  border-radius: 12px;
  background-color: navajowhite;
  letter-spacing: 1px;
  font-size: 26px;
  width: 400px;
  margin-bottom: 15px;
  padding: 10px 20px;
  text-align: center;
  color: black;
  font-weight: 600;
  font-family: "Poppins", sans-serif;

  &::placeholder {
    color: gray;
    letter-spacing: 0.1px;
    font-size: 19px;
    font-weight: 200;
  }

  &:focus {
    outline: none;
  }
`;

const ButtonContainers = styled.div``;

const ButtonOne = styled.button`
  height: 45px;
  border: 0;
  width: auto;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: black;
  background: yellow;
  margin-right: 10px;

  &:hover {
    background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
    color: black;
    font-weight: bolder;
  }
`;

const SwitchNetworkButton = styled.button`
  height: 45px;
  border: 0;
  width: auto;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  background: yellow;
  font-weight: bold;
  color: black;
  margin-right: 10px;

  &:hover {
    background: darkmagenta;
    color: white;
  }
`;

const DomainField = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const MainDomainText = styled.p`
  position: absolute;
  font-size: 20px;
  font-weight: bold;
  color: darkmagenta;
  /* left: -70px; */
  right: 22px;
  margin: 0;
  padding: 0;
  margin-bottom: 13px;
`;

const Right = styled.div`
  display: flex;
  background: black;
  border-radius: 16px;
  padding: 12px 12px;
  height: 99%;
  margin-right: 10%;
  margin-top: 10px;
  font-family: "Poppins";
  font-weight: bolder;
`;

const mainDomain = ".pika";
const CONTRACT_ADDRESS = "0xB02716aBF48c10843f4dDFb559b59728002f9D43";
const Home = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [domain, setDomain] = useState("");
  const [record, setRecord] = useState("");
  const [email, setEmail] = useState("");
  const [twitter, setTwitter] = useState("");
  const [profession, setProfession] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [network, setNetwork] = useState("");

  const connectYourWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("error", error);
    }
  };
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("No WALLET FOUND!");
      alert("No wallet found");
    } else {
      console.log(ethereum, "is the object");
    }

  
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("no authorized account here");
    }
    const chainId = await ethereum.request({ method: "eth_chainId" });
    setNetwork(networks[chainId]);
    ethereum.on("chainChanged", handleChainChanged);
    function handleChainChanged(_chainId) {
      window.location.reload();
    }
  };

  const mintDomain = async (e) => {
    e.preventDefault();
    console.log(domain, profilePic, email, profession, record, twitter);
    if (!domain) {
      alert("Domain name must not be empty");
      return;
    }
    if (domain.length < 3) {
      alert("Domain name must be atleast 3 characters long");
      return;
    }

    const price =
      domain.length === 3 ? "0.5" : domain.length === 4 ? "0.3" : "0.1";
    console.log("Minting domain", domain, "costing", price);

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          Domains.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");

        let tx = await contract.register(domain, {
          value: ethers.utils.parseEther(price),
        });
        const receipt = await tx.wait();

        if (receipt.status === 1) {
          console.log(
            "Domain minted! https://mumbai.polygonscan.com/tx/" + tx.hash
          );

          tx = contract.setRecord(domain, record);

          await tx.wait();
          console.log(
            "Record set! https://mumbai.polygonscan.com/tx/" + tx.hash
          );

          tx = contract.setEmail(domain, email);
          await tx.wait();
          console.log(domain, ",s email set to", email);

          tx = contract.setProfession(domain, profession);

          await tx.wait();
          console.log(domain, ",s profession set to", profession);

          tx = contract.setTwitter(domain, twitter);
          await tx.wait();
          console.log(domain, ",s twitter set to", twitter);

          tx = contract.setPFP(domain, profilePic);
          await tx.wait();

          console.log(domain, ",s pfp set to", profilePic);

          console.log(
            "Record set! https://mumbai.polygonscan.com/tx/" + tx.hash
          );

          setRecord("");
          setDomain("");
          setEmail("");
          setTwitter("");
          setProfession("");
          setProfilePic("");
        } else {
          alert("Transaction failed, please try again!");
        }
      }
    } catch (error) {
      console.log("yikes an error", error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const switchNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }], // Check networks.js for hexadecimal network ids
        });
      } catch (error) {
        // This error code means that the chain we want has not been added to MetaMask
        // In this case we ask the user to add it to their MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13881",
                  chainName: "Polygon Mumbai Testnet",
                  rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                  nativeCurrency: {
                    name: "Mumbai Matic",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
        console.log(error);
      }
    } else {
      // If window.ethereum is not found then MetaMask is not installed
      alert(
        "MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html"
      );
    }
  };

  const renderInputForm = () => {
    if (network !== "Polygon Mumbai Testnet") {
      return (
        <ConnectWalletContainer>
          <Title>Please connect to Polygon Mumbai Testnet</Title>
          <SwitchNetworkButton onClick={switchNetwork}>
            Click To Switch to Polygon Mumbai Testnet
          </SwitchNetworkButton>
        </ConnectWalletContainer>
      );
    }
    return (
      <FormContainer>
        <DomainField>
          <FormInput
            type="text"
            value={domain}
            placeholder="domain"
            onChange={(e) => setDomain(e.target.value)}
          />
          <MainDomainText>{mainDomain}</MainDomainText>
        </DomainField>
        <FormInput
          type="text"
          value={record}
          placeholder="say something, anything, everything?"
          onChange={(e) => setRecord(e.target.value)}
        />
        <FormInput
          type="text"
          value={email}
          placeholder="link an email to this domain?"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="text"
          value={profession}
          placeholder="link a profession to this domain?"
          onChange={(e) => setProfession(e.target.value)}
        />
        <FormInput
          type="text"
          value={twitter}
          placeholder="link a twitter account to this domain?"
          onChange={(e) => setTwitter(e.target.value)}
        />
        <FormInput
          type="text"
          value={profilePic}
          placeholder="link a profile pic link to this domain?"
          onChange={(e) => setProfilePic(e.target.value)}
        />
        <ButtonContainers>
          <ButtonOne disabled={null} onClick={mintDomain}>
            Mint
          </ButtonOne>
        </ButtonContainers>
      </FormContainer>
    );
  };
  return (
    <Container>
      <HeaderContainer>
        <Header>
          <Left>
            <Title>⚡ Pika Name Service ⚡</Title>
            <Subtitle>
              your decentralized naming service for websites, wallets, hobbies
              and everything else.
            </Subtitle>
          </Left>
          <Right>
            <Image
              alt="Network logo"
              className="logo"
              src={network.includes("Polygon") ? polygonLogo : ethLogo}
            />
            {currentAccount ? (
              <p>
                {" "}
                Wallet: {currentAccount.slice(0, 6)}...
                {currentAccount.slice(-4)}{" "}
              </p>
            ) : (
              <p> Not connected </p>
            )}
          </Right>
        </Header>
      </HeaderContainer>
      {!currentAccount && (
        <NotConnected>
          <Image
            src="https://c.tenor.com/3IACtMvxwdsAAAAi/pikachu-happy.gif"
            alt="Pika gif"
          />
          <ConnectWalletButton onClick={connectYourWallet}>
            🌀 Connect Wallet 🌀
          </ConnectWalletButton>
        </NotConnected>
      )}
      {currentAccount && renderInputForm()}
      <div className="footer-container"></div>
    </Container>
  );
};

export default Home;
