import { Button, FormGroup, Input, Label } from "reactstrap";
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { useEffect, useState } from "react";
import { getAvailableUser } from "services/document/manageDocument";
import { useForm } from "react-hook-form";
import { shareDocument } from "services/document/manageDocument";
import toast, { Toaster } from 'react-hot-toast';
import { getSignList } from "services/document/manageDocument";


const FormDetailDocument = (props) => {
    const [selectedOptionSign, setSelectedOptionSign] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [optionUser, setOptionUser] = useState([]);
    const [signList, setSignList] = useState([]);
    
    const handleUser = (e) => {
        const user = e.target.value;
        setSelectedUser(user);
    }   
    
    const handleChangeUser = (e) => {
        const user = e.value;
        setSelectedUser(user);
    }

    useEffect(() => {
        async function fetchAvailableUser() {
            await getAvailableUser(selectedUser).then(response => {
                if(response.status === 200) {
                    setOptionUser(response.data);
                } else {
                    console.log("Gagal");
                }
            });
        }
        fetchAvailableUser();
    }, [selectedUser]);  

    useEffect(() => {
        async function fetchDocumentSignList() {
            await getSignList(props.item.id).then(response => {
                if(response.status === 200) {
                    setSignList(response.data);
                    console.log(response.data);
                } else {
                    console.log("Gagal");
                }
            });
        }
        fetchDocumentSignList();
    }, [props.item]);
    
    const optionSigns = [
        {'label': 'Self Sign', 'value': 'self-sign'},
        {'label': 'Share Sign', 'value': 'share-sign'}
    ];

    const handleChangeOptionSign = (e) => {
        const sign = e.value;
        setSelectedOptionSign(sign);
    }

    const notifySuccessShare = () => toast.success('Document successfully shared');
    const notifyErrorShare = () => toast.error('Cannot share the Document, please try again later');

    const { register, handleSubmit } = useForm();

    const onShareDocument = (data) => {
        shareDocument(data).then(response => {
            if(response.status !== 201) {
                notifyErrorShare();
            } else {
            setTimeout(() => {
                notifySuccessShare();
                window.location.reload();
            }, 2000);
        }
        });
    };

    const disabledStyle = {backgroundColor: '#ebebeb', cursor: 'not-allowed'};
    return ( 
        <>
            <div className="flex mt-10 mb-6 flex-wrap">
                <div className="w-full lg:w-8/12 px-4">
                    <object data={props.item.pdf_url} type="application/pdf" width="100%" height="900">
                        <iframe title={props.item.id} src={props.item.pdf_url} runat="server" width="100%" height="900">
                        </iframe>
                    </object>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                    <h6 className="text-blueGray-400 text-sm mt-10 mb-6 font-bold uppercase">
                    Document Information
                    </h6>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-12/12 px-4">
                            <FormGroup className="relative w-full mb-3"> 
                                <Label 
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                                    for="username">
                                    Document Author
                                    </Label>
                                    <Input 
                                    style={disabledStyle}
                                    innerRef={props.register}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    type="text" name="username" disabled={true}>{props.item.name} {props.item.username}</Input>
                            </FormGroup>
                        </div>
                        <div className="w-full lg:w-12/12 px-4">
                            <FormGroup className="relative w-full mb-3"> 
                                <Label 
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                                    for="ref_number">
                                    Reference Number (Nomor Surat)
                                    </Label>
                                    <Input 
                                    style={disabledStyle}
                                    innerRef={props.register}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    type="text" name="ref_number" disabled={true}>{props.item.ref_number}</Input>
                            </FormGroup>
                        </div>
                        <div className="w-full mt-6 lg:w-12/12 px-4">
                            <FormGroup className="relative w-full mb-3"> 
                                <Label 
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                                    for="kd_tema">
                                    Purpose
                                    </Label>
                                    <Input 
                                    style={disabledStyle}
                                    innerRef={props.register}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    type="text" name="kd_tema" disabled={true}>{props.item.kd_tema}</Input>
                            </FormGroup>
                        </div>
                        <div className="w-full mt-6 lg:w-12/12 px-4">
                            <FormGroup className="relative w-full mb-3"> 
                                <Label 
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                                    for="document_date">
                                    Document Date
                                    </Label>
                                    <Input 
                                    style={disabledStyle}
                                    innerRef={props.register}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    type="text" name="document_date" disabled={true}>{props.item.document_date}</Input>
                            </FormGroup>
                        </div>
                    </div>
                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                    <h6 className="text-blueGray-400 text-sm mt-6 mb-6 font-bold uppercase">
                    Document Detail
                    </h6>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-12/12 px-4">
                            <FormGroup className="relative w-full mb-3"> 
                                <Label 
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                                    for="subject">
                                    Subject
                                    </Label>
                                    <Input 
                                    style={disabledStyle}
                                    innerRef={props.register}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    type="text" name="subject" disabled={true}>{props.item.subject}</Input>
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
                                    style={disabledStyle}
                                    innerRef={props.register}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    type="text" name="message" disabled={true} value={props.item.message}></textarea>
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <a className="text-lightBlue-500" target="_blank" rel="noreferrer" href={props.item.pdf_url}>See Detail Document</a>

            <hr className="mt-6 border-b-1 border-blueGray-300" /> <br />
            {/* <h6 className="text-blueGray-700 mb-2 text-xl font-bold">Status</h6>
            {(props.item.status === "signed" ? <div style={{backgroundColor: "#4db368", color:"white"}} className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2 mb-2">Signed</div>: <div className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Not Signed</div>)} */}
            <div className="flex mt-5 flex-wrap">
                <div className="w-full lg:w-8/12 px-4">
                    {!props.type &&
                        <FormGroup className="relative w-full mb-3"> 
                            <Label 
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                            for="sign_option">
                            Sign Option
                            </Label>
                            <Select 
                                defaultValue=""
                                onChange={handleChangeOptionSign}
                                options={optionSigns}/>
                            <Input type="hidden" name="option_sign" value={selectedOptionSign}></Input>
                        </FormGroup>
                    }
                    {selectedOptionSign === "self-sign" && 
                    <form onSubmit={props.handleSubmit}>
                        <div className="flex mt-6 flex-wrap">
                            <Input type="hidden" innerRef={props.register} name="document_id" value={props.item.id}></Input>
                            <FormGroup className="relative w-full mb-3"> 
                                <Label 
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                                    for="document">
                                    Certificate Password
                                    </Label>
                                    <Input 
                                    innerRef={props.register}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    type="password" name="password"
                                    disabled={props.item.status === "signed"}
                                    style={props.item.status === "signed" ? disabledStyle : {}}
                                    ></Input>
                            </FormGroup>
                            <Button 
                                className="bg-lightBlue-500 mt-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            >
                            <span className="spinner d-inline-block">
                                <span className="bounce1" />
                                <span className="bounce2" />
                                <span className="bounce3" />
                            </span>
                            <span className="label">Sign Document</span>
                            </Button>
                        </div>
                    </form>
                    }
                    {selectedOptionSign === "share-sign" && 
                        <form onSubmit={handleSubmit(onShareDocument)}>
                            {console.log(props.item.id)}
                            <Input type="hidden" innerRef={register} name="document_id" value={props.item.id}></Input>
                            <FormGroup className="relative w-full mb-3"> 
                                <Label 
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                                for="sign_option">
                                Select User to Sign
                                </Label>
                                <Select 
                                    innerRef={register}
                                    defaultValue={selectedUser}
                                    onKeyDown={handleUser}
                                    onChange={handleChangeUser}
                                    options={optionUser}/>
                                <Input type="hidden" name="username" innerRef={register} value={selectedUser}></Input>
                            </FormGroup>
                            <Button 
                                className="bg-lightBlue-500 mt-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            >
                            <span className="spinner d-inline-block">
                                <span className="bounce1" />
                                <span className="bounce2" />
                                <span className="bounce3" />
                            </span>
                            <span className="label">Share Document</span>
                            </Button>
                        </form>
                    }
                </div>
                <div className="w-full lg:w-4/12 px-4">
                    <FormGroup className="relative mt-3 w-full mb-3">
                        <Label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                        for="sign_option">
                            Request for Sign
                        </Label>
                        Self Sign {(props.item.status === "signed" ? <div style={{backgroundColor: "#4db368", color:"white"}} className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2 mb-2">Signed</div>: <div className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Not Signed</div>)}
                        <hr className="mt-3 mb-3 border-b-1 border-blueGray-300" />
                        <ul>
                        {signList.map((sign) => {
                            return (
                                <li>{sign.user_to_identity} - {sign.status === "signed" ? "already signed" : 'not signed yet'}</li>
                            );
                        })}
                        </ul>
                    </FormGroup>
                </div>
            </div>
            <Toaster />
        </>
     );
}
 
export default withRouter(FormDetailDocument);