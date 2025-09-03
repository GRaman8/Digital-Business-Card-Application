import { useState,useEffect } from 'react'
import Card from "../Components/Card"
import { useNavigate, Link } from "react-router-dom"
import styles from '../CSS/styles.module.css'

export default function AdminDashboard(){

    const [cards, setCards] =useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {

        const fetchAdminCards = async () => {

            

            if (!token) {
                console.error("No token found. User is not authenticated.");
                // You could also redirect to the signup page here
                alert("You are not authenticated. Please Sign-up.");
                navigate("/signup");
                return;
            }
        
            try{

                const response = await fetch('http://localhost:3000/admin/cards', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',

                        'Authorization': `Bearer ${token}`
                    }
                });

                if(response.ok){
                    const data = await response.json();
                    setCards(data.Cards);
                }
                else{
                    console.error("Failed to fetch admin cards");
                }
            } catch(error){
                console.error("An error occurred:", error);
            }

        };

        fetchAdminCards();

    }, [navigate]); // <-- IMPORTANT: The empty array tells React to run this effect only once.

    const handlewholecardDelete = async (cardId) => {

        if(!window.confirm("Are you sure you want to delete this card?")){
            return;
        }

        
        try {
            const response = await fetch(`http://localhost:3000/admin/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    // 'Content-Type': 'application/json',

                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response);

            if(response.ok){
                setCards(currentCards => currentCards.filter(card => card._id !== cardId));
                alert("Whole Card is deleted Successfully!");
            }
            else{
                const errorData = await response.json()
                alert(`Failed to delete card: ${errorData.message}`);
            }
        } catch(error){
            console.error("An error occurred during deletion:", error);
        }
    };

    const handleDeleteInterest = async (cardId) => {
        
        const interestToDelete = window.prompt("Enter the exact interest you want to delete from the card:");

        if(!interestToDelete){     // User cancelled or entered nothing
            return;
        }

        // Input Validation Logic
        const cardToUpdate = cards.find(card => card._id === cardId);

        if(!cardToUpdate || !cardToUpdate.interests?.includes(interestToDelete)) {
            alert(`'${interestToDelete}' doesn't exist in this card's interests. Please enter an exact match.`);
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/admin/cards/${cardId}/interests`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ interests: interestToDelete })
            });

            if(response.ok){
                // To update the UI, we find the card and filter its interests array
                setCards(currentCards => currentCards.map(card => {
                    if(card._id === cardId){
                        const updateInterests = card.interests.filter(interest => interest !== interestToDelete);
                        return {...card, interests: updateInterests};
                    }
                    return card;
                }));
                alert(`${interestToDelete} deleted successfully from the card`);
            }
            else{
                alert("Failed to delete the given interests.");
            }
        } catch(error){
            console.error("Error deleting interest:", error);
        }
    };

    const handleDeleteField = async (cardId) =>{
        const fieldsToDelete = window.prompt("Enter the fields you want to delete from the card (e.g., linkedin, twitter):");

        if(!fieldsToDelete){      // User cancelled or entered nothing
            return;
        }

        // Input Validation Logic
        const cardToUpdate = cards.find(card => card._id === cardId);

        if(!cardToUpdate || !(fieldsToDelete in cardToUpdate)){
            alert(`'${fieldsToDelete}' field doesn't exist on this card. Please enter a valid field name.`);
            return;
        }

        try{
            const response = await fetch(`http://localhost:3000/admin/cards/${cardId}/fields`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ fieldsToDelete: [fieldsToDelete] })
            });

            if(response.ok){
                setCards(currentCards => currentCards.map(card => {
                    if(card._id === cardId){
                        const newCard = {...card};
                        delete newCard[fieldsToDelete];
                        return newCard;
                    }
                    return card;
                }));
                alert(`${fieldsToDelete} deleted from the card successfully!`);
            }
            else{
                alert("Failed to delete the given fileds.");
            }
        } catch(error){
            console.error("Error deleting fields:", error);
        }
    };


    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Link to={'/admin/add'}>
                <button className="btn btn-add">Add Card</button>
            </Link>
            <div>
            {cards.map((card, index) => {
                return (
                    <div key={card._id}>
                        <Card person={card} index={index} />
                        <br />
                        <Link to={`/admin/edit/${card._id}`}>
                            <button className="btn btn-edit">Edit</button>
                        </Link>
                        &nbsp;
                        <div className={styles.dropdown}>
                            <button className="btn btn-delete">Delete</button>
                            <div className={styles.dropdown_content}>
                                <button href='#' onClick={() => handlewholecardDelete(card._id)}>Whole Card</button>
                                <button href='#' onClick={() => handleDeleteInterest(card._id)}>Interest Section</button>
                                <button href='#' onClick={() => handleDeleteField(card._id)}>Field Section</button>
                            </div>
                        </div>
                        <hr />
                   </div>
                );
            })}
            </div>
        </div>
    );
}