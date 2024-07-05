import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../types/app.types'
import NavigationComponent from '../app/navigation.component'
import { Navigate, Route, Routes } from 'react-router-dom'
import homeComponent from '../app/home.component'
import registerComponent from './register.component'
import loginComponent from './login.component'

export class AuthComponent extends Component {
  render() {
    return (
        <div className='h-100'>
            <NavigationComponent></NavigationComponent>
            <Routes>
                <Route path="*" element={<Navigate to="/home" />}></Route>
                <Route path="/home" Component={homeComponent}></Route>
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