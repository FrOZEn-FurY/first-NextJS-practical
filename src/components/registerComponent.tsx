import {useFormik} from 'formik';
import * as yup from 'yup';
import { api } from '@/pages/services';
import { useRouter } from 'next/router';

const Register = (): JSX.Element => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '' 
        },
        validationSchema: yup.object({
            email: yup.string().email("Email must be valid.").required("Email is required."),
            name: yup.string().required("Name is required."),
            password: yup.string().required("Password is required.")
        }),
        onSubmit: async (values) => {
            try {
                const response = await api.post('/register', values);
                alert(response.data.message);
                router.replace('/login');
            } catch(error: any) {
                alert(error.message)
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
                        className='form-control'
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <span className='text-danger'>{formik.errors.email}</span>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                        id="name"
                        className='form-control'
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <span className='text-danger'>{formik.errors.name}</span>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        id="password"
                        className='form-control'
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <span className='text-danger'>{formik.errors.password}</span>
                    ) : null}
                </div>
                <button className='btn btn-success' type="submit">Register</button>
            </form>
        </>
     );
}
 
export default Register;