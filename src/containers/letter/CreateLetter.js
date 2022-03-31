import { appConfigs } from "configs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { postLetter } from "services/letter/manageLetter";
import FormLetter from "./includes/FormLetter";
import toast, { Toaster } from 'react-hot-toast';

const CreateLetter = (props) => {
    const [ loading, setLoading ] = useState(false);
    const { register, errors, handleSubmit, setValue, setError, clearErrors, control } = useForm();

    let loadingStyle = {position: 'fixed', zIndex: 9999999999, height: '50px', float: 'center', left: 0, right: 0, margin: 'auto'}

    const notifySuccess = () => toast.success('Positon Letter successfully created');
    const notifyError = () => toast.error('Cannot proccess the Position Letter, please try again later');

    const onSubmitLetter = (data) => {
        setLoading(true);
        postLetter(data).then(response => {
          setLoading(false);
          if(response.status !== 201) {
              notifyError();
          } else {
            notifySuccess();
            setTimeout(() => {
                props.history.push(`${appConfigs.rootUrl}/position-letter/`);
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
                    <h6 className="text-blueGray-700 text-xl font-bold">Position Letter</h6>
                </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <FormLetter
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    setError={setError}
                    clearErrors={clearErrors}
                    loading={loading}
                    control={control}
                    handleSubmit={handleSubmit(onSubmitLetter)}
                    action="create"
                />
                <Toaster />
            </div>
        </div>
        </>
     );
}
 
export default CreateLetter;