import React, { Component, ReactNode } from "react";
import { Container } from "react-bootstrap";
import { PrinterList } from "./components";
import { ConnectedProps, connect } from "react-redux";
import { getDepartmentPrinters, getAllPrinters } from "./utilities/printer.actions";
import { Printer } from "./utilities/printer.model";
import { AppState } from "../../../../App";

export interface PrinterState {
    loading: boolean,
    printers: Printer[]
}

class PrintersModule extends Component<PrintersModuleProps, PrinterState> {
    
    componentDidMount(): void {
        this.props.getDepartmentPrinters()
    }

    render(): ReactNode {

        const { printers, loading} = this.props!

        if(loading){
            return <div>loading</div>
            }else {
            return (
                <Container>
                    <h2>Printers for department</h2>
                    <PrinterList printers={printers}></PrinterList>
                </Container>
        )}
    }

}

const mapStateToProps = (state: AppState) => {
    return {
        loading: state.dashboard.printer.loading,
        printers: state.dashboard.printer.printers
    }
}

const mapDispatchToProps = {
    getDepartmentPrinters,
    getAllPrinters
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(PrintersModule)

type PrintersModuleProps = ConnectedProps<typeof connector>