import React, { useState } from "react"
import styled from "styled-components"
import Modal from "react-modal"
import { useWeb3React } from "@web3-react/core"
import Web3 from "web3"
import { ConnectButton } from "../pages"

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isModalOpen: boolean
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "700px",
  },
}

const Header = styled.h1`
  text-align: center;
`

const ModalContentContainer = styled.div``

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  margin-bottom: 15px;
`

const DetailText = styled.p`
  font-size: 15px;
  padding: 10px;
`

const CustomModal = ({ setIsModalOpen, isModalOpen }: Props) => {
  const { account, chainId, deactivate } = useWeb3React()

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const disconnectFromWallet = async () => {
    try {
      deactivate()
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = () => {
    disconnectFromWallet()
    closeModal()
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <ModalContentContainer>
        <Header>Wallet Details</Header>
        <DetailRow>
          <DetailText>Account</DetailText>
          <DetailText>{account}</DetailText>
        </DetailRow>
        <DetailRow>
          <DetailText>Chain ID</DetailText>
          <DetailText>{chainId}</DetailText>
        </DetailRow>

        <ConnectButton onClick={handleClick}>Disconnect</ConnectButton>
      </ModalContentContainer>
    </Modal>
  )
}

export default CustomModal
