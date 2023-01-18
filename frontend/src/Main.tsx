import { Routes, Route, Link } from 'react-router-dom'

import { Cats } from './components/Cats'
import { Dogs } from './components/Dogs'
import { Users } from './components/Users'
import { Clients } from './components/Clients'
import { Login } from './components/Login'
import { CreateClient } from './components/NewClient'
import React from 'react'
import { logout } from './api/mutations'
import Logo from './assets/logo_sharenergy.png'
import { Menu } from './components/Menu'
import { ClientDetail } from './components/ClientDetail'




type props = {
  title : string
}
const Layout : React.FC<React.PropsWithChildren<props>> = ({ children }) => {
  return (
    <div className='flex flex-col justify-center w-screen h-auto bg-white'>
      <div className="flex flex-col justify-between w-full h-auto bg-white p-8 sm:p-10 sm:w-lg sm:h-auto sm:mx-auto sm:space-y-8 ">
        <div className='flex flex-col sm:flex-row justify-center'>
        <div className='sm:py-4 sm:justify-start sm:w-auto'>
        <img alt="logo" src={Logo} className="w-auto sm:w-3/6"/>
        </div>
        <div className='w-full  sm:w-3/6'>
        <Menu />
        </div>
        </div>
      

      <div className="body">
        {children}
      </div>
      </div>
    </div>
  )
}

export const Main = () => {
 return (
  <Routes>
  <Route path='/login' element={<Login/>} />

  <Route path='/' element={
   <Layout title='users'>
   <Users />
 </Layout>
  } />
  <Route path='/users' element={
   <Layout title='users'>
   <Users />
 </Layout>
  } />
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
   <Route path='/clients/detail' element={
      <Layout title='clientDetail'>
      <ClientDetail />
    </Layout>
  } />
</Routes>
 )
}