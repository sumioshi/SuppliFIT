import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: #0a0a0a;
    color: #ffffff;
    line-height: 1.6;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #1a1a1a;
  }

  ::-webkit-scrollbar-thumb {
    background: #4a90e2;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #357abd;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  a {
    color: #4a90e2;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #357abd;
    }
  }

  button {
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  input, textarea, select {
    font-family: 'Inter', sans-serif;
    background: #1a1a1a;
    border: 1px solid #333;
    color: #fff;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #4a90e2;
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    }
  }

  .gradient-text {
    background: linear-gradient(90deg, #4a90e2, #357abd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .gradient-border {
    position: relative;
    border: none;
    background: linear-gradient(90deg, #4a90e2, #357abd);
    padding: 2px;
    border-radius: 8px;
  }

  .gradient-border > * {
    background: #1a1a1a;
    border-radius: 6px;
  }
`;

export default GlobalStyles; 