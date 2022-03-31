import { useForm } from "react-hook-form";
import { Button, Col, FormGroup, Input, Label } from "reactstrap";
import { setErrorValidation } from "utils/helpers/commons";
import { withRouter } from 'react-router-dom';
import { alertNotification } from "utils/helpers/alertNotifications";
import { appConfigs } from "configs";
import { postLetter } from "services/letter/manageLetter";


const CardLetter = (props) => {
    const { register, errors, handleSubmit, setError } = useForm();

    const onSubmitLetter = (data) => {
        // dispatch(loginProcess());
        postLetter(data).then(response => {
          console.log(data);
          console.log(response);
          if(response.status !== 201) {
            //   dispatch(loginFailed(response?.data.message));
              setErrorValidation(response, setError);
          } else {
            //   dispatch(loginSuccess(response.data));
            alertNotification(
                'success',
                'Position Letter has been submitted, please wait for our review',
                'Success',
                3000
            )
            setTimeout(() => {
                props.history.push(`${appConfigs.rootUrl}/dashboard/`);
            }, 2000);
        }
        });
      };

    return ( 
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">Position Letter</h6>
                </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit(onSubmitLetter)} >
                    <div className="flex mt-6 flex-wrap">

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3">
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="position" sm={2}>Position</Label>
                            <Col sm={10}>
                            <Input 
                                type="select" 
                                name="position" 
                                innerRef={register}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                id="position">
                                <option>--- Choose Position ---</option>
                                <option value="1">Dosen</option>
                            </Input>
                            {errors.position && <div className="invalid-feedback d-block">{errors.position.message}</div>}
                            </Col>
                        </FormGroup>
                    </div>
                    
                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="position_letter">
                            Position Letter (Surat Tugas .PDF)
                            </Label>
                            <Input name="position_letter" 
                            type="file"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            innerRef={register}/>
                            {errors.position_letter && <div className="invalid-feedback d-block">{errors.position_letter.message}</div>}
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="date_start">
                            Date Start
                            </Label>
                            <Input name="date_start" 
                            type="date"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            innerRef={register}/>
                            {errors.date_start && <div className="invalid-feedback d-block">{errors.date_start.message}</div>}
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="date_end">
                            Date End
                            </Label>
                            <Input name="date_end" 
                            type="date"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            innerRef={register}/>
                            {errors.date_end && <div className="invalid-feedback d-block">{errors.date_end.message}</div>}
                        </FormGroup>
                    </div>

                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" /> <br />

                    <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4">
                        <Button 
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        >
                        <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                        </span>
                        <span className="label">Save Letter</span>
                        </Button>
                    </div>
                    </div>
                </form>
                </div>
            </div>
        </>
     );
}
 
export default withRouter(CardLetter);