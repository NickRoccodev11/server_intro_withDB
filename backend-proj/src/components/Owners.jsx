import { useState } from 'react';

const Owners = ({ pets }) => {
  const [owner, setOwner] = useState('');
  const [ownerInfo, setOwnerInfo] = useState({});
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/v1/pets/owner?owner=${owner.toLowerCase()}`);
      const ownerData = await res.json();
      if (ownerData[0].id) {
        setOwnerInfo(ownerData[0]);
        setError({});
      } else {
        setError(ownerData);
        setOwnerInfo({});
      }
      setOwner('');
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <h2>list of owners:</h2>
      <ul>
        {
          pets.map(pet => {
            return <li key={pet.id}>{pet.owner}</li>
          })
        }
      </ul>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label > type in an owner's name to see their pet</label><br />
        <input
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          type="text" /><br />
        <button>submit owner name</button>
      </form>
      {
        ownerInfo.name &&
        <p className='response-p'>{ownerInfo.owner} owns {ownerInfo.name}</p>
      }
      {
        error.msg &&
        <p className='response-p'>{error.msg}</p>
      }
    </div>
  )
}

export default Owners
