import { useState } from 'react'
import styles from '../CSS/styles.module.css'

function Social_media({ person }){
    return(
        <div className={styles.socialLinks}>
        {person.linkedin && <a href={person.linkedin} className='btn btn-social' target="_blank" rel="noopener noreferrer">Linkedin</a>}
        &nbsp;
        {person.instagram && <a href={person.instagram} className='btn btn-social' target="_blank" rel="noopener noreferrer">Instagram</a>}
        &nbsp;
        {person.twitter && <a href={person.twitter} className='btn btn-social'target="_blank" rel="noopener noreferrer">Twitter</a>}
        </div>
    );
}

export default function Card({ person, index }){

    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className={styles.collapsible}>
            <div className={styles.collapsible_content}>
                <h3>Card {index + 1}: {isExpanded ? '' : person.name}</h3>
                <button onClick={handleToggle} className="btn btn-details">
                    {isExpanded ? 'Hide Details' : 'Show Details'}
                </button>
            </div>
            {isExpanded && (
                <div className={styles.card}>
                    <h2 className={styles.name}>{person.name}</h2>
                    <p className={styles.description}>{person.description}</p>
                    <h3 className={styles.interestsHeader}>Interests:</h3>
                    <ul className={styles.interestsList}>
                        {person.interests.map((interest) => (<li key ={interest} className={styles.interestItem}>{interest}</li>))}
                    </ul>
                    <Social_media person={person} />
                    <br />
                </div>
            )}
        </div>
    );
}


