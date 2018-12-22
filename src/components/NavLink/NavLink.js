import React from 'react'
import { Link } from '@reach/router'

const NavLink = props => {
  const {
    className,
    ...restOfTheProps
  } = props

  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: 'active ' + className } : { className }
  }

  return <Link getProps={isActive} {...restOfTheProps} />
}

export default NavLink
