import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import Alert from "./Alert";
import Spinner from "./Spinner";

const FormComponent = ({ client, loading }) => {

    const navigate = useNavigate()

    const newClientSchema = Yup.object().shape({
        name: Yup.string()
                .min(3, 'Name is too short')
                .max(20, 'Name is too big')
                .required('Name can\'t be empty'),
        company: Yup.string()
                .required('Company name is required'),
        email: Yup.string()
                .email()
                .required('Email is required'),
        phone: Yup.number()
                .positive('This is not a valid phone number')
                .integer('This is not a valid phone number')
                .typeError('This is not a valid phone number')
    })

    const handleSubmit = async (values) => {
        try {
            let resp
            if(client.id){
                const url = `${import.meta.env.VITE_API_URL}/clients/${client.id}`

                resp = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                // New client
                const url = import.meta.env.VITE_API_URL

                resp = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }

            await resp.json()
            navigate("/clients")

        } catch (error) {
            console.log(error)
        }
    }

    return (

        loading ? <Spinner/> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{ client?.name ? 'Edit Client' : 'Add Client' }</h1>
                <Formik
                    initialValues={{
                        name: client?.name ?? '',
                        company: client?.company ?? '',
                        email: client?.email ?? '',
                        phone: client?.phone ?? '',
                        info: client?.info ?? ''
                    }}
                    enableReinitialize={true}
                    onSubmit={ async (values, {resetForm}) => {
                        await handleSubmit(values)

                        resetForm()
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
                            { errors.company && touched.company ? (
                                <Alert>{ errors.company }</Alert>
                            ) : null}
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
                            { errors.email && touched.email ? (
                                <Alert>{ errors.email }</Alert>
                            ) : null}
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
                            { errors.phone && touched.phone ? (
                                <Alert>{ errors.phone }</Alert>
                            ) : null}
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
                            value={ client?.name ? 'Save changes' : 'Add client' }
                            className="mt-5 w-full bg-blue-900 p-3 text-white uppercase font-bold text-lg rounded-md"
                        />
                    </Form>
                    )}}
                </Formik>
            </div>
        )
    );
}

FormComponent.defaultProps = {
    client: {},
    loading: false
}

export default FormComponent;
