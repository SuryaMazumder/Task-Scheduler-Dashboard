import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './pages/AccountPage'
import Account from './pages/AccountPage'
import CreateTaskForm from './components/CreateTaskForm'
import FactsPage from './pages/Funfacts'
import ListTaskViews from './components/ListTaskViews'
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials=true
function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors">
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/account' element={<AccountPage />} />
            <Route path="/" element={<Account />} />
            <Route path="/create-task" element={<CreateTaskForm />} />
            <Route path='/account' element={<AccountPage />} />
            <Route path='/documentation' element={<FactsPage />} />
            <Route path='/list-tasks' element={<ListTaskViews />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App
