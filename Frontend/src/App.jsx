import { useState, useEffect }from 'react'
import { useParams } from 'react-router-dom';
import Card from './Components/Card' 

export function CardID(){
  const [cards, setCards] = useState([]);

  const { cardId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/users/cards/${cardId}`)
      .then(response => response.json())
      .then(data => {
        setCards(data.Cards);
      });
  }, [cardId]);

  if(!cardId){
    return <div>Loading card...</div>;
  }

  return (
    <div>
      <Card
        key={cards._id}
        person={cards}
        index={0}
      />
    </div>
  );
}

export default function App() {

  const [cards, setCards] =useState([]);

  useEffect(() => {
    
    fetch('http://localhost:3000/users/cards')
      .then(response => response.json())
      .then(data => {
        setCards(data.Cards);
      });
  }, []); // <-- IMPORTANT: The empty array tells React to run this effect only once.

  return (
    <>
    {cards.map((card, index) => {
      return(
        <Card
        key={card._id}
        person={card}
        index = {index}
      />
      );
    })}
    </>
  );
}


