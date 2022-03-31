import { Button, Col, FormGroup, Input, Label } from "reactstrap";
import { withRouter } from 'react-router-dom';

const FormDetailPositionLetterRequest = (props) => {
    const letter_url = /[^/]*$/.exec(props.item.position_letter)[0];

    return ( 
        <>
        <div className="flex flex-wrap mt-5">

            <hr className="mt-6 border-b-1 border-blueGray-300" /> <br />

            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <object data={`http://localhost:8000/uploads/letter/pdf/${letter_url}`} type="application/pdf" width="500" height="678">

                        <iframe title={props.item.id} src={`http://localhost:8000/uploads/letter/pdf/${letter_url}`} width="100%" height="678">
                            <p>This browser does not support PDF!</p>
                        </iframe>
                    </object>
                    <br/>
                    <a className="text-lightBlue-500" target="_blank" rel="noreferrer" href={`http://localhost:8000/uploads/letter/pdf/${letter_url}`}>See Detail Letter</a>
                </div>
            </div>


            <div className="w-full lg:w-6/12 px-4">
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                        <p className="text-blueGray-700 text-md font-bold">Date Start</p>
                        <p>{props.item.date_start}</p>
                    </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                        <p className="text-blueGray-700 text-md font-bold">Date End</p>
                        <p>{props.item.date_end}</p>
                    </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                        <p className="text-blueGray-700 text-md font-bold">Status</p>
                        <p>{props.item.status}</p>
                    </div>
                </div>
            </div>
        </div>
        <form onSubmit={props.handleSubmit} >
                <hr className="mt-6 border-b-1 border-blueGray-300" /> <br />
                <div className="w-full lg:w-6/12 px-4">
                    <FormGroup className="relative w-full mb-3">
                        <Label 
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                        for="position" sm={2}>Letter Status</Label>
                        <Col sm={10}>
                        <Input type="hidden" name="letter_id" innerRef={props.register} value={props.item.id}></Input>
                        <Input type="hidden" name="active" innerRef={props.register} value="T"></Input>
                        <Input 
                            type="select" 
                            name="status" 
                            innerRef={props.register}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            id="position">
                            <option>--- Choose Status ---</option>
                            <option value="usable">Approve</option>
                            <option value="reject">Reject</option>
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
                    <span className="label">Update Letter Status</span>
                    </Button>
                </div>
                </div>
            </form>
        </>
     );
}
 
export default withRouter(FormDetailPositionLetterRequest);