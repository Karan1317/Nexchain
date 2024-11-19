import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to NeXchain</h1>
          <p className="hero-subtitle">
            Streamlining the supply chain management for electronics.
          </p>
          <Button className="cta-button" size="lg">
            Get Started
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <Row>
          <Col md={4} className="feature">
            <i className="bi bi-truck"></i>
            <h3>Efficient Logistics</h3>
            <p>
              Optimize and manage your logistics with real-time tracking and smart routing.
            </p>
          </Col>
          <Col md={4} className="feature">
            <i className="bi bi-box-seam"></i>
            <h3>Inventory Management</h3>
            <p>
              Maintain optimal stock levels and automate restocking to meet demand.
            </p>
          </Col>
          <Col md={4} className="feature">
            <i className="bi bi-graph-up-arrow"></i>
            <h3>Analytics & Reporting</h3>
            <p>
              Gain insights into supply chain operations and make data-driven decisions.
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;