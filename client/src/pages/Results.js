import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Row, Col, Button, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import classNames from 'classnames';
import Searchbar from '../components/Searchbar';
import Navigation from '../components/Navbar';
import dog from '../images/dog.jpg';
import brewdog from '../images/dogs.jpg';
import { motion } from 'framer-motion';

const Results = ({ search, apiData, setSearch, setApiData }) => {
  const [sortOptions, setSortOptions] = useState({
    sortKey: 'abv',
    sortDirection: 'asc'
  });
  const handleSubmit = (event) => {
    
    if (event.key === 'Enter') {
      setSearch(event.target.value);
    }
    console.log(event.target.value);
    console.log(event.key);
  };

  
  const handleSortClick = (sortKey, sortDirection) => {
    setSortOptions({ sortKey, sortDirection });
  };

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(
        `https://api.punkapi.com/v2/beers?beer_name=${search}`
      );
      const data = await response.json();

      setApiData(data);
    };

    try {
      fetchResults();
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  const sortedBreweries = apiData.sort(function (a, b) {
    const aValue = a[sortOptions.sortKey];
    const bValue = b[sortOptions.sortKey];

    return sortOptions.sortDirection === 'asc'
      ? aValue - bValue
      : bValue - aValue;
  });

  const isActiveSortOption = (sortKey, sortDirection) => {
    return (
      sortKey === sortOptions.sortKey &&
      sortDirection === sortOptions.sortDirection
    );
  };

  return (
    <div className="results-wrapper">
      <Navigation />
      <div className="main">
        <div className="results-dogs-div">
          <img className="results-dogs" src={brewdog} alt="brewdog" />
        </div>

        <div class="fast">
          Let us paw{' '}
          <span role="img" alt="dog paw">
            🐾
          </span>{' '}
        </div>
        <div class="flicker"> you a drink ! </div>

        <div className="searchdiv">
          <Searchbar className="search" submit={handleSubmit} />
        </div>

        <div className="buttondiv">
          <div className="button-div-ABV">
          <Button
            variant="outline-dark"
            className={classNames({ active: isActiveSortOption('abv', 'asc') })}
            onClick={() => handleSortClick('abv', 'asc')}
          >
            Sort by ABV - ASC
          </Button>{' '}
          <Button
            variant="outline-dark"
            className={classNames({
              active: isActiveSortOption('abv', 'desc')
            })}
            onClick={() => handleSortClick('abv', 'desc')}
          >
            Sort by ABV - DESC
          </Button>{' '}
          </div>
          <div className="button-div-IBU">
          <Button
            variant="outline-dark"
            className={classNames({ active: isActiveSortOption('ibu', 'asc') })}
            onClick={() => handleSortClick('ibu', 'asc')}
          >
            Sort by IBU - ASC
          </Button>
          <Button
            variant="outline-dark"
            className={classNames({
              active: isActiveSortOption('ibu', 'desc')
            })}
            onClick={() => handleSortClick('ibu', 'desc')}
          >
            Sort by IBU - DESC
          </Button>
          </div>
        </div>

        <Container>
          <Row className="beer-row" xs={2} md={3} lg={4}>
    

            {sortedBreweries &&
              sortedBreweries.map((beer) => (
                <Col className="beer-card-wrapper">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 1 }}
                  >
                    <Card
                      className="beer-card"
                      bg="dark"
                      text="white"
                      border="dark"
                      key={beer.id}
                      style={{ width: 200, margin: 5 }}
                    >
                      <Link to={`/beers/${beer.id}`}>
                        <Card.Img
                          variant="top"
                          src={beer.image_url == null ? dog : beer.image_url}
                          alt={beer.name}
                          
                        />
                      </Link>

                      <Card.Body>
                        <Card.Title>{beer.name}</Card.Title>
                        <Card.Text>
                          <p>
                            <b>Beer IBU:</b> {beer.ibu}
                          </p>
                          <p>
                            <b>Beer ABV:</b> {beer.abv}%
                          </p>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default Results;
