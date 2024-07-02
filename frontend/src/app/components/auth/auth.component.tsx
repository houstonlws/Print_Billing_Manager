import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../types/app.types'
import NavigationComponent from '../app/navigation.component'
import { Route, Routes } from 'react-router-dom'
import Home from '../app/home.component'
import registerComponent from './register.component'
import loginComponent from './login.component'

export class AuthComponent extends Component {
  render() {
    return (
        <div className='h-100'>
            <NavigationComponent></NavigationComponent>
            <Routes>
                <Route path="/" Component={Home}></Route>
                <Route path="/register" Component={registerComponent}></Route>
                <Route path="/login" Component={loginComponent}></Route>
            </Routes>
        </div>

    )
  }
}

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent)