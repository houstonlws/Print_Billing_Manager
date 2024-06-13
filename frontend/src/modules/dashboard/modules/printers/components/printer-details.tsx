import styles from '../printers.module.css'
import React, { CSSProperties, Component, ReactNode } from "react";
import { Printer } from "../utilities/printer.model";
import {
  animated,
  Spring,
  SpringValue,
} from "@react-spring/web";

interface PrinterDetailProps {
  printer: Printer;
}

interface State {
  isOpen: boolean;
}

class PrinterDetails extends Component<PrinterDetailProps, State> {
  
    constructor(props: PrinterDetailProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render(): ReactNode {
    const { printer } = this.props!;
    const { isOpen } = this.state;

    const springProps = {
        from: { height: '0px', opacity: 0 },
        to: { height: isOpen ? '100px' : '0px', opacity: isOpen ? 1 : 0},
        config: { tension: 200, friction: 20 }
    };

    
    return (
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div>ID:<p>{printer.id}</p></div>
                  <div>Serial Number:<p>{printer.serial_number}</p></div>
                  <div>Model:<p>{printer.model}</p></div>
                  <div>Brand:<p>{printer.brand}</p></div>
                  <div>Location:<p>{printer.location}</p></div>
                </div>
                <div className="col-12 col-sm-6">
                    <div>Installation Date:<p>{printer.installation_date}</p></div>
                    <div>Warranty Expiry Date:<p>{printer.warranty_expiry_date}</p></div>
                    <div>IP Address:<p>{printer.ip_address}</p></div>
                    <div>MAC Address:<p>{printer.mac_address}</p></div>
                    <div>Firmware Version:<p>{printer.firmware_version}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      //   <div>
      //   <div onClick={this.toggleOpen} className={styles.printer_row}>
      //     <div>ID:<p>{printer.id}</p></div>
      //     <div>Serial Number:<p>{printer.serial_number}</p></div>
      //     <div>Model:<p>{printer.model}</p></div>
      //     <div>Brand:<p>{printer.brand}</p></div>
      //     <div>Location:<p>{printer.location}</p></div>
      //   </div>
      //   <Spring {...springProps}>
      //     {(props: DetailsSectionSpringProps) => (
      //       <animated.div style={props} className={styles.printer_details}>
      //         <table width={'100%'}>
      //           <tbody>
      //             <tr>
      //               <td>Installation Date:<p>{printer.installation_date}</p></td>
      //               <td>Warranty Expiry Date:<p>{printer.warranty_expiry_date}</p></td>
      //               <td>IP Address:<p>{printer.ip_address}</p></td>
      //               <td>MAC Address:<p>{printer.mac_address}</p></td>
      //               <td>Firmware Version:<p>{printer.firmware_version}</p></td>
      //             </tr>
      //           </tbody>
      //         </table>
      //       </animated.div>
      //     )}
      //   </Spring>
      // </div>
    );
  }
}

export default PrinterDetails;
