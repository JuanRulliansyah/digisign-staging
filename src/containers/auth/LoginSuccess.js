import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Helmet} from "react-helmet";
import {Row, Spinner} from "reactstrap";
import {appConfigs} from "configs";
import { getUserModules } from "services/profile/userModule";
import { logoutUser } from "modules/redux/actions";
import { LocalStorageService } from "utils/storage";

const LoginSuccess = (props) => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        document.body.classList.add('background');
        document.body.classList.add('no-footer');

        async function setUserModule() {
            await getUserModules().then(response => {
                if (response.status !== 200) {
                    dispatch(logoutUser());
                    props.history.push('auth/login');
                } else {
                    const modules = response.data;
                    let permissions = [];
                    let listModules = [];

                    if(modules.length > 0) {
                        modules.forEach(module => { 
                            permissions.push(module.id);

                            let moduleObj = {
                                id: module.id,
                                icon: module.icon,
                                label: module.name,
                                to: `${appConfigs.rootUrl}/${module.path}`,
                            }
                            listModules.push(moduleObj);
                        });

                        const localStorage = LocalStorageService.getService();
                        localStorage.setPermissions(permissions);
                        localStorage.setModules(listModules);
                    }
                    setIsLoaded(true);
                }
            });
        }
        setUserModule();
        setIsLoaded(true);
        return () => {
            document.body.classList.remove('background');
            document.body.classList.remove('no-footer');
        };
    }, [dispatch, props.history]);

    useEffect(() => {
        if(isLoaded) {
            props.history.push(`${appConfigs.rootUrl}/dashboard`);
        }
    }, [isLoaded, props.history]);

    return (
        <>
            <Helmet>
                <title>Redirecting to Dashboard</title>
            </Helmet>
            <main>
                <div className="container">
                    <Row className="h-100">
                        <div sm="12" md="6" className="mx-auto my-auto">
                            <div className="text-center">
                                <Spinner color="primary" />
                                <p className="mt-3">Please wait ....</p>
                            </div>
                        </div>
                    </Row>
                </div>
            </main>
        </>

    );
}

export default LoginSuccess;