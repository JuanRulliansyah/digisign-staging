import { useEffect, useState } from "react";
import {getListLetter} from "services/letter/manageLetter";
import { deleteLetter } from "services/letter/manageLetter";
import { appConfigs } from "configs";
import DataTable from "react-data-table-component";
import toast, { Toaster } from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const ListLetter = (props) => {
    const notifySuccessDelete = () => toast.success('Position Letter successfully deleted');
    const notifyError = () => toast.error('Cannot process delete Position Letter');

    const [loading, setLoading] = useState(false);
    let loadingStyle = {position: 'fixed', zIndex: 9999999999, height: '50px', float: 'center', left: 0, right: 0, margin: 'auto'}

    const createLetter = () =>{ 
        props.history.push(`${appConfigs.rootUrl}/position-letter/create-position-letter/`);
      }

    const [ letters, setLetter ] = useState([]);

    const handleDelete = (identity) => {
        setLoading(true);
        deleteLetter(identity).then(response => {
            setLoading(false);
            if(response.status !== 204) {
                notifyError();
            } else {
              notifySuccessDelete();
              setTimeout(() => {
                  window.location.reload();
              }, 2000);
          }
        });
    };

    const handleAction = (props, identity, action) => {
        if(action === "delete") {
            confirmAlert({
                title: 'Confirm Delete',
                message: 'Are you sure want to delete this Position Letter?',
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
            props.history.push(`${appConfigs.rootUrl}/position-letter/edit-position-letter/?identity=${identity}`)
        } else if(action ==="detail") {
            props.history.push(`${appConfigs.rootUrl}/position-letter/detail-position-letter/?identity=${identity}`)

        }
      };

    const columns = [
        {
            name: 'Created',
            cell: row => (
                new Date(row.created_at).toLocaleDateString("en-US")
            )
        },
        {
            name: 'Status',
            cell: row => (
                <>  
                    {(row.status==="usable" ? "Usable" : "Not Usable")}
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

    useEffect(() => {
        getListLetter().then(response => {
            setLetter(response.data)
        });
    }, [setLetter])


    return ( 
        <>
        {loading &&
            <img style={loadingStyle} src={require("assets/img/loading.gif").default} alt="loading"></img>
        }
        <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 px-4">
                <div
                        className={
                        "relative flex flex-col min-w-0 break-words mb-1 w-full shadow-xs rounded bg-white"
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
                                    Create Position Letter
                                </button>
                            </div>
                        </div>
                    </div>
                    <DataTable 
                        columns={columns}
                        data={letters}
                        pagination
                        defaultSortFieldId={1}
                    />
                    <Toaster />
            </div>
        </div>
        </>
     );
}
 
export default ListLetter;