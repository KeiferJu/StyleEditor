import React from 'react'
import { Pie, Bar, Line, Scatter } from 'react-chartjs-2';
/**
 * llcn
 * create by 2017/08/01
 */
class LayerChart extends React.Component {

  render() {
    const option = {
      legend: {
        labels: {
          fontColor: '#ffffff'
        }
      }
    }

    const data1 = {
      labels: [
        '类别1',
        '类别2',
        '类别3'
      ],
      datasets: [{
        data: [300, 300, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }]
    };

    const data2 = {
      labels: ['类别1', '类别2', '类别3', '类别4', '类别5', '类别6', '类别7'],
      datasets: [
        {
          label: '条状图',
          backgroundColor: 'rgba(255,99,132,1)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    const data3 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    const data4 = {
      labels: ['Scatter'],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [
            { x: 65, y: 75 },
            { x: 59, y: 49 },
            { x: 80, y: 90 },
            { x: 81, y: 29 },
            { x: 56, y: 36 },
            { x: 55, y: 25 },
            { x: 40, y: 18 },
          ]
        }
      ]
    };

    return  <ul className="maputnik-chart-ul">
      <li className="maputnik-chart-li">
        <Pie data={data1} options={option}/>
      </li>
      <li className="maputnik-chart-li">
        <Bar data={data2} options={option}/>
      </li>
      <li className="maputnik-chart-li">
        <Line data={data3} options={option}/>
      </li>
      <li className="maputnik-chart-li">
        <Scatter data={data4} options={option}/>
      </li>
    </ul>
  }
}

export default LayerChart
