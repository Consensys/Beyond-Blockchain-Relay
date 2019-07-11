import React from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

class SchemeIndex extends React.Component {

  static async getInitialProps() {
    const schemes = await factory.methods.getDeployedSchemes().call();

    return {schemes};
  }

  renderSchemes() {
    const items = this.props.schemes.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/schemes/${address}`}>
            <a>View this scheme</a>
          </Link>
        ),
        fluid: true,
      }
    });

    return <Card.Group items = {items} />
  }

  render() {
    return(
      <Layout>
        <div>
          <h3>Active Schemes</h3> 

          <Link route="/schemes/new/">
            <a>
              <Button
                floated="right"
                content="Start your Scheme here"
                icon="add circle"
                primary
             />
            </a>
          </Link>

          {this.renderSchemes()}
        </div>
      </Layout>
    );
  }
}

export default SchemeIndex;

// lecture 39
