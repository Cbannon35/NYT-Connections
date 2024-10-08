import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import Header from './components/Header'
import Game from './components/Game'
import SplashScreen from './components/SplashScreen';
import Profile from './components/Profile';
import Calendar from './components/Calendar';
import { Analytics } from "@vercel/analytics/react"
import Test from './components/Test';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<SplashScreen />} />
      <Route path="profile" element={<Profile />} />
      <Route path="games" element={<Calendar />} />
      <Route path="test" element={<Test />} />
      <Route path=":date" element={<Game />} />
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  )
}

export default App
