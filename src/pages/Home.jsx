import { useState, useEffect } from 'react';
import Client from '../components/Client';

const Home = () => {

  const [ clients, setClients ] = useState([])

  useEffect(() => {
    const getClients = async () => {
      try {
        const url = "http://localhost:4000/clients"
        const resp = await fetch(url)
        const result = await resp.json()

        setClients(result)

      } catch (error) {
        console.log(error)
      }
    }

    getClients()
  }, [])

  const handleDelete = async id => {
    const confDelete = confirm('Do you want to delete this client?')
    if(confDelete) {
        try {
          const url = `http://localhost:4000/clients/${id}`
          const resp = await fetch(url, {
            method: 'DELETE'
          })

          await resp.json()

          const clientList = clients.filter( client => client.id !== id)
          setClients(clientList)
          
        } catch (error) {
          console.log(error)
        }
    }
  }

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Clients</h1>
      <p className='mt-3'>Manage clients</p>
      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className='p-2'>Name</th>
            <th className='p-2'>Contact</th>
            <th className='p-2'>Company</th>
            <th className='p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map( client =>(
            <Client
              key={ client.id }
              client={ client }
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Home;
