import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  background-color: #181818;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const ConnectWallet = styled.button`
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



const Footer = styled.div``;

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

const Home = () => {
  
  const [currentAccount, setCurrentAccount] = useState("");


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

    // Check if we're authorized to access the user's wallet
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("no authorized account here");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <Header>
          <Left>
            <Title>⚡ Pika Name Service ⚡</Title>
            <Subtitle>your decentralized naming service for websites, wallets, hobbies and everything else.</Subtitle>
          </Left>
        </Header>
      </HeaderContainer>
      {!currentAccount && (
        <NotConnected>
          <Image
            src="https://c.tenor.com/3IACtMvxwdsAAAAi/pikachu-happy.gif"
            alt="Pika gif"
          />
          <ConnectWallet onClick={connectYourWallet}>🌀 Connect Wallet 🌀</ConnectWallet>
        </NotConnected>
      )}
      <div className="footer-container"></div>
    </Container>
  );
};

export default Home;
