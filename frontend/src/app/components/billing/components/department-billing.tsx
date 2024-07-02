import React, { Component, ReactNode } from "react";
import { AppState } from "../../../types/app.types";
import { ConnectedProps, connect } from 'react-redux'

class DepartmentBilling extends Component<BillingProps> {

    render(): ReactNode {
        return (
            <>
               
            </>
        )
    }

}

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = {}

const connector = connect(mapStateToProps,mapDispatchToProps)

type BillingProps = ConnectedProps<typeof connector>

export default connector(DepartmentBilling)