import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FormComponent from '../components/FormComponent'



const EditClient = () => {
  const [ client, setClient ] = useState({})
  const [ loading, setLoading ] = useState(true) 

  const { id } = useParams()

  useEffect(() => {
      const getClient = async () => {
          try {
              const url = `http://localhost:4000/clients/${id}`
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
    <>
        <h1 className='font-black text-4xl text-blue-900'>Edit Client</h1>
        <p className='mt-3'>Use this form to edit client data</p>
        <FormComponent
          client={client}
        />
    </>
  );
}

export default EditClient;
