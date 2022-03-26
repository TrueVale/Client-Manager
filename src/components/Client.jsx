import { useNavigate } from "react-router-dom"; 

const Client = ({ client, handleDelete }) => {
    const navigate = useNavigate()

    const { name, company, email, phone, info, id } = client

    return (
        <tr className="border-b hover:bg-gray-100">
            <td className="p-3">{ name }</td>
            <td className="p-3"> 
                <p><span className="text-gray-800 uppercase font-bold">Email: </span>{ email }</p>
                <p><span className="text-gray-800 uppercase font-bold">Phone: </span>{ phone }</p>
            </td>
            <td className="p-3">{ company }</td>
            <td className="p-3">
                <button type="button" className="bg-green-500 hover:bg-green-600 block w-full text-white p-2 uppercase font-bold text-xs rounded-sm"
                        onClick={() => navigate(`/clients/${id}`)}>
                    More info
                </button>
                <button type="button" className="bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs rounded-sm mt-3"
                        onClick={() => navigate(`/clients/edit/${id}`)}>
                    Edit
                </button>
                <button type="button" className="bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs rounded-sm mt-3"
                        onClick={() => handleDelete(id)}>
                    Delete
                </button>
            </td>
        </tr>
    );    
}

export default Client;
