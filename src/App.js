import { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
function App() {
  const [dogs, setDogs] = useState([]);
  const [searchResultDogs, setSearchResultDogs] = useState([]);
  const [searchQueryString, setSearchQueryString] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
      .catch((error) => {
        setIsError(true);
        console.log(error);
      })
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      );
  };

  return (
    <Container style={{ textAlign: "center", p: 5 }}>
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
      <Container style={{ textAlign: "center", marginBottom: "20px" }}>
        {!isLoading && (
          <>
            {isError ? (
              <Card sx={{height:40}}>Something went wrong with API Call</Card>
            ) : searchResultDogs.length > 0 ? (
              searchResultDogs.map(([key, value]) => (
                <Row key={key}>
                  <Col style={{ border: "1px solid #000000", margin: "3px" }}>
                    {key.toUpperCase()}
                  </Col>
                  <Col style={{ border: "1px solid #000000", margin: "3px" }}>
                    {value.length > 0 && (
                      <>
                        {value.map(
                          (breed, index) =>
                            `${breed.toUpperCase()}${
                              index !== value.length - 1 ? ", " : ""
                            }`
                        )}
                      </>
                    )}
                  </Col>
                </Row>
              ))
            ) : (
              <Card>Nothing found</Card>
            )}
          </>
        )}
        {isLoading && <CircularProgress />}
      </Container>
    </Container>
  );
}

export default App;
