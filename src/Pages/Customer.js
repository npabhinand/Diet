import React from "react";
import UserNav from '../components/UserNav';
import { Image,Carousel } from 'react-bootstrap';

// import Home from "./Home"
function Customer() {
  // const [selectedComponent, setSelectedComponent] = useState(<Home />);

  return (  
    <div>
      <UserNav/>
      <Carousel>
      <Carousel.Item interval={500}>
      <Image src="./background1.jpg" style={{  top: 0, left: 0, width: '75%', height: '50%', }} />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
      <Image src="./background1.jpg" style={{  top: 0, left: 0, width: '75%', height: '50%', zIndex: -1 }} />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <Image src="./background1.jpg" style={{top: 0, left: 0, width: '75%', height: '50%', zIndex: -1 }} />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      </div>
  )
}
export default Customer