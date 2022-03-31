import { appConfigs } from "configs";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getListGeneralKyc } from "services/kyc/manageKyc";


const ListKycRequest = (props) => {
    const [ kycs, setKyc ] = useState([]);

    useEffect(() => {
        getListGeneralKyc().then(response => {
            setKyc(response.data)
        });
    }, [setKyc])

    const handleAction = (props, identity, action) => {
        if(action ==="detail") {
            props.history.push(`${appConfigs.rootUrl}/kyc-request/detail-kyc-request/?identity=${identity}`)
        }
      };

    const columns = [
        {
            name: 'Name',
            cell: row => (
                row.user.email
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
            <h6 className="text-blueGray-700 text-xl font-bold">Document</h6>
            <DataTable 
                columns={columns}
                data={kycs}
                pagination
                defaultSortFieldId={1}
            />
            </div>
        </div>
     );
}
 
export default ListKycRequest;