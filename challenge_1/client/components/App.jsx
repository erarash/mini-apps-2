import React from "react";
import styles from "../css/App.css";
import axios from "axios";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      data: [],
      page: 1
    };
    this.handleInput = this.handleInput.bind(this);
    this.getData = this.getData.bind(this);
    this.pagination = this.pagination.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleInput(e) {
    this.setState({
      query: e.target.value
    });
  }

  getData() {
    console.log(this.state.query);
    axios
      .get(`/events?q=${this.state.query}&_page=${this.state.page}&_limit=10`)
      .then(data => {
        this.setState({
          data: data.data
        });
        console.log(data);
      })
      .catch(err => console.error(err));
  }

  pagination(button) {
    if (button === "next") {
      this.setState(
        {
          page: this.state.page + 1
        },
        () => {
          this.getData();
        }
      );
    } else if (button === "back") {
      this.setState(
        {
          page: this.state.page - 1
        },
        () => {
          this.getData();
        }
      );
    }
  }

  render() {
    return (
      <div>
        <h1 className={styles.header}>Historical Events Finder</h1>
        <div>
          <h3 className={styles.h2}>take a peek into history</h3>
          <div className={styles.textbox}>
            <input
              onChange={e => {
                this.handleInput(e);
              }}
              type="text"
            />
            <button onClick={this.getData}>Lets Go!</button>
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
        {this.state.data.map((event, i) => (
          <div key={i} className={styles.event}>
            date: {event.date}
            <br />
            <br />
            description: {event.description}
            <br />
            <br />
            language: {event.language}
            <br />
            <br />
            category1: {event.category1}
            <br />
            <br />
            category2: {event.category2}
            <br />
            <br />
            granularity: {event.granularity}
            <br />
            <hr />
            <br />
            <br />
          </div>
        ))}
        <div className={styles.pagination}>
          <button onClick={() => this.pagination("back")}> {"<< prev"} </button>
          <button onClick={() => this.pagination("next")}> {"next >>"} </button>
        </div>
      </div>
    );
  }
}
