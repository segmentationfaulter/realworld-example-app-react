import React from 'react'
import AccountForm from '../../components/AccountForm'

export default function LoginForm ({ navigate, setUser }) {
  return <AccountForm loginOnly navigate={navigate} setUser={setUser} />
}
