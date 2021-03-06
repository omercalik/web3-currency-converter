import type { NextPage } from "next"
import Head from "next/head"
import React, { useState } from "react"
import { useWeb3React } from "@web3-react/core"
import styled from "styled-components"
import Form from "../components/Form"
import { injected } from "../wallet/connector"
import CustomModal from "../components/CustomModal"

const Container = styled.div`
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
`

const Header = styled.h1`
  text-align: center;
  font-size: 40px;
  color: white;
  margin-top: 10%;
  margin-bottom: 5%;
`

export const ConnectButton = styled.button`
  color: white;
  background-color: rgba(236, 54, 110, 1);
  border: none;
  padding: 15px;
  font-size: 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.4s;
  margin-bottom: 15px;
  width: 100%;
  &:hover {
    background-color: rgba(245, 177, 97, 1);
    color: white;
  }
`

const Span = styled.span`
  font-size: 20px;
  color: white;
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    color: rgba(236, 54, 110, 1);
  }
`

const Home: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { active, activate } = useWeb3React()
  const connectToWallet = async () => {
    try {
      await activate(injected)
    } catch (err) {
      console.log(err)
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  return (
    <div>
      <Head>
        <title>Currency Converter</title>
        <meta name="description" content="Convert NEP to BUSD" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>NEPTUNE MUTUAL CURRENCY CONVERTER</Header>
      <Container>
        <Form />
        {!active && (
          <ConnectButton onClick={connectToWallet}>
            Connect to Wallet
          </ConnectButton>
        )}

        {active ? (
          <Span onClick={openModal}>Check wallet details</Span>
        ) : (
          <Span>Not connected</Span>
        )}

        <CustomModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Container>
    </div>
  )
}

export default Home
