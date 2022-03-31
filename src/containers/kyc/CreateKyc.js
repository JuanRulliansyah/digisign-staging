import { appConfigs } from "configs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { postKyc } from "services/kyc/manageKyc";
import toast, { Toaster } from 'react-hot-toast';
import FormKyc from "./includes/FormKyc";


const CreateKyc = (props) => {
    const [ loading, setLoading ] = useState(false);
    const { register, errors, handleSubmit, setValue, setError, clearErrors, control } = useForm();

    const notifySuccess = () => toast.success('Document successfully created');
    const notifyError = () => toast.error('Cannot proccess the Document, please try again later');
    const notifyExists = () => toast.error('You already have a registered KYC');

    let loadingStyle = {position: 'fixed', zIndex: 9999999999, height: '50px', float: 'center', left: 0, right: 0, margin: 'auto'}

    const onSubmitKyc = (data) => {
        setLoading(true);
        postKyc(data).then(response => {
            setLoading(false);
            if(response.status === 400 && data && data.message === "User profile has been registered before") {
                notifyError();
                console.log(response.status);
            } else if(response.status === 400) {
                notifyExists();
            } else if(response.status === 201) {
                notifySuccess();
                setTimeout(() => {
                    props.history.push(`${appConfigs.rootUrl}/kyc/`);
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
                    <h6 className="text-blueGray-700 text-xl font-bold">KYC Form</h6>
                </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <FormKyc
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        setError={setError}
                        clearErrors={clearErrors}
                        loading={loading}
                        control={control}
                        handleSubmit={handleSubmit(onSubmitKyc)}
                        action="create"
                    />
                </div>
            </div>
            <div>
                <div>
            {/* <CardKyc /> */}
            </div>
            <Toaster />
        </div>
        </>
     );
}
 
export default CreateKyc;