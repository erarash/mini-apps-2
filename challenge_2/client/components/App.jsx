import React from "react";
import axios from "axios";
import styles from "../css/App.css";
import { Bar } from "react-chartjs-2";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      values: []
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get("/api")
      .then(data => {
        this.setState({
          dates: Object.keys(data.data.bpi),
          values: Object.values(data.data.bpi)
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    let data = {
      labels: this.state.dates,
      datasets: [
        {
          label: "BitCoin values",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: this.state.values
        }
      ]
    };
    return (
      <div>
        <h1 className={styles.header}>Bitcoin chart</h1>
        <Bar data={data} />
      </div>
    );
  }
}
