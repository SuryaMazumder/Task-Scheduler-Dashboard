
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Header'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './pages/AccountPage'
import Bookings from './pages/Bookings'
import Places from './pages/Places'
import PlacesPage from './pages/PlacesPage'

axios.defaults.baseURL='http://localhost:4040'
axios.defaults.withCredentials=true
function App() {

  return (

    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<IndexPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route  path='/account' element={<AccountPage/>}/>
      <Route  path='/account/bookings' element={<Bookings/>}/>
      <Route  path='/account/places' element={<PlacesPage/>}/>
      <Route  path='/account' element={<AccountPage/>}/>

      </Route>
    </Routes>
      
   


    </UserContextProvider>
  )
}

export default App
