import { context } from "@/contexts/mainContext";
import { api } from "@/pages/services";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useContext } from "react";
import * as yup from 'yup';

const Login = (): JSX.Element => {
    const ctx = useContext(context);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            email: yup.string().email("Email must be valid.").required("Email is required."),
            password: yup.string().required("Password is required.")
        }),
        onSubmit: async (values) => {
            try {
                const response = await api.post('/login', values);
                alert(response.data.message);
                ctx.updateUser();
                router.replace('/');
            } catch(error: any) {
                alert(error);
            }
        }
    });
    return ( 
        <>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        id="email"
                        className="form-control"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <span className="text-danger">{formik.errors.email}</span>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        id="password"
                        className="form-control"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <span className="text-danger">{formik.errors.password}</span>
                    ) : null}
                </div>
                <button className='btn btn-info' type="submit">Login</button>
            </form>
        </>
    );
}
 
export default Login;