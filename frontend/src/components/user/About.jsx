import React from 'react';
import MetaData from '../layouts/MetaData';

const About = () => {
  return (
    <div className="container mt-5">
      <MetaData title={'About '}/>
      <div className="card">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img 
              src="./images/Unknown_person.jpg" 
              className="card-img " 
              alt="About page " 
            />
          </div>
          <div className="col-md-8  row d-flex justify-content-center align-items-center">
            <div className="card-body ">
              <h5 className="card-title">About Me</h5>
              <p className="card-text">
                I Am Babu <br/>
                learn new things is my hobby..
              </p>
              <a 
                href="https://github.com/2004babu" 
                className="btn btn-primary" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Visit my GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
