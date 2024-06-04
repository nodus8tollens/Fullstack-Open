const Display = (props) => {
  for (let key in props.country.languages) {
    console.log(key, props.country.languages[key]);
  }
  return (
    <>
      <h1>{props.country.name.common}</h1>
      <p>capital {props.country.capital}</p>
      <p>area {props.country.area}</p>
      <br />
      <p>
        <b>languages</b>
      </p>
      <ul>
        {Object.keys(props.country.languages).map((languageCode) => (
          <li key={languageCode}>{props.country.languages[languageCode]}</li>
        ))}
      </ul>
      <br />
      <img src={props.country.flags.png} alt={props.country.flags.alt} />
    </>
  );
};

export default Display;
