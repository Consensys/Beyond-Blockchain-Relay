import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = props => <div>
    {props.renderNavbar('404')}
        <h1 className="title-text--bold">404</h1>
        <h1 className="title-text">Your page was not found</h1>
        <Link to="/supply">
            <button className="button">Deposit more</button>
        </Link>
        <Link to="/dashboard">
            <button className="button">View earnings</button>
        </Link>
    </div>;

export default NotFoundPage;
