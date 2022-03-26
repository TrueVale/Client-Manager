import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const ClientInfo = () => {

    const [ client, setClient ] = useState({})
    const [ loading, setLoading ] = useState(true) 

    const { id } = useParams()

    useEffect(() => {
        const getClient = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const resp = await fetch(url)
                const result = await resp.json()
                setClient(result)
            } catch (error) {
                console.log(error)
            }
            setLoading(!loading)
        }
        getClient()
    }, [])

    return (

        loading ? <Spinner/> : 
        Object.keys(client).length === 0 ? 
        <p>Client with id { id } does not exist</p> : 
        (

            <div>
        
                <h1 className='font-black text-4xl text-blue-900'>More info about { client.name }</h1>

                { client.name && (
                    <p className="text-4xl text-gray-500 mt-10">
                        <span className="text-gray-600 uppercase font-bold">Client:</span>
                        { client.name }
                    </p>
                )}

                { client.email && (
                    <p className="text-2xl text-gray-500 mt-4">
                        <span className="text-gray-600 uppercase font-bold">Email:</span>
                        { client.email }
                    </p>

                )}

                { client.phone && (
                    <p className="text-2xl text-gray-500 mt-4">
                        <span className="text-gray-600 uppercase font-bold">Phone:</span>
                        { client.phone }
                    </p>
                )}

                { client.company && (
                    <p className="text-2xl text-gray-500 mt-4">
                        <span className="text-gray-600 uppercase font-bold">Company:</span>
                        { client.company }
                    </p>
                )}

                { client.info && (
                    <p className="text-2xl text-gray-500 mt-4">
                        <span className="text-gray-600 uppercase font-bold">More info:</span>
                        { client.info }
                    </p>
                )}
                
            </div>

        )
    );
}

export default ClientInfo;
