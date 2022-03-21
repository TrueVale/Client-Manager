import { Formik, Form, Field } from "formik";
import * as Yup from 'yup'
import Alert from "./Alert";

const FormComponent = () => {

    const newClientSchema = Yup.object().shape({
        name: Yup.string()
                .min(3, 'Name is too short')
                .max(20, 'Name is too big')
                .required('Name can\'t be empty'),
        company: '',
        email: '',
        phone: '',
        info: ''
    })

    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center">Add client</h1>
            <Formik
                initialValues={{
                    name: '',
                    company: '',
                    email: '',
                    phone: '',
                    info: ''
                }}
                onSubmit={values => {
                    handleSubmit(values)
                }}
                validationSchema={newClientSchema}
            >
                { ({errors, touched}) => { 
                    
                    return (
                    <Form className="mt-10">
                    <div className="mb-4">
                        <label 
                            htmlFor="name"
                            className="text-gray-800"
                        >Name:</label>
                        <Field
                            id="name"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Client name"
                            name="name"
                        />
                        { errors.name && touched.name ? (
                            <Alert>{ errors.name }</Alert>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label 
                            htmlFor="company"
                            className="text-gray-800"
                        >Company:</label>
                        <Field
                            id="company"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Client company"
                            name="company"
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            htmlFor="email"
                            className="text-gray-800"
                        >Email:</label>
                        <Field
                            id="email"
                            type="email"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Client email"
                            name="email"
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            htmlFor="phone"
                            className="text-gray-800"
                        >Phone:</label>
                        <Field
                            id="phone"
                            type="tel"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Client phone"
                            name="phone"
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            htmlFor="info"
                            className="text-gray-800"
                        >Additional info:</label>
                        <Field
                            as="textarea"
                            id="info"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 h-40"
                            placeholder="Additional client info"
                            name="info"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Add Client"
                        className="mt-5 w-full bg-blue-900 p-3 text-white uppercase font-bold text-lg rounded-md"
                    />
                </Form>
                )}}
            </Formik>
        </div>
    );
}

export default FormComponent;
