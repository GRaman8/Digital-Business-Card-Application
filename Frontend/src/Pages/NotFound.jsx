import { Link } from "react-router-dom";

export default function NotFound(){
    return (
        <div className="notfound_container">
            <h1>Not Found Page ❌</h1>
            <Link to={"/"}>
                <button className="btn btn-details">Go back Home</button>
            </Link>
        </div>
    );
};