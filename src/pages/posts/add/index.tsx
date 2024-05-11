import { api } from "@/pages/services";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as yup from 'yup';

const AddPost = (): JSX.Element => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
          title: "",
          content: "",
          published: false,  
        },
        validationSchema: yup.object({
           title: yup.string().required("Title is required.").max(100, "Title must be 100 characters or less."),
           content: yup.string().required("Content is required."),
           publish: yup.boolean(), 
        }),
        onSubmit: async (values) => {
            try {
                const response = await api.post('/posts', values);
                alert(`${response.data.title} has been added.`);
                router.replace('/');
            } catch(error) {
                alert((error as Error).message);
            }
        }
    })
    return ( 
        <>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label className="form-label" htmlFor="title">Title: </label>
                    <input
                    id="title"
                    className="form-control"
                    {...formik.getFieldProps('title')}
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <span className="text-danger">{formik.errors.title}</span>
                    ): null}
                </div>
                <div>
                    <label className="form-label" htmlFor="content">Content: </label>
                    <input
                    id="content"
                    className="form-control"
                    {...formik.getFieldProps('content')}
                    />
                    {formik.touched.content && formik.errors.content ? (
                        <span className="text-danger">{formik.errors.content}</span>
                    ): null}
                </div>
                <div>
                    <label className="form-check-label me-3" htmlFor="published">Publish? </label>
                    <input
                    id="published"
                    className="form-check-input"
                    type="checkbox"
                    {...formik.getFieldProps('published')}
                    />
                    {formik.touched.published && formik.errors.published ? (
                        <span className="text-danger">{formik.errors.published}</span>
                    ): null}
                </div>
                <button className="btn btn-primary mt-3" type="submit">Add post</button>
            </form>
        </>
    );
}
 
export default AddPost;