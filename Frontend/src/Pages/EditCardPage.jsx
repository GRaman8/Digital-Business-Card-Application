import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'



export default function EditCard(){
    const [formData, setFormData] = useState(null);

    const { cardId } = useParams();
    const navigate  = useNavigate();
    const token = localStorage.getItem('token');
      
    useEffect(() => {

        const fetchAdminCards = async () => {

            if (!token) {
                console.error("No token found. User is not authenticated.");
                // Redirect to the signup page here. If there is no token.
                alert("You are not authenticated. Please Sign-up.");
                navigate("/signup");
                return;
            }
        
            try{

                const response = await fetch(`http://localhost:3000/admin/cards/${cardId}`, {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',

                        'Authorization': `Bearer ${token}`
                    }
                });

                    if(response.ok){
                        const data = await response.json();
                        const card = data.Cards;
                        card.interests = card.interests.join(', ');
                        setFormData(card);
                    }
                    else{
                        console.error("Failed to fetch admin cards");
                    }
                } catch(error){
                console.error("An error occurred:", error);
                }

            };

            fetchAdminCards();

    }, [cardId]); // <-- Re-Run the effect if there is an different card id.

    // A single handler for all form input changes
    const handleChange = (e) => {
        const{ name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleBacktoDashboard = async (e) => {
        e.preventDefault();

        navigate('/admin/dashboard');
    };

    const handleSubmit =async (e) =>{
        e.preventDefault();

        const interestsArray = formData.interests.split(',').map(interest => interest.trim());

        const submissionData ={
            ...formData,
            interests: interestsArray
        };

        try{
            const response = await fetch(`http://localhost:3000/admin/cards/${cardId}`, {
               method: 'PUT',
               headers: {
                'Content-Type': 'application/json',

                'Authorization': `Bearer ${token}`
               },
               body: JSON.stringify(submissionData) 
            });

            if(response.ok){
                alert("Card updated Successfully");
                navigate('/admin/dashboard');
            }
            else{
                alert("Failed to update card.");
            }
        } catch(error) {
            console.error("Error updating card:", error);
        }
    };

    if(!formData){
        return <div>Loading...</div>;
    }

    return (
        <div className="form_container">
            <h1>Edit this Card:</h1>
            {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
            <form onSubmit={handleSubmit}>
                &nbsp;
                <input className="form_input" name="name" value={formData.name} onChange={handleChange} placeholder="Name" /> <br />
                &nbsp;
                <input className="form_textarea" name="description" value={formData.description} onChange={handleChange} placeholder="Description" /> <br />
                &nbsp;
                <input className="form_textarea" name="interests" value={formData.interests} onChange={handleChange} placeholder="Interests (Comma-Separated)" /> <br />
                &nbsp;
                <input className="form_input" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="Linkedin URL" /> <br />
                &nbsp;
                <input className="form_input" name="twitter" value={formData.twitter} onChange={handleChange} placeholder="Twitter URL" /> <br />
                &nbsp;
                <input className="form_input" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Instagram URL" /> <br />
                &nbsp;
                <button type="submit" className="btn btn-edit">Update Card</button>
                &nbsp;
                <button onClick={handleBacktoDashboard} className="btn btn-details">Back to Dashboard</button>
            </form>
        </div>
    );
};

