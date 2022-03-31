import { appConfigs } from "configs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
// import { setErrorValidation } from "utils/helpers/commons";
import FormCertificate from "./includes/FormCertificate";
import { postCertificate } from "services/certificate/manageCertificate";


// components

const CreateCertificate = (props) => {
    const [loading, setLoading] = useState(false);
    const { register, errors, handleSubmit, setValue, setError, clearErrors, control } = useForm();
    const notifySuccess = () => toast.success('Certificate successfully created');
    const notifyError = () => toast.error('Cannot proccess the Certificate, please try again later');

    let loadingStyle = {position: 'fixed', zIndex: 9999999999, height: '50px', float: 'center', left: 0, right: 0, margin: 'auto'}

    const onSubmitCertificate = (data) => {
        setLoading(true);
        postCertificate(data).then(response => {
            setLoading(false);
          if(response.status !== 201) {
              notifyError();
          } else {
            notifySuccess();
            setTimeout(() => {
                props.history.push(`${appConfigs.rootUrl}/certificate/`);
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
                    <h6 className="text-blueGray-700 text-xl font-bold">Certificate</h6>
                </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <FormCertificate
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    setError={setError}
                    clearErrors={clearErrors}
                    control={control}
                    handleSubmit={handleSubmit(onSubmitCertificate)}
                    action="create"
                />
                <Toaster />
            </div>
        </div>
        </>
     );
}
 
export default CreateCertificate;