import { Button, FormGroup, Input, Label } from "reactstrap";
import { withRouter } from 'react-router-dom';
import { useEffect, useState } from "react";
import Select from 'react-select';
import { getPurpose } from "services/document/manageDocument";

const FormDocument = (props) => {

    const [selectedPurpose, setSelectedPurpose] = useState("");
    const [optionPurpose, setOptionPurpose] = useState([]);

    // const handleProvince = (e) => {
    //     const purpose = e.target.value;
    //     setSelectedPurpose(province);
    // }   
    
    const handleChangePurpose = (e) => {
        const purpose = e.value;
        setSelectedPurpose(purpose);
    }

    useEffect(() => {
        async function fetchPurpose() {
            await getPurpose(selectedPurpose).then(response => {
                if(response.status === 200) {
                    setOptionPurpose(response.data)
                } else {
                    console.log("Gagal");
                }
            });
        }
        fetchPurpose();
    }, [selectedPurpose]);  


    return ( 
        <>
            <form onSubmit={props.handleSubmit} >
                <h6 className="text-blueGray-400 text-sm mt-10 mb-6 font-bold uppercase">
                Document Information
                </h6>
                <div className="flex mt-6 flex-wrap">
                    <div className="w-full lg:w-4/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                                for="ref_number">
                                Reference Number (Nomor Surat)
                                </Label>
                                <Input 
                                placeholder="e.g 013/A.1/LL/UNPAM/III/2022"
                                innerRef={props.register}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                type="text" name="ref_number"></Input>
                        </FormGroup>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="kd_tema">
                            Purpose
                            </Label>
                            <Select 
                                innerRef={props.register}
                                defaultValue={selectedPurpose}
                                onChange={handleChangePurpose}
                                options={optionPurpose}/>
                            <Input type="hidden" name="kd_tema" innerRef={props.register} value={selectedPurpose}></Input>
                            {props.errors.purpose && <div className="invalid-feedback d-block">{props.errors.purpose.message}</div>}
                        </FormGroup>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="document_date">
                            Document Date
                            </Label>
                            <Input name="document_date" 
                            type="date"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            innerRef={props.register}/>
                            {props.errors.document_date && <div className="invalid-feedback d-block">{props.errors.document_date.message}</div>}
                        </FormGroup>
                    </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-6 mb-6 font-bold uppercase">
                Document Detail
                </h6>

                <div className="flex mt-6 flex-wrap">
                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="document">
                            File (.PDF)
                            </Label>
                            <Input name="document" 
                            type="file"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            innerRef={props.register}/>
                            {props.errors.document && <div className="invalid-feedback d-block">{props.errors.document.message}</div>}
                        </FormGroup>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                                for="subject">
                                Subject
                                </Label>
                                <Input 
                                placeholder="e.g Berita Acara Sidang Skripsi"
                                innerRef={props.register}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                type="text" name="subject"></Input>
                        </FormGroup>
                    </div>
                    <div className="w-full mt-6 lg:w-12/12 px-4">
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                                for="message">
                                Message
                                </Label>
                                <textarea 
                                placeholder="e.g Surat ini bertujuan untuk menginformasikan kegiatan belajar mengajar selama ramadhan"
                                rows={8}
                                innerRef={props.register}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                type="text" name="message"></textarea>
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
                    <span className="label">Save Document</span>
                    </Button>
                </div>
                </div>
            </form>
        </>
     );
}
 
export default withRouter(FormDocument);