import {useEffect, React } from "react";
import {loginFailed, loginProcess, loginSuccess} from "../../modules/redux/auth/action";
import { alertNotification } from "../../utils/helpers/alertNotifications";
import { useDispatch, useSelector } from "react-redux";
import {Label, FormGroup, Button, Input} from "reactstrap";
import { useForm } from "react-hook-form";
// import { postLogin } from "services/auth";
import { setErrorValidation } from "utils/helpers/commons";
import { postLogin } from "services/auth";

const Login = (props) => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  // const loading = auth.loading;
  const error = auth.errorMessage;

  const { register, errors, handleSubmit, setError } = useForm();
  const onLoginSubmit = (data) => {
    dispatch(loginProcess());
    postLogin(data).then(response => {
      console.log(data);
      console.log(response);
      if(response?.status !== 200) {
          dispatch(loginFailed(response?.data.message));
          setErrorValidation(response, setError);
      } else {
          dispatch(loginSuccess(response.data));
          props.history.push('/login-success');
      }
    });
  };

  useEffect(() => {
    if (error) {
        alertNotification('error', error, 'Login Failed',3000);
    }
  }, [error]);

  return ( 
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mt-6 mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="flex-auto px-4 mt-6 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit(onLoginSubmit)}>
                {/* <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Username (SSO UNPAM)
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="e.g 181011******"
                  />
                </div> */}

                <FormGroup className="relative w-full mb-3"> 
                  <Label 
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                    for="username">
                      Username (SSO UNPAM)
                    </Label>
                    <Input name="username" 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      innerRef={register}/>
                    {errors.username && <div className="invalid-feedback d-block">{errors.username.message}</div>}
                </FormGroup>

                <FormGroup className="relative w-full mb-3"> 
                  <Label 
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2" 
                    for="username">
                      Password
                    </Label>
                    <Input type="password" 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="password" 
                      innerRef={register}/>
                    {errors.password && <div className="invalid-feedback d-block">{errors.password.message}</div>}
                </FormGroup>

                {/* <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                  />
                </div> */}

                {/* <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button"
                  >
                    Sign In
                  </button>
                </div> */}

                <div className="text-center mt-6">
                  <Button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
                      <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                      </span>
                      <span className="label">Login</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Login;