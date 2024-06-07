import React, { Component, ReactNode } from "react";
import { Login, Register, Home } from "./components";
import { Route, Routes } from "react-router-dom";
import NavigationModule from "../dashboard/modules/navigation/navigation.module";

class AuthModule extends Component {

    render(): ReactNode {
        return (
            <>
            <NavigationModule></NavigationModule>
                <Routes>
                    <Route path="*" Component={Home}></Route>
                    <Route path="/" Component={Home}></Route>
                    <Route path="/login" Component={Login}></Route>
                    <Route path="/register" Component={Register}></Route>
                </Routes>
            </>
        )
    }

}

export default AuthModule