import { useState, useEffect } from 'react'
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements, useNavigate } from 'react-router-dom';
import Header from './components/Header'
import Game from './components/Game'
import './App.css'
import SplashScreen from './components/SplashScreen';

const myDate = new Date();
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
const formattedDate = formatDate(myDate);
console.log("Today's Date: ", formattedDate);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<SplashScreen />} />
      <Route path=":date" element={<Game />} />
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
