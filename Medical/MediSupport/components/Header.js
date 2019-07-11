import React from "react";
import { Menu, MenuMenu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
    return(
        <Menu style={{ marginTop: "10px" }}>
            <Link route="/">
                <a className="item">
                    MediSupport
                </a>
            </Link>

            <Menu.Menu position="right">

            <Link route="/">
                <a className="item">
                   Active Schemes
                </a>
            </Link>

            <Link route="/schemes/new">
                <a className="item">
                    + 
                </a>
            </Link>

            </Menu.Menu>
        </Menu>
    );
}