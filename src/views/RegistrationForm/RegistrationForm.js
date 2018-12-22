import React from 'react'
import AccountFrom from '../../components/AccountForm'

export default function RegistrationForm ({ navigate, setUser }) {
  return (
    <AccountFrom navigate={navigate} setUser={setUser} />
  )
}
