import React, { Component } from "react";
import { Line } from "react-chartjs-2";

// function nextweek(){

//     for (let i = 6; i >= 0; i--) {
//       let curr = new Date
//       let first = curr.getDate() - i
//       let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
//       this.week.push(day)
//     }
//     console.log(week);
// }
class Chart extends Component {
  constructor(props) {
    super(props);
    console.log('Called Line Chart');
    console.log(this.props.chartLineData);
    console.log(this.props.chartLineLabel);
    this.state = {
      data: {
        labels: this.props.chartLineLabel,
        datasets: [
          {
            label: "Tweets",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: this.props.chartLineData,
          },
        ],
        options: {
          scales: {
            x: {
              type: "time",
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <div>
        <Line
          data={this.state.data}
          options={{
            title: {
              display: true,
              text: "Tweets per day",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "bottom",
            },
          }}
        />
      </div>
    );
  }
}
export default Chart;
