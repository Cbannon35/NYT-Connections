import { useState, useEffect } from 'react'
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements, useNavigate } from 'react-router-dom';
import Header from './components/Header'
import Game from './components/Game'
import SplashScreen from './components/SplashScreen';
import Profile from './components/Profile';
import Calendar from './components/Calendar';

const myDate = new Date();
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
const formattedDate = formatDate(myDate);

const END_DATE = "2023-06-12";
function createCalendar(date) {
  const calendar = [];
  let currentDate = date;
  const endDate = new Date(END_DATE);
  while (currentDate >= endDate) {
    calendar.push(
      formatDate(currentDate)
    );
    currentDate.setDate(currentDate.getDate() - 1);
  }
  return calendar;
}

const calendar = createCalendar(myDate);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<SplashScreen />} />
      <Route path="profile" element={<Profile />} />
      <Route path="games" element={<Calendar calendar={calendar} />} />
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
