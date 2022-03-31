import React from "react";
import { createPopper } from "@popperjs/core/lib/createPopper";
import { appConfigs } from "configs";
import { deleteLetter } from "services/letter/manageLetter";
import { alertNotification } from "utils/helpers/alertNotifications";

const DataListLetter = (props) => {

    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);

    const createLetter = () =>{ 
        props.history.push(`${appConfigs.rootUrl}/position-letter/create-letter/`);
      }

    const handleAction = (identity, action) => {
        if(action === "delete") {
            deleteLetter(identity).then(response => {
                if(response.status === 204) {
                    alertNotification(
                        'success',
                        'Position Letter has been deleted',
                        'Success',
                        3000
                    )
                    setTimeout(() => {
                        props.history.push(`${appConfigs.rootUrl}/dashboard/`);
                    }, 2000);
                }
            });
        } else {
            props.history.push(`${appConfigs.rootUrl}/position-letter/edit-letter/?identity=${identity}`)
        }
    };

    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();

    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "left-start",
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
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
                    <h6 className="text-blueGray-700 text-xl font-bold">Position Letter</h6>
                    <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={createLetter}
                    >
                        Upload Position Letter
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
                        File
                        </th>
                        <th
                        className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        >
                        Status
                        </th>
                        <th
                        className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        ></th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.letters && props.letters.map((letter, index) => {
                        const position_letter = /[^/]*$/.exec(letter.position_letter)[0];
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
                                    {position_letter}
                                </span>
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {letter.status}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                    <a
                                        className="text-blueGray-500 py-1 px-3"
                                        href="#pablo"
                                        ref={btnDropdownRef}
                                        onClick={(e) => {
                                        e.preventDefault();
                                        dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                                        }}
                                    >
                                        <i className="fas fa-ellipsis-v"></i>
                                    </a>
                                <div
                                    ref={popoverDropdownRef}
                                    className={
                                    (dropdownPopoverShow ? "block " : "hidden ") +
                                    "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                    }
                                >
                                    <a
                                    className={
                                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                    }
                                    onClick={() => {
                                        handleAction(letter.id, "edit");
                                    }}                                    >
                                    Edit
                                    </a>
                                    <a
                                    href="#"
                                    className={
                                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                    }
                                    onClick={() => {
                                        handleAction(letter.id, "delete");
                                    }}
                                    >
                                    Delete
                                    </a>
                                </div>
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
export default DataListLetter;