import{ useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddCard(){
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        interests: '',
        linkedin: '',
        twitter: '',
        instagram: ''
    });

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    if (!token) {
        console.error("No token found. User is not authenticated.");
        // Redirect to the signup page here. If there is no token.
        alert("You are not authenticated. Please Sign-up.");
        navigate("/signup");
        return;
    }

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

    const handleSubmit = async(e) => {
        e.preventDefault();

        const submissionData ={ ...formData};

        const keysToCheck = ['description','interests','linkedin','instagram','twitter'];

        keysToCheck.forEach(key => {
            if(submissionData[key] === ''){
                delete submissionData[key];
            }
        });

        if(submissionData.interests){
            submissionData.interests = submissionData.interests.split(',').map(interest => interest.trim());
        }

        try{
            const response = await fetch(`http://localhost:3000/admin/card`, {
               method: 'POST',
               headers: {
                'Content-Type': 'application/json',

                'Authorization': `Bearer ${token}`
               },
               body: JSON.stringify(submissionData) 
            });

            if(response.ok){
                alert("Card Added Successfully");
                navigate('/admin/dashboard');
            }
            else{
                alert("Failed to add the card.");
            }
        } catch(error) {
            console.error("Error adding the card:", error);
        }
    };

    return (
        <div className="form_container">
            <h1>Add Card Info:</h1>
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
                <button type="submit" className='btn btn-add'>Add Card</button>
                &nbsp;
                <button onClick={handleBacktoDashboard} className='btn btn-details'>Back to Dashboard</button>
            </form>
        </div>
    );
}