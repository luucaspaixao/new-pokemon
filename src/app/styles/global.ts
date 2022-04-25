import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;

    @media (max-width: 1120px) {
      font-size: 93.75%
    }

    @media (max-width: 800px) {
      font-size: 87.50%
    }
  }

  button {
    cursor: pointer;
  }

  body {
    background-color: #f4f8fd;
  }
`

export const PokeballBg = styled.img`
  position: absolute;
  top: -10rem;
  left: -10rem;
  filter: grayscale(1);
  width: 500px;
  height: 500px;
  z-index: -1;
  opacity: .1;
`

