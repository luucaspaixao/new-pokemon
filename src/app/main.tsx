import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PokemonPage } from './pages/Pokemon'
import { GlobalStyle, PokeballBg } from './styles/global'
import bgPokeball from '../assets/bg-pokeball.png'
import { Index } from './pages/Index'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <PokeballBg src={bgPokeball}/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
