/* eslint-disable react/prop-types */
const Persons = (props) => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  };

  return (
    <div>
      {props.personsToShow.map((person) => (
        <div key={person.id} style={containerStyle}>
          <p style={{ marginRight: "10px" }}>
            {person.name} {person.number}
          </p>
          <button onClick={() => props.deletePerson(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
