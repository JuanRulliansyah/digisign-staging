import React, { useState } from "react";
import { createPopper } from "@popperjs/core/lib/createPopper";
import { appConfigs } from "configs";
import { alertNotification } from "utils/helpers/alertNotifications";
import { deleteDocument } from "services/document/manageDocument";
import UserDropdown from "components/Dropdowns/UserDropdown";
import { Link } from "react-router-dom";
import { postDocument } from "services/document/manageDocument";
import { setErrorValidation } from "utils/helpers/commons";

const DataListDocument = (props, color) => {

    const createDocument = () =>{ 
        props.history.push(`${appConfigs.rootUrl}/document/create-document/`);
      }

    const [error, setError] = useState([])

    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "bottom-start",
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    const handleLogout = () => {
        localStorage.clearToken();
        localStorage.clearPermissions();
        localStorage.clearModules();
    
    };

    const handleSign = (data) => {
        // dispatch(loginProcess());
        postDocument(data).then(response => {
          if(response.status !== 201) {
              setErrorValidation(response, setError);
          } else {
            alertNotification(
                'success',
                'Document has been submitted, please wait for our review',
                'Success',
                3000
            )
            setTimeout(() => {
                props.history.push(`${appConfigs.rootUrl}/dashboard/`);
            }, 2000);
        }
        });
      };
    
    return ( 
        <>
            <div
                className={
                "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
                }
            >
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">Document</h6>
                    <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={createDocument}
                    >
                        Upload Document
                    </button>
                </div>
                </div>
                <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                    <tr>
                        <th
                        className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        >
                        Document
                        </th>
                        <th
                        className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        ></th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.documents && props.documents.map((document, index) => {
                        const document_file = /[^/]*$/.exec(document.document)[0];
                        return(
                            <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                <img
                                    src={require("assets/img/pdf.png").default}
                                    className="h-12 w-12 bg-white rounded-full border"
                                    alt="..."
                                ></img>{" "}
                                <span
                                    className={
                                    "ml-3 font-bold text-blueGray-600"
                                    }
                                >
                                    {document_file}
                                </span>
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                    <UserDropdown {...props} identity={document.id} path="document" detail={false}/>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                </div>
            </div>
            </>
     );
}
export default DataListDocument;