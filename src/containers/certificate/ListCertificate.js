import { appConfigs } from "configs";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getListCertificate } from "services/certificate/manageCertificate";
import { deleteCertificate } from "services/certificate/manageCertificate";
import toast, { Toaster } from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';




const ListCertificate = (props) => {
    const notifySuccessDelete = () => toast.success('Certificate successfully deleted');
    const notifyError = () => toast.error('Cannot process delete');

    const [loading, setLoading] = useState(false);
    let loadingStyle = {position: 'fixed', zIndex: 9999999999, height: '50px', float: 'center', left: 0, right: 0, margin: 'auto'}

    const createCertificate = () =>{ 
        props.history.push(`${appConfigs.rootUrl}/certificate/create-certificate/`);
      }

    const [ certificates, setCertificate ] = useState([]);

    useEffect(() => {
        getListCertificate().then(response => {
            if(response && response.status === 200) {
                setCertificate(response.data)
            } else {
                notifyError();
            }
        });
    }, [setCertificate])

    const handleDelete = (identity) => {
        setLoading(true);
        deleteCertificate(identity).then(response => {
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
    }

    const handleAction = (props, identity, action) => {
        if(action === "delete") {
            confirmAlert({
                title: 'Confirm Delete',
                message: 'Are you sure want to delete this Certificate?',
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
            props.history.push(`${appConfigs.rootUrl}/certificate/edit-certificate/?identity=${identity}`)
        } else if(action ==="detail") {
            props.history.push(`${appConfigs.rootUrl}/certificate/detail-certificate/?identity=${identity}`)

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
                                <h6 className="text-blueGray-700 text-xl font-bold">Certificate</h6>
                                <button
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={createCertificate}
                                >
                                    Create Certificate
                                </button>
                            </div>
                        </div>
                    </div>
                    {certificates && <DataTable 
                        columns={columns}
                        data={certificates}
                        pagination
                        defaultSortFieldId={1}
                    />}
                </div>
                <Toaster />
            </div>
        </>
     );
}
 
export default ListCertificate;