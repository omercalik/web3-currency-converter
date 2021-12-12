import React, { useState } from "react"
import { CgArrowsExchangeAltV } from "react-icons/cg"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledInput = styled.input`
  width: 300px;
  padding: 14px;
  margin-bottom: 15px;
  border: none;
  border-radius: 6px;
  font-size: 18px;
`

const Label = styled.label`
  color: white;
  font-size: 20px;
  margin-bottom: 10px;
`

const Form = () => {
  const [baseCurrency, setBaseCurrency] = useState<"NEP" | "BUSD">("NEP")
  const [convertedCurrency, setConvertedCurrency] = useState<"NEP" | "BUSD">(
    "BUSD"
  )
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState(0)
  const [convertedCurrencyAmount, setConvertedCurrencyAmount] = useState(0)

  Number.prototype.toFixedNumber = function (digits: number, base: number) {
    var pow = Math.pow(base || 10, digits)
    //@ts-ignore
    return Math.round(this * pow) / pow
  }

  const handleBaseCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let amount = parseFloat(e.target.value)

    setBaseCurrencyAmount(amount)
    baseCurrency === "NEP"
      ? setConvertedCurrencyAmount((amount * 3).toFixedNumber(2))
      : setConvertedCurrencyAmount((amount / 3).toFixedNumber(2))
  }

  const changeBaseCurrency = () => {
    setBaseCurrency(baseCurrency === "NEP" ? "BUSD" : "NEP")
    setConvertedCurrency(convertedCurrency === "NEP" ? "BUSD" : "NEP")
    setBaseCurrencyAmount(convertedCurrencyAmount)
    setConvertedCurrencyAmount(baseCurrencyAmount)
  }

  return (
    <Container>
      <Label>{baseCurrency}</Label>
      <StyledInput
        onChange={handleBaseCurrencyChange}
        type="number"
        value={baseCurrencyAmount}
      />
      <CgArrowsExchangeAltV
        onClick={changeBaseCurrency}
        style={{
          color: "white",
          fontSize: "50px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      />
      <Label>{convertedCurrency}</Label>
      <StyledInput
        readOnly={true}
        type="number"
        value={convertedCurrencyAmount}
      />
    </Container>
  )
}

export default Form
