import { appConfigs } from "configs";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { deleteKyc } from "services/kyc/manageKyc";
import { getListGeneralLeter } from "services/letter/manageLetter";
import { alertNotification } from "utils/helpers/alertNotifications";


const ListPositionLetterRequest = (props) => {
      const [ letters, setLetter ] = useState([]);

    useEffect(() => {
        getListGeneralLeter().then(response => {
            setLetter(response.data)
        });
    }, [setLetter])

    const handleAction = (props, identity, action) => {
        if(action === "delete") {
            deleteKyc(identity).then(response => {
                if(response.status === 204) {
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
            props.history.push(`${appConfigs.rootUrl}/kyc-request/edit-kyc/?identity=${identity}`)
        } else if(action ==="detail") {
            props.history.push(`${appConfigs.rootUrl}/position-letter-request/detail-position-letter-request/?identity=${identity}`)

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
                    className="bg-yellow-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => handleAction(props, row.id, "detail")}><i class="fas fa-eye"></i></button>
                </>
            ),
            wrap: true,
            maxWidth: '300px',
            minWidth: '300px',
        },
    ];


    return ( 
        <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 px-4">
            <h6 className="text-blueGray-700 text-xl font-bold">Position Letter</h6>
            <DataTable 
                columns={columns}
                data={letters}
                pagination
                defaultSortFieldId={1}
            />
            </div>
        </div>
     );
}
 
export default ListPositionLetterRequest;