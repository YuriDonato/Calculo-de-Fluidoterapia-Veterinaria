import styled, { createGlobalStyle } from 'styled-components'

export const cores = {
  preta: '#111',
  branca: '#fff',
  amarelo: '#FFCC00',
  pretaOpacity: 'rgba(0, 0, 0, 0.5)',
  cinza: '#8a8a8a'
}

export const texto = {
  pequeno: '0.8em',
  padrao: '1em',
  grande: '1.2em',
  muitoGrande: '1.5em',
  enrome: '2em'
}

export const GlobalCss = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    // font-family: 'IM Fell DW Pica', serif;
    color: ${cores.preta};
  }

  body {
    background-color: ${cores.cinza};
  }
`

export const MainCard = styled.div`
  margin: 0 auto 0 auto;
  color: black;
  padding: 1rem;
  background-color: white;
  max-width: 600px;
  display: block;
  // border-bottom-right-radius: 2rem;
  // border-bottom-left-radius: 2rem;
`

export const Container = styled(MainCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const Title = styled.h2`
  display: block;
  font-size: ${texto.grande};
  // font-family: 'Cinzel Decorative', serif;
  color: ${cores.preta};
  margin-bottom: 1rem;
`
