import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.sass'

export const Header = () => (
  <div className={classes.header}>
    <h1>MyScaffold</h1>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      Home
    </IndexLink>
    <IndexLink to='/demo' activeClassName={classes.activeRoute}>
      Demo
    </IndexLink>
  </div>
)

export default Header
