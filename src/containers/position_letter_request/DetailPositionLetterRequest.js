import { appConfigs } from "configs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { approveLetter } from "services/letter/manageLetter";
import { getDetailLetter } from "services/letter/manageLetter";
import { useQuery } from "utils/helpers/useQuery";
import FormDetailPositionLetterRequest from "./includes/FormDetailPositionLetterRequest";
import toast, { Toaster } from 'react-hot-toast';


const DetailPositionLetterRequest = (props) => {
    let query = useQuery();
    const letter = query.get('identity');
    const [ loading, setLoading ] = useState(false);
    const { register, handleSubmit, setError, reset, control, setValue } = useForm();
    const [letters, setLetter] = useState([]);

    let loadingStyle = {position: 'fixed', zIndex: 9999999999, height: '50px', float: 'center', left: 0, right: 0, margin: 'auto'}

    const notifySuccess = () => toast.success('Position Letter successfully approved');
    const notifyError = () => toast.error('Cannot proccess the Position Letter, please try again later');


    useEffect(() => {
        async function fetchLetter() {
            await getDetailLetter(letter).then(response => {
                console.log(response)
                if(response.status !== 200) {
                    notifyError();
                } else {
                    const letter = response.data;
                    setLetter(letter);
                    reset({
                        'id':letter.id,
                        'position_letter':letter.position_letter,
                        'date_start': letter.date_start,
                        'date_end': letter.date_end,
                        'active': letter.active,
                        'created_at': letter.created_at,
                        'updated_at': letter.updated_at,
                        'status': letter.status,

                    });
                }
            });
        }
        fetchLetter();
    }, [letter, reset]);

    const onApproveLetter = (data) => {
        setLoading(true);
        approveLetter(data).then(response => {
            setLoading(false);
          if(response.status !== 200) {
              notifyError();
          } else {
            notifySuccess();
            setTimeout(() => {
                props.history.push(`${appConfigs.rootUrl}/position-letter-request/`);
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
                    <h6 className="text-blueGray-700 text-xl font-bold">Detail Letter</h6>
                </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <FormDetailPositionLetterRequest
                    item={letters}
                    register={register}
                    setValue={setValue}
                    setError={setError}
                    loading={loading}
                    control={control}
                    handleSubmit={handleSubmit(onApproveLetter)}
                    action="create"
                />
            </div>
            <Toaster />
        </div>
        </>
    );
};

export default DetailPositionLetterRequest;