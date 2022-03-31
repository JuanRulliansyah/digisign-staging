import { useForm } from "react-hook-form";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { setErrorValidation } from "utils/helpers/commons";
import { withRouter } from 'react-router-dom';
import { alertNotification } from "utils/helpers/alertNotifications";
import { appConfigs } from "configs";
import { postCertificate } from "services/certificate/manageCertificate";


const CardCertificate = (props) => {

    const { register, errors, handleSubmit, setError } = useForm();

    const onSubmitCertificate = (data) => {
        postCertificate(data).then(response => {
          console.log(data);
          console.log(response);
          if(response.status !== 201) {
              setErrorValidation(response, setError);
          } else {
            alertNotification(
                'success',
                'Certificate has been generated',
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
                    <h6 className="text-blueGray-700 text-xl font-bold">Certificate</h6>
                </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit(onSubmitCertificate)} >
                    <div className="flex mt-6 flex-wrap">

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="identity_number">
                            Insert Certificate Password
                            </Label>
                            <Input name="password" 
                            type="password"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Password"
                            innerRef={register}/>
                            {errors.password && <div className="invalid-feedback d-block">{errors.password.message}</div>}
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="identity_number">
                            Confirm Password
                            </Label>
                            <Input name="password" 
                            type="password"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Confirm Password"
                            innerRef={register}/>
                            {errors.password && <div className="invalid-feedback d-block">{errors.password.message}</div>}
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
                        <span className="label">Generate Certificate</span>
                        </Button>
                    </div>
                    </div>
                </form>
                </div>
            </div>
            <br/><br/><br/><br/>
        </>
     );
}
 
export default withRouter(CardCertificate);