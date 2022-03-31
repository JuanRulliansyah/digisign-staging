import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Button, Col, FormGroup, Input, Label } from "reactstrap";
import { getListProvince, getListCity, getListDistrict, getListSubdistrict } from 'services/kyc/manageKyc';

const FormKyc = (props) => {
    const [selectedProvince, setSelectedProvince] = useState("");
    const [optionProvinces, setOptionProvince] = useState([]);

    const [selectedCity, setSelectedCity] = useState("");
    const [optionCities, setOptionCities] = useState([]);

    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [optionDistricts, setOptionDistricts] = useState([]);

    const [selectedSubdistrict, setSelectedSubdistrict] = useState("");
    const [optionSubdistricts, setOptionSubdistricts] = useState([]);

    // const [shareObj, setShareObj] = useState([]);

    // useEffect(() => {
    //     async function fetchShareObj() {
    //         console.log(shareObj);
    //     }
    //     fetchShareObj();
    // }, [shareObj]);

    const handleProvince = (e) => {
        const province = e.target.value;
        setSelectedProvince(province);
    }   
    
    const handleChangeProvince = (e) => {
        const province = e.value;
        // setShareObj(e);
        setSelectedProvince(province);
    }

    const handleCity = (e) => {
        const city = e.target.value;
        setSelectedCity(city);
    }    

    const handleChangeCity = (e) => {
        const city = e.value;
        setSelectedCity(city);
    }
    
    const handleDistrict = (e) => {
        const district = e.target.value;
        setSelectedDistrict(district);
    }    

    const handleChangeDistrict = (e) => {
        const district = e.value;
        setSelectedDistrict(district);
    }

    const handleSubdistrict = (e) => {
        const subdistrict = e.target.value;
        setSelectedSubdistrict(subdistrict);
    }    

    const handleChangeSubDistrict = (e) => {
        const subdistrict = e.value;
        setSelectedSubdistrict(subdistrict);
    }

    useEffect(() => {
        async function fetchProvince() {
            await getListProvince(selectedProvince).then(response => {
                if(response.status === 200) {
                    setOptionProvince(response.data)
                } else {
                    console.log("Gagal");
                }
            });
        }
        fetchProvince();
    }, [selectedProvince]);  


    useEffect(() => {
        async function fetchCity() {
            await getListCity(selectedCity, selectedProvince).then(response => {
                if(response.status === 200) {
                    setOptionCities(response.data)
                } else {
                    console.log("Gagal");
                }
            });
        }
        fetchCity();
    }, [selectedCity, selectedProvince]);

    useEffect(() => {
        async function fetchDistrict() {
            await getListDistrict(selectedDistrict, selectedCity).then(response => {
                if(response.status === 200) {
                    setOptionDistricts(response.data)
                } else {
                    console.log("Gagal");
                }
            });
        }
        fetchDistrict();
    }, [selectedDistrict, selectedCity]);

    useEffect(() => {
        async function fetchSubdistrict() {
            await getListSubdistrict(selectedSubdistrict, selectedDistrict).then(response => {
                if(response.status === 200) {
                    setOptionSubdistricts(response.data)
                } else {
                    console.log("Gagal");
                }
            });
        }
        fetchSubdistrict();
    }, [selectedSubdistrict, selectedDistrict]);

    return ( 
        <form onSubmit={props.handleSubmit} >
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
                    innerRef={props.register}/>
                    {props.errors.identity_number && <div className="invalid-feedback d-block">{props.errors.identity_number.message}</div>}
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
                    innerRef={props.register}/>
                    {props.errors.full_name && <div className="invalid-feedback d-block">{props.errors.full_name.message}</div>}
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
                        innerRef={props.register}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="gender">
                        <option>--- Choose Gender ---</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Input>
                    {props.errors.gender && <div className="invalid-feedback d-block">{props.errors.gender.message}</div>}
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
                    innerRef={props.register}/>
                    {props.errors.place_of_birth && <div className="invalid-feedback d-block">{props.errors.place_of_birth.message}</div>}
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
                    innerRef={props.register}/>
                    {props.errors.date_of_birth && <div className="invalid-feedback d-block">{props.errors.date_of_birth.message}</div>}
                </FormGroup>
            </div>

            <div className="w-full lg:w-6/12 px-4">
                <FormGroup className="relative w-full mb-3"> 
                    <Label 
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                    for="province">
                    Province
                    </Label>
                    <Select 
                        innerRef={props.register}
                        defaultValue={selectedProvince}
                        onKeyDown={handleProvince}
                        onChange={handleChangeProvince}
                        options={optionProvinces}/>
                    <Input type="hidden" name="province" innerRef={props.register} value={selectedProvince}></Input>
                    {props.errors.province && <div className="invalid-feedback d-block">{props.errors.province.message}</div>}
                </FormGroup>
            </div>

            <div className="w-full lg:w-6/12 px-4">
                <FormGroup className="relative w-full mb-3"> 
                    <Label 
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                    for="city">
                    City
                    </Label>
                    <Select 
                        innerRef={props.register}
                        defaultValue={selectedCity}
                        onKeyDown={handleCity}
                        onChange={handleChangeCity}
                        options={optionCities}/>
                    <Input type="hidden" name="city" innerRef={props.register} value={selectedCity}></Input>
                    {props.errors.city && <div className="invalid-feedback d-block">{props.errors.city.message}</div>}
                </FormGroup>
            </div>

            <div className="w-full lg:w-6/12 px-4">
                <FormGroup className="relative w-full mb-3"> 
                    <Label 
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                    for="district">
                    District (Kecamatan)
                    </Label>
                    <Select 
                        innerRef={props.register}
                        defaultValue={selectedDistrict}
                        onKeyDown={handleDistrict}
                        onChange={handleChangeDistrict}
                        options={optionDistricts}/>
                    <Input type="hidden" name="district" innerRef={props.register} value={selectedDistrict}></Input>
                    {props.errors.district && <div className="invalid-feedback d-block">{props.errors.district.message}</div>}
                </FormGroup>
            </div>

            <div className="w-full lg:w-6/12 px-4">
                <FormGroup className="relative w-full mb-3"> 
                    <Label 
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                    for="sub_district">
                    Sub District (Kelurahan)
                    </Label>
                    <Select 
                        innerRef={props.register}
                        onKeyDown={handleSubdistrict}
                        onChange={handleChangeSubDistrict}
                        options={optionSubdistricts}/>
                    <Input type="hidden" name="sub_district" innerRef={props.register} value={selectedSubdistrict}></Input>
                    {props.errors.sub_district && <div className="invalid-feedback d-block">{props.errors.sub_district.message}</div>}
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
                    innerRef={props.register}/>
                    {props.errors.postal_code && <div className="invalid-feedback d-block">{props.errors.postal_code.message}</div>}
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
                    innerRef={props.register}>
                    </Input>
                    {props.errors.address && <div className="invalid-feedback d-block">{props.errors.address.message}</div>}
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
                    innerRef={props.register}/>
                    {props.errors.email && <div className="invalid-feedback d-block">{props.errors.email.message}</div>}
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
                    innerRef={props.register}/>
                    {props.errors.email && <div className="invalid-feedback d-block">{props.errors.email.message}</div>}
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
                    innerRef={props.register}/>
                    {props.errors.identity_file && <div className="invalid-feedback d-block">{props.errors.identity_file.message}</div>}
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
                    innerRef={props.register}/>
                    {props.errors.face_file && <div className="invalid-feedback d-block">{props.errors.face_file.message}</div>}
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
                    innerRef={props.register}/>
                    {props.errors.selfie_file && <div className="invalid-feedback d-block">{props.errors.selfie_file.message}</div>}
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
                    innerRef={props.register}/>
                    {props.errors.signature_file && <div className="invalid-feedback d-block">{props.errors.signature_file.message}</div>}
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
     );
}
 
export default FormKyc;