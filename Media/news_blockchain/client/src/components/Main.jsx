import React, {Component} from 'react';

import {Route, BrowserRouter} from 'react-router-dom';
import SideNav, {NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {FaHome, FaPlusCircle} from 'react-icons/fa';
import {Navbar} from 'react-bootstrap';

import AddNews from './AddNews.jsx';
import ListNews from './ListNews.jsx';
import {Media, web3} from "./contract";

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newNews: {
        title: '',
        description: '',
        url: ''
      },
      isLoading: false,
      expanded: false,
      error: '',
      news: [],
      account: null,
      inProgress: false
    };
  }

  updateNews(key, value) {
    const news = this.state.newNews;
    news[key] = value;
    this.setState({
      newNews: news
    })
  }


  async handleNewsSubmit(event, history) {
    let newNews = this.state.newNews;
    let url_regex = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/g;
    if (typeof newNews.title === "undefined" || newNews.title.trim() === "") {
      this.setState({error: "Valid title is required"});
      return;
    }
    if (typeof newNews.description === "undefined" || newNews.description.trim() === "") {
      this.setState({error: "Valid description is required"});
      return;
    }
    if (typeof newNews.url === "undefined" || newNews.url.trim() === "" || !newNews.url.match(url_regex)) {
      this.setState({error: "Valid url is required"});
      return;
    }
    this.setState({error: '', inProgress: true});
    await this.saveNewNews(newNews);
    this.setState({
      newNews: {
        title: '',
        description: '',
        url: ''
      },
      inProgress: false
    });
    history.push('/home');
    await this.fetchNews();
  }

  async saveNewNews(newNews) {
    await Media.methods.addNews(newNews.url, newNews.title, newNews.description).send({from: this.state.account});
  }

  async upVoteNews(e, newsId) {
    await Media.methods.upVoteNews(newsId).send({from: this.state.account});
    await this.fetchNews();
  }

  async downVoteNews(e, newsId) {
    await Media.methods.downVoteNews(newsId).send({from: this.state.account});
    await this.fetchNews();
  }

  onToggle(expanded) {
    this.setState({expanded: expanded});
  }

  render() {
    const {expanded, news, isLoading, error, inProgress} = this.state;
    return (
      <BrowserRouter>
        <Route render={({location, history}) => (
          <React.Fragment>
            <div className="site-sub-wrapper">
              <SideNav className="side-nav"
                       onSelect={(selected) => {
                         const to = '/' + selected;
                         if (location.pathname !== to) {
                           history.push(to);
                         }
                       }}
                       onToggle={this.onToggle.bind(this)}
              >
                <SideNav.Toggle/>
                <SideNav.Nav selected={location.pathname.replace('/', '')} className="side-nav-sub">
                  <NavItem eventKey="home">
                    <NavIcon>
                      <FaHome/>
                    </NavIcon>
                    <NavText>
                      Home
                    </NavText>
                  </NavItem>
                  <NavItem eventKey="add_news">
                    <NavIcon>
                      <FaPlusCircle/>
                    </NavIcon>
                    <NavText>
                      Add News
                    </NavText>
                  </NavItem>
                </SideNav.Nav>
              </SideNav>
              <Navbar bg="nav" variant="dark" style={{
                marginLeft: expanded ? 240 : 64
              }}>
                <Navbar.Brand style={{marginLeft: '20px'}}>News Blockchain</Navbar.Brand>
                <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <div>

                      </div>
                    </li>
                  </ul>
                </div>
              </Navbar>
              {!isLoading &&
              <main style={{
                marginLeft: expanded ? 240 : 64,
                padding: '10px 20px 0 20px'
              }}>
                <Route path="/home" exact render={props => <ListNews
                  isLoading={isLoading} news={news} upVoteNews={this.upVoteNews.bind(this)}
                  downVoteNews={this.downVoteNews.bind(this)}
                />}/>
                <Route path="/" exact render={props => <ListNews
                  isLoading={isLoading} news={news} upVoteNews={this.upVoteNews.bind(this)}
                  downVoteNews={this.downVoteNews.bind(this)}
                />}/>
                <Route path="/add_news" render={props => <AddNews
                  updateNews={this.updateNews.bind(this)}
                  handleNewsSubmit={this.handleNewsSubmit.bind(this)}
                  inProgress={inProgress}
                  newNews={this.state.newNews} history={history} error={error}/>}/>
              </main>
              }
            </div>
          </React.Fragment>
        )}
        />
      </BrowserRouter>
    );
  }

  async fetchNews() {
    this.setState({isLoading: true});
    const count = await Media.methods.getNewsCount().call();
    let news = [];
    for (let i = 0; i < count; i++) {
      const n = await Media.methods.getNews(i).call();
      news.push({
        id: n[0], upVotes: n[1], downVotes: n[2], url: n[3], title: n[4],
        description: n[5]
      })
    }
    news.reverse();
    let account = await web3.eth.getAccounts();
    this.setState({news: news, isLoading: false, account: account[0]});

  }

  async componentDidMount() {
    await this.fetchNews();
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log(prevState, this.state);
  }

}
