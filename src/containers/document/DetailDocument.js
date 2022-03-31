import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getDetailDocument } from "services/document/manageDocument";
import { signDocument } from "services/sign/manageSign";
import { alertNotification } from "utils/helpers/alertNotifications";
import { useQuery } from "utils/helpers/useQuery";
import FormDetailDocument from "./includes/FormDetailDocument";
import toast, { Toaster } from 'react-hot-toast';

const DetailDocument = (props) => {
    let query = useQuery();

    let loadingStyle = {position: 'fixed', zIndex: 9999999999, height: '50px', float: 'center', left: 0, right: 0, margin: 'auto'}

    const document = query.get('identity');
    const type = query.get('type');
    
    const [ loading, setLoading ] = useState(false);
    const { register, handleSubmit, setError, reset, control, setValue } = useForm();
    const [documents, setDocuments] = useState([]);

    const notifySuccess = () => toast.success('Document successfully signed');
    const notifyError = () => toast.error('Cannot sign the Document, please try again later');

    useEffect(() => {
        async function fetchDocument() {
            await getDetailDocument(document).then(response => {
                if(response.status !== 200) {
                    alertNotification(
                        'error',
                        response.data.message,
                        'Error',
                        3000
                    )
                } else {
                    const document = response.data;
                    setDocuments(document);
                    reset({
                        'document_id': document.id,
                        'username': document.username,
                        'name': document.name,
                        'document': document.document,
                        'ref_number': document.ref_number,
                        'kd_tema': document.kd_tema,
                        'document_date': document.document_date,
                        'subject': document.subject,
                        'message': document.message,
                        'created_at': document.created_at,
                        'pdf_url': document.pdf_url,
                        'status': document.status
                    });
                }
            });
        }
        fetchDocument();
    }, [document, reset]);

    const onSignDocument = (data) => {
        setLoading(true);
        signDocument(data).then(response => {
          if(response.status !== 200) {
            notifyError();
            setLoading(false);
          } else {
            notifySuccess();
            setLoading(false);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
        });
    };

    return (
        <>
            {loading && 
                <img style={loadingStyle} src={require("assets/img/loading.gif").default} alt="loading"></img>
            }
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Detail Document</h6>
                    </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <FormDetailDocument
                        item={documents}
                        register={register}
                        setValue={setValue}
                        setError={setError}
                        loading={loading}
                        control={control}
                        handleSubmit={handleSubmit(onSignDocument)}
                        type={type}
                        action="create"
                    />
                </div>
                <Toaster />
            </div>
        </>
    );
};

export default DetailDocument;
