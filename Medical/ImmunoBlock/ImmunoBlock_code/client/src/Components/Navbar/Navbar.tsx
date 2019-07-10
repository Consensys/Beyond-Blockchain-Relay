import React, { Component, FunctionComponent } from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';

import pinkHeart from './pink_heart.png';


const NavbarFrame = styled.div`
    @media (min-width: 1024px) {
        padding: 2%;
    }
`;
const ImmunoName = styled.div`
    padding: 0px 10%;
`;
interface INavbarProps {
    uport: any;
    cookies: Cookies;
}
interface INavbarState {
    burgerMenuActive: boolean;
    logoutPopUp: boolean;
}
class Navbar extends Component<INavbarProps, INavbarState> {
    /**
     * @ignore
     */
    constructor(props: any) {
        super(props);
        this.state = {
            burgerMenuActive: false,
            logoutPopUp: false,
        };
    }

    public toogleBurgerMenu = () => {
        this.setState((state) => ({
            burgerMenuActive: !state.burgerMenuActive,
        }));
    }

    public tooglePopUpLogout = (event: any) => {
        this.setState((state) => ({
            logoutPopUp: !state.logoutPopUp,
        }));
    }

    public handleLogout = (event: any) => {
        const { uport, cookies } = this.props;
        uport.logout();
        window.location.reload();
        cookies.remove('did');
    }

    /**
     * @ignore
     */
    public render() {
        const { burgerMenuActive } = this.state;
        const activeBurgerMenu = (burgerMenuActive) ? ('is-active') : ('');
        return (<NavbarFrame>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://immunoblock.netlify.com/">
                        <img src={pinkHeart} height="28" alt="immunoblock pink heart" />
                        <ImmunoName>ImunnoBlock</ImmunoName>
                    </a>
                    <a
                        role="button"
                        className={'navbar-burger burger ' + activeBurgerMenu}
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        onClick={this.toogleBurgerMenu}
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </a>
                </div>

                <div id="navbarBasicExample" className={'navbar-menu ' + activeBurgerMenu}>
                    <div className="navbar-end">
                        <a className="navbar-item" href="/">Home</a>
                        <a className="navbar-item" href="#">How it works</a>
                        <a className="navbar-item" href="#">About</a>
                        <div className="navbar-item">{this.renderAuth()}</div>
                    </div>
                </div>
            </nav>
            <Modal
                handleClose={this.tooglePopUpLogout}
                handleLogout={this.handleLogout}
                show={this.state.logoutPopUp}
            />
        </NavbarFrame>);
    }

    private renderAuth() {
        const { uport, cookies } = this.props;
        // load uport status from browser
        uport.loadState();
        const username = uport.state.name;
        // if the user is logged, say hello!
        if (username !== undefined) {
            return <div>Welcome, <strong onClick={this.tooglePopUpLogout}>{username}</strong></div>;
        } else if (cookies.get('did') === 'demo') {
            return <div>Welcome, <strong onClick={this.tooglePopUpLogout}>Demo</strong></div>;
        }
     }
}

const Modal: FunctionComponent<{
    handleClose: any, handleLogout: any, show: boolean,
}> = ({ handleClose, handleLogout, show }) => {
    const showHideClassName = show ? 'modal is-active' : 'modal';

    return (
        <div className={showHideClassName}>
            <div className="modal-background" />
            <div className="modal-content">
                <div className="box">
                    <article className="media">
                        <div className="media-left">
                            <figure className="image is-64x64">
                                <img
                                    src="https://bulma.io/images/placeholders/128x128.png"
                                    alt="modal placeholder"
                                />
                            </figure>
                        </div>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    Do you really want to <strong>leave</strong>?
                                        <br />
                                    <button className="button is-danger" onClick={handleLogout}>Yes</button>
                                    <button className="button is-primary">No</button>
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={handleClose} />
        </div>
    );
};

export default Navbar;
