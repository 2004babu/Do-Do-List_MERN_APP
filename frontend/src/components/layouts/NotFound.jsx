import React from 'react';
import { Link } from 'react-router-dom';
import MetaData from './MetaData';

const NotFound = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <MetaData title={'Not Found'}/>
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <p className="lead">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
