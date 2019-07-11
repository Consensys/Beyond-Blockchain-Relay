import React, { Component } from "react";
import { Nav, NavItem } from "reactstrap";
import { Link, Icon } from "rimble-ui";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasBalance: false,
      balance: 0,
      stake: 0
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Nav className="mt-4 justify-content-center">
        <NavItem className="ml-2 mr-4 mt-4 pt-1 text-left ">
          <Link href="/coffeeBatches/">
            <span>
              <Icon name="Home" size="20" className="mr-2" />
              Coffee Batches
            </span>
          </Link>
        </NavItem>
        <NavItem className="ml-2 mr-4 mt-4 pt-1 text-left ">
          <Link href="/cooperatives/">
            <span>
              <Icon name="People" size="20" className="mr-2" />
              Cooperatives
            </span>
          </Link>
        </NavItem>
        <NavItem className="ml-2 mr-4 mt-4 pt-1 text-left ">
          <Link href="/">
            <span>
              <Icon name="Settings" size="20" className="mr-1 " />
              Settings
            </span>
          </Link>
        </NavItem>
      </Nav>
    );
  }
}

export default Header;
