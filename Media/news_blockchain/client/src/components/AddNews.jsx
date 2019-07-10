import React, {Component} from 'react';
import Button from 'react-bootstrap-button-loader';

export default class AddNews extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {updateNews, handleNewsSubmit, newNews, error, inProgress} = this.props;
    return (
      <div className="new-news">
        <div className="col-md-8">
          <br/>
          <p className="h3">Add News</p>
          <br/>
          <input type="text" className="form-control"
                 value={newNews.title}
                 onChange={e => updateNews('title', e.target.value)}
                 placeholder="Title" required={true}
          />
          <br/>
          <input type="text" className="form-control"
                 value={newNews.description}
                 onChange={e => updateNews('description', e.target.value)}
                 placeholder="Description" required={true}
          />
          <br/>
          <input type="url" className="form-control"
                 value={newNews.url}
                 onChange={e => updateNews('url', e.target.value)}
                 placeholder="Url" required={true}
          />
          <br/>
        </div>
        <div className="col-md-12">
          <Button variant="secondary"
            onClick={e => handleNewsSubmit(e, this.props.history)}
            loading={inProgress}
          >
            Submit
          </Button>
          <br/>
          <br/>
          {error && <div>Error: {error}</div>}
        </div>

      </div>
    )
  }
}
