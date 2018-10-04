import React from 'react'
import AccountForm from '../../components/AccountForm'

export default function LoginForm ({ navigate }) {
  return <AccountForm loginOnly navigate={navigate} />
}
