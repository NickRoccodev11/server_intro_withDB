import { useState } from 'react';

const Petlist = ({ pets }) => {
  const [petName, setPetName] = useState("");
  const [petDetails, setPetDetails] = useState({});
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/v1/pets/${petName.toLowerCase()}`);
      const petData = await res.json();
      if (petData[0].id) {
        setPetDetails(petData[0]);
        setError({});
      } else {
        setError(petData);
        setPetDetails({});
      }
      setPetName('');
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div id="pets">
      <h2>Our current pets:</h2>
      <ul>
        {
          pets.map(pet => {
            return <li key={pet.id}>{pet.name}</li>
          })
        }
      </ul>
      <form onSubmit={(e) => handleSubmit(e)} >
        <label>eneter a pet's name for details</label><br />
        <input
          value={petName}
          type="text"
          onChange={(e) => setPetName(e.target.value)}
        /><br />
        <button> look up pet details</button>
      </form>
      {
        petDetails.name &&
        <div className='pet-details'>
          <h3>{petDetails.name}</h3>
          <p><span>age:  </span> {petDetails.age}</p>
          <p><span>owner: </span>  {petDetails.owner}</p>
          <p> <span>breed: </span>  {petDetails.breed}</p>
        </div>
      }
      {
        error.msg &&
        <p className='response-p'>{error.msg}</p>
      }
    </div>
  )
}

export default Petlist
