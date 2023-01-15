import { Routes, Route } from 'react-router-dom'

import { Cats } from './components/Cats'
import { Dogs } from './components/Dogs'
import { Users } from './components/Users'
import { Clients } from './components/Clients'
import { Login } from './components/Login'

export const Main = () => {
 return (
  <Routes>
  <Route path='/' element={<Login/>} />
  <Route path='/cats' element={<Cats/>} />
  <Route path='/dogs' element={<Dogs/>} />
  <Route path='/users' element={<Users/>} />
  <Route path='/clients' element={<Clients/>} />
</Routes>
 )
}