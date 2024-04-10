import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddForm = ({ pets, setPets }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [owner, setOwner] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/v1/pets/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          age,
          breed,
          owner
        })
      })
      const newPet = await res.json();
      if (newPet[0].id) {
        setSuccessMsg("pet successfully added!")
        setPets([...pets, newPet[0]])
        setTimeout(() => navigate('/'), 1000);
      } else {
        setError(newPet.msg)
      }
    } catch (error) {
      console.error(error.message);
    }

  }

  return (
    <div>
      <h2>Add a pet:</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label> Name:</label><br />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          required /><br />
        <label> Age:</label><br />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="text"
          required /><br />
        <label> Breed:</label><br />
        <input
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          type="text"
          required /><br />
        <label> Owner:</label><br />
        <input
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          type="text"
          required /><br />
        <button>Submit pet</button>
      </form>
      {
        successMsg &&
        <p>{successMsg}</p>
      }
      {
        error &&
        <p>{error}</p>
      }
    </div>
  )
}

export default AddForm