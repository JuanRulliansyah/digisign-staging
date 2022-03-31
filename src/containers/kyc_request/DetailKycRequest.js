import { appConfigs } from "configs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { approveKyc } from "services/kyc/manageKyc";
import { getDetailKyc } from "services/kyc/manageKyc";
import { alertNotification } from "utils/helpers/alertNotifications";
import { useQuery } from "utils/helpers/useQuery";
import toast, { Toaster } from 'react-hot-toast';
import FormDetailKycRequest from "./includes/FormDetailKycRequest";


const DetailKycRequest = (props) => {
    let query = useQuery();
    const kyc = query.get('identity');

    const notifySuccess = () => toast.success('KYC successfully approved');
    const notifyError = () => toast.error('Cannot proccess the KYC, please try again later');

    const [ loading, setLoading ] = useState(false);
    const { register, handleSubmit, setError, reset, control, setValue } = useForm();
    const [kycs, setKyc] = useState([]);

    let loadingStyle = {position: 'fixed', zIndex: 9999999999, height: '50px', float: 'center', left: 0, right: 0, margin: 'auto'}

    useEffect(() => {
        async function fetchKyc() {
            await getDetailKyc(kyc).then(response => {
                if(response.status !== 200) {
                    alertNotification(
                        'error',
                        response.data.message,
                        'Error',
                        3000
                    )
                } else {
                    const kyc = response.data;
                    console.log(kyc);
                    setKyc(kyc);
                    reset({
                        'id':kyc.id,
                        'identity_number': kyc.identity_number,
                        'gender': kyc.gender,
                        'place_of_birth': kyc.place_of_birth,
                        'date_of_birth': kyc.date_of_birth,
                        'province': kyc.province,
                        'city': kyc.city,
                        'district': kyc.district,
                        'sub_district': kyc.sub_district,
                        'address': kyc.address,
                        'identity_file': kyc.identity_file,
                        'face_file': kyc.face_file,
                        'selfie_file': kyc.selfie_file,
                        'signature_file': kyc.signature_file,
                        'created_at': kyc.created_at,
                        'updated_at': kyc.updated_at,
                        'postal_code': kyc.postal_code,
                        'status': kyc.status,
                        'notes': kyc.notes,
                        'active': kyc.active,
                        'username': kyc.user.username,
                        'email': kyc.user.email,
                        'type': kyc.user.type
                    });
                }
            });
        }
        fetchKyc();
    }, [kyc, reset]);

    const onApproveKyc = (data) => {
        setLoading(true);
        approveKyc(data).then(response => {
            setLoading(false);
            if(response.status !== 200) {
                notifyError();
            } else {
                notifySuccess();
                setTimeout(() => {
                    props.history.push(`${appConfigs.rootUrl}/kyc-request/`);
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
                    <h6 className="text-blueGray-700 text-xl font-bold">Detail KYC</h6>
                </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <FormDetailKycRequest
                    item={kycs}
                    register={register}
                    setValue={setValue}
                    setError={setError}
                    loading={loading}
                    control={control}
                    handleSubmit={handleSubmit(onApproveKyc)}
                    action="create"
                />
            </div>
            <Toaster />
        </div>
        </>
    );
};

export default DetailKycRequest;