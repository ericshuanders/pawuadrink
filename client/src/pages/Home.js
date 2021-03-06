import React from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Dogsnbeer from '../images/dogandbeer.jpg';
import swal from 'sweetalert'

const Home = () => {
  const history = useHistory();
  const handleAge = (event) => {
    event.preventDefault();

    const dob = new Date(event.target.elements.age.value);
    const now = new Date();
    if (now - dob >= 662810000000) {
      history.push('/results');
    } else {
      swal("Hmmm...","I don't think you're old enough", "warning");
    }
  };
  return (
    
    <div className="homediv">
      
      <h1 className="home-title">CAN WE PAW YOU A BEER?</h1>

      <img class="dogs-and-beer" src={Dogsnbeer} alt="dogs-and-beer" />
      <Form className= "age-input" onSubmit={handleAge}>
        <Form.Label>
          <h2 className="age-question">Are you old enough?</h2>
        </Form.Label>
        <Form.Control
          
          style={{ textAlign: 'center', color: '#3f3f44', fontFamily: "Oswald" }}
          size="lg"
          type="text"
          id="age"
          placeholder="MM/DD/YYYY"
        />
      </Form>
    </div>
    
  );
};
export default Home;
