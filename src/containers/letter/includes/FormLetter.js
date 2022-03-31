import { Button, Col, FormGroup, Input, Label } from "reactstrap";
import { withRouter } from 'react-router-dom';



const FormLetter = (props) => {

    return ( 
        <>
            <form onSubmit={props.handleSubmit} >
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
                            innerRef={props.register}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            id="position">
                            <option>--- Choose Position ---</option>
                            <option value="1">Dosen</option>
                            <option value="2">Mahasiswa</option>
                        </Input>
                        {props.errors.position && <div className="invalid-feedback d-block">{props.errors.position.message}</div>}
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
                        innerRef={props.register}/>
                        {props.errors.position_letter && <div className="invalid-feedback d-block">{props.errors.position_letter.message}</div>}
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
                        innerRef={props.register}/>
                        {props.errors.date_start && <div className="invalid-feedback d-block">{props.errors.date_start.message}</div>}
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
                        innerRef={props.register}/>
                        {props.errors.date_end && <div className="invalid-feedback d-block">{props.errors.date_end.message}</div>}
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
        </>
     );
}
 
export default withRouter(FormLetter);