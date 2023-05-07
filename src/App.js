import { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

function App() {
  const [dogs, setDogs] = useState([]);
  const [searchResultDogs, setSearchResultDogs] = useState([]);
  const [searchQueryString, setSearchQueryString] = useState([]);

  useEffect(() => {
    getApiResponse();
  }, []);

  useEffect(() => {
    searchQueryString.length === 0
      ? setSearchResultDogs(dogs)
      : (() => {
          const regex = new RegExp(`^${searchQueryString}`, "i");
          setSearchResultDogs(dogs.filter((str) => regex.test(str)));
        })();
  }, [searchQueryString, dogs]);

  const getApiResponse = () => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => {
        setDogs(Object.entries(data.message));
        setSearchResultDogs(Object.entries(data.message));
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container sx={{ textAlign: "center", p: 5 }}>
      <Card sx={{ m: 5, p: 3 }} elevation={10}>
        <TextField
          id="searchQuery"
          label="Search Dogs"
          variant="filled"
          fullWidth
          onChange={(e) => {
            setSearchQueryString(e.target.value);
          }}
        />
      </Card>
      <Container style={{ marginBottom: "20px" }}>
        {searchResultDogs.map(([key, value]) => (
          <Row key={key}>
            <Col style={{ border: "1px solid #000000", margin: "3px" }}>
              {key.toUpperCase()}
            </Col>
            <Col style={{ border: "1px solid #000000", margin: "3px" }}>
              {value.length > 0 &&
                (() => {
                  let string = "";
                  value.map((breed) => (string += breed.toUpperCase() + ", "));
                  return <>{string}</>;
                })()}
            </Col>
          </Row>
        ))}
      </Container>
    </Container>
  );
}

export default App;
