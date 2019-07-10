import React, {Component} from 'react';
import {Card, Modal, FormControl, ListGroup} from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import StackGrid from 'react-stack-grid';
import sizeMe from 'react-sizeme';
import {FaArrowUp, FaArrowDown, FaExternalLinkAlt, FaListAlt} from 'react-icons/fa';
import {Media, web3} from "./contract";

class ListNews extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      facts: [],
      newsId: '',
      account: null,
      factText: '',
      inProgress: false
    };
  }

  truncate(s, max) {
    if (s.length > max) {
      s = s.slice(0, max) + "...";
    }
    return s;
  }

  handleClose() {
    this.setState({show: false, newsId: '', factText: '', facts: []});
  }

  async handleShow(event, newsId) {
    this.setState({show: true, newsId: newsId});
    await this.fetchNewsFacts(newsId);
  }

  async fetchNewsFacts(newsId) {
    const newsFactCount = await Media.methods.getNewsFactCount(newsId).call();
    let facts = [];
    for (let i = 0; i < newsFactCount; i++) {
      const fact = await Media.methods.getNewsFact(newsId, i).call();
      facts.push({id: fact[0], upVotes: fact[1], downVotes: fact[2], text: fact[3]})
    }
    facts.reverse();
    let account = await web3.eth.getAccounts();
    this.setState({facts: facts, account: account[0]});
  }

  async submitNewsFact(event) {
    this.setState({
      inProgress: true
    });
    await Media.methods.addNewsFact(this.state.newsId, this.state.factText).send({from: this.state.account});
    this.setState({
      factText: '',
      inProgress: false
    });
    await this.fetchNewsFacts(this.state.newsId);
  }

  updateNewsFact(value) {
    this.setState({
      factText: value
    });
  }

  async upVoteNewsFact(e, factId) {
    await Media.methods.upVoteNewsFact(this.state.newsId, factId).send({from: this.state.account});
    await this.fetchNewsFacts(this.state.newsId);
  }

  async downVoteNewsFact(e, factId) {
    await Media.methods.downVoteNewsFact(this.state.newsId, factId).send({from: this.state.account});
    await this.fetchNewsFacts(this.state.newsId);
  }

  render() {
    const {isLoading, size, news, upVoteNews, downVoteNews} = this.props;
    const {width} = size;
    const {show, facts, factText} = this.state;
    return (
      <div className="col-md-12 news">
        <br/>
        <p className="h3" style={{textTransform: 'capitalize'}}>News</p>
        <br/>
        {isLoading && <span>Fetching News...</span>}
        <StackGrid columnWidth={width <= 768 ? '100%' : '33.33%'} gutterWidth={10} gutterHeight={10} duration={0}>
          {news.map((n) => (

              <Card key={n.id + width}>
                <Card.Body>
                  <Card.Title style={{textTransform: 'capitalize'}}>{this.truncate(n.title, 100)}</Card.Title>
                  <Card.Text>
                    {this.truncate(n.description, 200)}
                  </Card.Text>
                  <div style={{float: 'right'}}>
                    <FaArrowUp onClick={e => upVoteNews(e, n.id)} style={{cursor: 'pointer'}}/>{n.upVotes}
                    <br/>
                    <FaArrowDown onClick={e => downVoteNews(e, n.id)} style={{cursor: 'pointer'}}/>{n.downVotes}
                  </div>
                  <a href={n.url} target="_blank"><FaExternalLinkAlt/></a>
                  <br/>
                  <FaListAlt onClick={e => this.handleShow(e, n.id)} style={{cursor: 'pointer'}}/>
                </Card.Body>
              </Card>
            )
          )}
        </StackGrid>
        {!isLoading && !news.length && <span>Add a news to get started</span>}
        <br/>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Facts</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{maxHeight: 'calc(100vh - 210px)', overflowY: 'auto'}}>
            <FormControl as="textarea" aria-label="With textarea" value={factText}
                         onChange={e => this.updateNewsFact(e.target.value)}/>
            <br/>
            <Button variant="secondary" onClick={e => this.submitNewsFact(e)} loading={this.state.inProgress}>
              Add Fact
            </Button>
            <br/>
            <br/>
            <ListGroup>
              {facts.map((fact) => (
                  <ListGroup.Item key={fact.id}>
                    {fact.text}
                    <br/>
                    <div>
                      <FaArrowUp onClick={e => this.upVoteNewsFact(e, fact.id)}
                                 style={{cursor: 'pointer'}}/>{fact.upVotes}
                      <br/>
                      <FaArrowDown onClick={e => this.downVoteNewsFact(e, fact.id)}
                                   style={{cursor: 'pointer'}}/>{fact.downVotes}
                    </div>
                  </ListGroup.Item>
                )
              )}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

}

export default sizeMe({monitorHeight: true})(ListNews);
