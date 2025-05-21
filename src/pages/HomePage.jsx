import Navbar from "../components/Navbar"
import Slide from "../components/Slide"
import Categories from "../components/Categories"
import Listings from "../components/Listings"
import Footer from "../components/Footer"
import { Col, Container,Row } from "react-bootstrap"
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"


const HomePage = () => {
  return (
    <>
      <Navbar />
      <Slide />
          
  <Container className="py-5">
      <Row className="align-items-center">
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Img
              variant="top"
              src="https://img.freepik.com/premium-photo/minimalist-architecture-white-building-facade-with-clean-lines-no-distractions_86390-18558.jpg"
              alt="Modern Building"
            />
          </Card>
        </Col>
        <Col md={6}>
          <h2>Find Your Dream Property At The Best Price</h2>
          <p>
            We support our clients at every stage of the buying and selling
            process, ensuring a seamless and stress-free experience from start
            to finish.
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={3}>
          <Card className="text-center p-3 shadow-sm border-0">
            <h3>100k+</h3>
            <p>Property Constructed</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 shadow-sm border-0">
            <h3>100+</h3>
            <p>Award Winning</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 shadow-sm border-0">
            <h3>50K+</h3>
            <p>Satisfied Clients</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 shadow-sm border-0">
            <h3>5+</h3>
            <p>Years of Experience</p>
          </Card>
        </Col>
      </Row>
    </Container>
      <Categories />
      <Listings />
      <Container className="py-5">
      <h2 className="text-center mb-4">Highlights of Our Real-Estate Expertise</h2>
      <Row className="g-4">
        
          <Col md={4} sm={6} >
            <Card className="text-center p-3 shadow-sm">
              <Card.Body>
              <i class="fa-regular fa-message"></i>
                <Card.Title>Negotiation Skills</Card.Title>
                <Card.Text>In-depth understanding of market trends to guide pricing and strategy.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={6} >
            <Card className="text-center p-3 shadow-sm">
              <Card.Body>
              <i class="fa-solid fa-people-arrows"></i>
                <Card.Title>Post-Sale Support</Card.Title>
                <Card.Text>Providing assistance even after the sale, ensuring clients feel supported throughout their journey.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={6} >
            <Card className="text-center p-3 shadow-sm">
              <Card.Body>
              <i class="fa-solid fa-scale-unbalanced-flip"></i>
                <Card.Title>Legal Assistance</Card.Title>
                <Card.Text>Helping clients navigate the complexities of legal paperwork to ensure a smooth transaction.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        
      </Row>
      
    </Container>
     <Container className="py-4">
      <Row className="g-4">
        
          <Col md={4} sm={6} >
            <Card className="text-center p-3 shadow-sm">
              <Card.Body>
              <i class="fa-solid fa-volume-high"></i>
                <Card.Title>Tailored Marketing Plans</Card.Title>
                <Card.Text>Developing customized strategies to showcase properties and attract buyers.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={6} >
            <Card className="text-center p-3 shadow-sm">
              <Card.Body>
              <i class="fa-solid fa-chart-simple"></i>
                <Card.Title>Market Analysis</Card.Title>
                <Card.Text>In-depth understanding of market trends to guide pricing and strategy.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={6} >
            <Card className="text-center p-3 shadow-sm">
              <Card.Body>
              <i class="fa-solid fa-envelope"></i>
                <Card.Title>Property Valuation</Card.Title>
                <Card.Text>Accurate assessments to determine the true value of your favourite apartment, cottage etc.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        
      </Row>
      
    </Container>
    
     <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6}>
          <img
            src="https://cdn.pixabay.com/photo/2019/04/02/20/45/landscape-4098802_1280.jpg" 
            alt="Modern House"
            className="img-fluid rounded"
          />
        </Col>
        <Col md={6}>
          <Card className="p-4 shadow-lg border-0 rounded">
            <Card.Body>
              <Card.Title as="h2" className="mb-3">
                What Makes Us Your Ideal Real Estate Partner?
              </Card.Title>
              <Card.Text>
                Our knowledgeable team provides trusted expertise for informed real
                estate decisions, offering tailored support to meet your unique
                needs and demonstrating proven success through a strong track record
                of client satisfaction.
              </Card.Text>
              <Link className='btn btn-dark' to={'/contact'}>Contact</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>

      <Footer />
    </>
  )
}

export default HomePage