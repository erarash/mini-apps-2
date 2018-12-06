import React from "react";
import styles from "../css/App.css";
import axios from "axios";
import ReactPaginate from "react-paginate";

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
    console.log(button, "button");
    this.setState(
      {
        page: button.selected + 1
      },
      () => {
        this.getData();
      }
    );
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
            Date: {event.date}
            <br />
            <br />
            Description: {event.description}
            <br />
            <br />
            Language: {event.language}
            <br />
            <br />
            Category1: {event.category1}
            <br />
            <br />
            Category2: {event.category2}
            <br />
            <br />
            Granularity: {event.granularity}
            <br />
            <hr />
            <br />
            <br />
          </div>
        ))}
        {/* <div className={styles.pagination}>
          <button onClick={() => this.pagination("back")}> {"<< prev"} </button>
          <button onClick={() => this.pagination("next")}> {"next >>"} </button>
        </div> */}
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.pagination}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}
