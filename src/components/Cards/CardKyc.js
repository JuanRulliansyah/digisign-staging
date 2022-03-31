import { useForm } from "react-hook-form";
import { Button, Col, FormGroup, Input, Label } from "reactstrap";
import { postKyc } from "services/kyc/manageKyc";
import { setErrorValidation } from "utils/helpers/commons";
import { withRouter } from 'react-router-dom';
import { alertNotification } from "utils/helpers/alertNotifications";
import { appConfigs } from "configs";


const CardKyc = (props) => {
    const { register, errors, handleSubmit, setError } = useForm();

    const onSubmitKyc = (data) => {
        // dispatch(loginProcess());
        postKyc(data).then(response => {
          console.log(data);
          console.log(response);
          if(response.status !== 201) {
            //   dispatch(loginFailed(response?.data.message));
              setErrorValidation(response, setError);
          } else {
            //   dispatch(loginSuccess(response.data));
            alertNotification(
                'success',
                'KYC has been submitted, please wait for our review',
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
                    <h6 className="text-blueGray-700 text-xl font-bold">KYC Form</h6>
                </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit(onSubmitKyc)} >
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Personal Information
                    </h6>
                    <div className="flex flex-wrap">

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="identity_number">
                            NIK
                            </Label>
                            <Input name="identity_number" 
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="e.g 72020XXXXXXXX"
                            innerRef={register}/>
                            {errors.identity_number && <div className="invalid-feedback d-block">{errors.identity_number.message}</div>}
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="full_name">
                            Full Name
                            </Label>
                            <Input name="full_name" 
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="e.g Juan Doe"
                            innerRef={register}/>
                            {errors.full_name && <div className="invalid-feedback d-block">{errors.full_name.message}</div>}
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3">
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="gender" sm={2}>Gender</Label>
                            <Col sm={10}>
                            <Input 
                                type="select" 
                                name="gender" 
                                innerRef={register}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                id="gender">
                                <option>--- Choose Gender ---</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Input>
                            {errors.gender && <div className="invalid-feedback d-block">{errors.gender.message}</div>}
                            </Col>
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="place_of_birth">
                            Place of Birth
                            </Label>
                            <Input name="place_of_birth" 
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="e.g Jakarta"
                            innerRef={register}/>
                            {errors.place_of_birth && <div className="invalid-feedback d-block">{errors.place_of_birth.message}</div>}
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="date_of_birth">
                            Date of Birth
                            </Label>
                            <Input name="date_of_birth" 
                            type="date"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            innerRef={register}/>
                            {errors.date_of_birth && <div className="invalid-feedback d-block">{errors.date_of_birth.message}</div>}
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="province">
                            Province
                            </Label>
                            <Input name="province" 
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="e.g Jawa Barat"
                            innerRef={register}/>
                            {errors.province && <div className="invalid-feedback d-block">{errors.province.message}</div>}
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="city">
                            City
                            </Label>
                            <Input name="city" 
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="e.g 16519"
                            innerRef={register}/>
                            {errors.city && <div className="invalid-feedback d-block">{errors.city.message}</div>}
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="district">
                            District (Kecamatan)
                            </Label>
                            <Input name="district" 
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="e.g Sawangan"
                            innerRef={register}/>
                            {errors.district && <div className="invalid-feedback d-block">{errors.district.message}</div>}
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="sub_district">
                            Sub District (Kelurahan)
                            </Label>
                            <Input name="sub_district" 
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="e.g Bedahan"
                            innerRef={register}/>
                            {errors.sub_district && <div className="invalid-feedback d-block">{errors.sub_district.message}</div>}
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="postal_code">
                            Postal Code
                            </Label>
                            <Input name="postal_code" 
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="e.g 16519"
                            innerRef={register}/>
                            {errors.postal_code && <div className="invalid-feedback d-block">{errors.postal_code.message}</div>}
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="address">
                            Address
                            </Label>
                            <Input
                            type="textarea"
                            name="address" 
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            innerRef={register}>
                            </Input>
                            {errors.address && <div className="invalid-feedback d-block">{errors.address.message}</div>}
                        </FormGroup>
                    </div>
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Account Information
                    </h6>
                    <div className="flex flex-wrap">

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="email">
                            Email
                            </Label>
                            <Input name="email" 
                            type="email"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="e.g name@gmail.com"
                            innerRef={register}/>
                            {errors.email && <div className="invalid-feedback d-block">{errors.email.message}</div>}
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="phone_number">
                            Phone Number
                            </Label>
                            <Input name="phone_number" 
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="e.g 0851 56** ****"
                            innerRef={register}/>
                            {errors.email && <div className="invalid-feedback d-block">{errors.email.message}</div>}
                        </FormGroup>
                    </div>

                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Documents
                    </h6>
                    <div className="flex flex-wrap">
                    
                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="identity_file">
                            Upload E-KTP
                            </Label>
                            <Input name="identity_file" 
                            type="file"
                            accept="image/*"
                            capture
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            innerRef={register}/>
                            {errors.identity_file && <div className="invalid-feedback d-block">{errors.identity_file.message}</div>}
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="face_file">
                            Take / Upload your Face Picture
                            </Label>
                            <Input name="face_file" 
                            type="file"
                            accept="image/*"
                            capture
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            innerRef={register}/>
                            {errors.face_file && <div className="invalid-feedback d-block">{errors.face_file.message}</div>}
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="selfie_file">
                            Take / Upload your Selfie with E-KTP
                            </Label>
                            <Input name="selfie_file" 
                            type="file"
                            accept="image/*"
                            capture
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            innerRef={register}/>
                            {errors.selfie_file && <div className="invalid-feedback d-block">{errors.selfie_file.message}</div>}
                        </FormGroup>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="signature_file">
                            Upload your Signature
                            </Label>
                            <Input name="signature_file" 
                            type="file"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            innerRef={register}/>
                            {errors.signature_file && <div className="invalid-feedback d-block">{errors.signature_file.message}</div>}
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
                        <span className="label">Save KYC</span>
                        </Button>
                    </div>
                    </div>
                </form>
                </div>
            </div>
        </>
     );
}
 
export default withRouter(CardKyc);