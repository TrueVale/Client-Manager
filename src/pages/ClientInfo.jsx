import { useParams } from "react-router-dom";

const ClientInfo = () => {

    const { id } = useParams()

    console.log(id)

    return (
        <div>
            <h1>ClientInfo</h1>
        </div>
    );
}

export default ClientInfo;
