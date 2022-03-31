import { Button, Col, FormGroup, Input, Label } from "reactstrap";
import { withRouter } from 'react-router-dom';

const FormDetailKycRequest = (props) => {
    const identity_url = /[^/]*$/.exec(props.item.identity_file)[0];
    const face_url = /[^/]*$/.exec(props.item.face_file)[0];
    const selfie_url = /[^/]*$/.exec(props.item.selfie_file)[0];
    const signature_url = /[^/]*$/.exec(props.item.signature_file)[0];

    return ( 
        <>
        <div className="flex flex-wrap mt-5">
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">Identity File</p>
                    <img src={`http://localhost:8000/uploads/profile/identity/${identity_url}`} alt="identity_file"></img>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">Face File</p>
                    <img src={`http://localhost:8000/uploads/profile/face_file/${face_url}`} alt="face_file"></img>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">Selfie File</p>
                    <img src={`http://localhost:8000/uploads/profile/selfie_file/${selfie_url}`} alt="selfie_file"></img>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">Signature File</p>
                    <img src={`http://localhost:8000/uploads/profile/signature_file/${signature_url}`} alt="signature_file"></img>
                </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" /> <br />

            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">Name</p>
                    <p>{props.item.user?.name}</p>
                </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">NIM / NID</p>
                    <p>{props.item.user?.username}</p>
                </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">Email</p>
                    <p>{props.item.user?.email}</p>
                </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">Phone Number</p>
                    <p>{props.item.user?.phone_number}</p>
                </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">NIK</p>
                    <p>{props.item.identity_number}</p>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">Gender</p>
                    <p>{props.item.gender}</p>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">Place of Birth</p>
                    <p>{props.item.place_of_birth}</p>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">Date of Birth</p>
                    <p>{props.item.date_of_birth}</p>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">Province</p>
                    <p>{props.item.province}</p>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">City</p>
                    <p>{props.item.city}</p>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">District</p>
                    <p>{props.item.district}</p>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">Sub District</p>
                    <p>{props.item.identity_number}</p>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">Address</p>
                    <p>{props.item.address}</p>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">Postal Code</p>
                    <p>{props.item.postal_code}</p>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <p className="text-blueGray-700 text-md font-bold">Status</p>
                    <p>{props.item.status}</p>
                </div>
            </div>
        </div>
            <form onSubmit={props.handleSubmit} >
                <hr className="mt-6 border-b-1 border-blueGray-300" /> <br />
                <div className="w-full lg:w-6/12 px-4">
                    <FormGroup className="relative w-full mb-3">
                        <Label 
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                        for="position" sm={2}>KYC Status</Label>
                        <Col sm={10}>
                        <Input type="hidden" name="kyc_id" innerRef={props.register} value={props.item.id}></Input>
                        <Input type="hidden" name="active" innerRef={props.register} value="T"></Input>
                        <Input 
                            type="select" 
                            name="status" 
                            innerRef={props.register}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            id="position">
                            <option>--- Choose Status ---</option>
                            <option value="confirmed">Approve</option>
                            <option value="cancel">Reject</option>
                        </Input>
                        </Col>
                    </FormGroup>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                    <FormGroup className="relative w-full mb-3">
                        <Label 
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                        for="notes" sm={2}>Notes</Label>
                        <Col sm={10}>
                        <Input 
                            type="text" 
                            name="notes" 
                            innerRef={props.register}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            id="notes">
                        </Input>
                        </Col>
                    </FormGroup>
                </div>
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
                    <span className="label">Update KYC Status</span>
                    </Button>
                </div>
                </div>
            </form>
        </>
     );
}
 
export default withRouter(FormDetailKycRequest);