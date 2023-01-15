import { Routes, Route, Link } from 'react-router-dom'

import { Cats } from './components/Cats'
import { Dogs } from './components/Dogs'
import { Users } from './components/Users'
import { Clients } from './components/Clients'
import { Login } from './components/Login'
import { CreateClient } from './components/NewClient'
import React from 'react'

const Menu : React.FC<{}> = () => {
  return (<div>
        <ul>
        <li>
          <Link to='/cats'>Cats</Link>
        </li>
        <li>
          <Link to='/dogs'>Dogs</Link>
        </li>
        <li>
          <Link to='/users'>Users</Link>
        </li>
        <li>
          <Link to='/clients'>Clients</Link>
        </li>

      </ul>
      <hr />
  </div>)
}

type props = {
  title : string
}
const Layout : React.FC<React.PropsWithChildren<props>> = ({ title, children }) => {
  return (
    <div>
      {title}
      <Menu />
      <div className="body">
        {children}
      </div>
    </div>
  )
}

export const Main = () => {
 return (
  <Routes>
  <Route path='/' element={<Login/>} />
  <Route path='/cats' element={
    <Layout title='cats'>
      <Cats/>
    </Layout>
  } />
  <Route path='/dogs' element={
   <Layout title='dogs'>
   <Dogs/>
 </Layout>
  } />
  <Route path='/users' element={
   <Layout title='users'>
   <Users />
 </Layout>
  } />
  <Route path='/clients' element={
   <Layout title='clients'>
   <Clients/>
 </Layout>
  } />
  <Route path='/newClient' element={
   <Layout title='newClient'>
   <CreateClient/>
 </Layout>
  } />
</Routes>
 )
}