import { useEffect, useState } from "react";
import { getDetailVerify } from "services/verify/manageVerify";
import { useQuery } from "utils/helpers/useQuery";

const VerifyPages = () => {
    let query = useQuery();
    const identity = query.get('identity');

    const [verify, setVerify] = useState({});
    console.log(verify);

    useEffect(() => {
        async function fetchVerify() {
            await getDetailVerify(identity).then(response => {
                if(response.status !== 200) {
                } else {
                    const verify = response.data.data;
                    setVerify(verify);
                }
            });
        }
        fetchVerify();
    }, [identity]);

    return ( 
        <>
        <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mt-6 mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="flex-auto px-4 mt-6 lg:px-10 py-10 pt-0">
                    <h1 className="block uppercase text-blueGray-600 text-lg font-bold mb-2">
                        VERIFIKASI DOKUMEN
                    </h1>
                    <hr className="mt-2 border-b-1 border-blueGray-300" /> <br />

                    <div className="form-group">
                        <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">NIM</p>
                        <p>
                            {verify.nim}                    
                        </p>
                    </div>
                    <div className="form-group mt-2">
                        <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">NAMA</p>
                        <p>
                            {verify.name}                    
                        </p>
                    </div>
                    <div className="form-group mt-5">
                        <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">WAKTU UNGGAH</p>
                        <p>
                            {verify.created}                    
                        </p>
                    </div>
                    <div className="form-group mt-2">
                        <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">WAKTU TANDA TANGAN</p>
                        <p>
                            {verify.sign_date}                    
                        </p>
                    </div>
                    <div className="form-group mt-2">
                        <p className="block uppercase text-blueGray-600 text-xs mb-3 font-bold mb-2">STATUS</p>
                        <p className="text-red-50">
                            <span style={{backgroundColor: '#45c463', padding: '10px', borderRadius: '10px', color: 'white'}}>{verify.status}</span>
                        </p>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        </>
     );
}
 
export default VerifyPages;