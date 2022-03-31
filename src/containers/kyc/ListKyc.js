import { appConfigs } from "configs";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {getListKyc} from "services/kyc/manageKyc";
import { deleteKyc } from "services/kyc/manageKyc";
import toast, { Toaster } from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ListKyc = (props) => {
    const notifySuccessDelete = () => toast.success('KYC successfully deleted');
    const notifyError = () => toast.error('Cannot process delete KYC');

    const createKyc = () =>{ 
        props.history.push(`${appConfigs.rootUrl}/kyc/create-kyc/`);
    }

    const [loading, setLoading] = useState(false);
    let loadingStyle = {position: 'fixed', zIndex: 9999999999, height: '50px', float: 'center', left: 0, right: 0, margin: 'auto'}

    const [ kyc, setKyc ] = useState([]);

    useEffect(() => {
        getListKyc().then(response => {
            setKyc(response.data)
        });
    }, [setKyc])

    const handleDelete = (identity) => {
        setLoading(true);
        deleteKyc(identity).then(response => {
            setLoading(false);
            if(response.status !== 204) {
                notifyError();
            } else {
              notifySuccessDelete();
              setTimeout(() => {
                  window.location.reload();
                //   props.history.push(`${appConfigs.rootUrl}/dashboard/`);
              }, 2000);
          }
        });
    };

    const handleAction = (props, identity, action) => {
        if(action === "delete") {
            confirmAlert({
                title: 'Confirm Delete',
                message: 'Are you sure want to delete this KYC?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => handleDelete(identity)
                  },
                  {
                    label: 'No',
                    onClick: () => ""
                  }
                ]
              });
        } else if(action === "edit") {
            props.history.push(`${appConfigs.rootUrl}/kyc/edit-kyc/?identity=${identity}`)
        } else if(action ==="detail") {
            props.history.push(`${appConfigs.rootUrl}/kyc/detail-kyc/?identity=${identity}`)

        }
      };

    const columns = [
        {
            name: 'Created',
            cell: row => (
                new Date(row.created_at).toLocaleDateString("en-US")
                // row.created_at.toLocaleDateString("en-US");
            )
        },
        {
            name: 'Status',
            cell: row => (
                <>
                    {(row.status==="confirmed" ? "Confirmed" : "Not Confirmed")}
                </>
            )
        },
        {
            name: 'Actions',
            button: true,
            cell: row => (
                <>
                <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => handleAction(props, row.id, "delete")}><i class="fas fa-trash"></i></button>
                </>
            ),
            wrap: true,
            maxWidth: '300px',
            minWidth: '300px',
        },
    ];

    return ( 
        <>
        {loading &&
            <img style={loadingStyle} src={require("assets/img/loading.gif").default} alt="loading"></img>
        }
        <div className="flex flex-wrap">
            <div className="w-full lg:w-10/12 px-4">
                <div
                    className={
                    "relative flex flex-col min-w-0 break-words mb-1 w-full shadow-xs rounded bg-white"
                    }
                >
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold">KYC</h6>
                            <button
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={createKyc}
                            >
                                Upload KYC
                            </button>
                        </div>
                    </div>
                </div>
                <DataTable 
                    columns={columns}
                    data={kyc}
                    pagination
                    defaultSortFieldId={1}
                />
            </div>
            <Toaster />
        </div>
        </>
     );
}
 
export default ListKyc;