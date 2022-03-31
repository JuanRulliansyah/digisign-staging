import React from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import { logoutUser } from "modules/redux/actions";
import { LocalStorageService } from "utils/storage";
import { deleteDocument } from "services/document/manageDocument";
import { alertNotification } from "utils/helpers/alertNotifications";
import { appConfigs } from "configs";


const ListDropdown = (props) => {

  const localStorage = LocalStorageService.getService();
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

  const handleAction = (identity, action) => {
    if(action === "delete") {
        deleteDocument(identity).then(response => {
            if(response.status == 204) {
                alertNotification(
                    'success',
                    'Success Deleted',
                    'Success',
                    3000
                )
                setTimeout(() => {
                    props.history.push(`${appConfigs.rootUrl}/dashboard/`);
                }, 2000);
            }
        });
    } else if(action === "edit") {
        props.history.push(`${appConfigs.rootUrl}/${props.path}/edit-${props.path}/?identity=${identity}`)
    } else {
      props.history.push(`${appConfigs.rootUrl}/${props.path}/${props.extra_path}/?identity=${identity}`)
    }
  };

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
        <div className="items-center flex">
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => handleAction(props.identity, "edit")}
        >
          Edit
        </a>
        {props.detail === true &&
          <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => handleAction(props.identity, "edit")}
          >
            Edit
          </a>
        }
          
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
            onClick={(e) => handleAction(props.identity, "delete")}
          >
            Delete
          </a>
      </div>
    </>
  );
};

export default ListDropdown;
