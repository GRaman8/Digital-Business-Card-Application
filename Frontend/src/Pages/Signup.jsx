import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styles from '../CSS/authForm.module.css'

export default function Signup(){
    // Used a single state object to hold all form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        adminkey: ''
    });

    // Call the hook at the top of your component to get the navigate function.
    const navigate = useNavigate();

    // Created a single, reusable function to handle changes for ALL inputs
    const handleChange = async (e) =>{
        e.preventDefault();
        const {name, value}  = e.target;
        setFormData(prevFormData => ({
            ...prevFormData, // Copy the old state
            [name]: value,  // Overwrite the specific field that changed
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.password !== formData.confirmPassword){
            alert("Passwords do not match!");
            return;
        }

        

        try {
            const response = await fetch('http://localhost:3000/admin/signup',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if(response.ok){
                alert(data.message);

                // Call the navigate function to go to the sigin page
                navigate('/signin');
            }
            else{
                alert(`Error: ${data.message}`);
            }
        } catch(error){
            console.error('Signup failed: ', error);
            alert('An error occurred during signup. Please try again.');
        }
    };

    return(
        <div className={styles.auth_container}>
            <div className={styles.auth_form_wrapper}>
                <h1 className={styles.auth_title}>Admin Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.form_group}>
                        <label className={styles.form_label}>Email:</label>
                        <input
                            type="email"
                            name="email"
                            className={styles.form_input}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label className={styles.form_label}>Password:</label>
                        <input
                            type="password"
                            name="password"
                            className={styles.form_input}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label className={styles.form_label}>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className={styles.form_input}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label className={styles.form_label}>Admin Key:</label>
                        <input 
                            type="text"
                            name="adminkey"
                            className={styles.form_input}
                            value={formData.adminkey}
                            onChange={handleChange}
                            reqiured ="true"
                        />
                    </div>
                    <button type="submit" className={styles.auth_button}>Sign Up</button>
                </form>    
            </div>
        </div>
    );
}
