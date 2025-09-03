import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styles from '../CSS/authForm.module.css'

export default function Signin(){
    // Used a single state object to hold all form data
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

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

        try {
            const response = await fetch('http://localhost:3000/admin/signin',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if(response.ok){
                // Save the token to localStorage
                localStorage.setItem('token', data.token);

                alert('Sign-in successful!');

                navigate('/admin/dashboard');
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
                <h1 className={styles.auth_title}>Admin Sign-In</h1>
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
                    <button type="submit" className={styles.auth_button}>Sign In</button>
                </form>
            </div>    
        </div>
    );
}
