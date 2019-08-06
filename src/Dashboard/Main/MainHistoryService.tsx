// import rand from 'lodash/random'
import { random } from 'lodash'
import moment from 'moment'

export default {
  getRandomNumber(min = 0, max = 1): number {
    return random(min, max)
  },
  getChartData(): Chart.ChartData {
    interface ChartDataSet extends Chart.ChartDataSets {
      data: number[]
    }

    const timeFormat = 'MM/DD/YYYY'

    const today = moment().startOf('day')
    const oneMonthAgo = moment(today).subtract(15, 'days')

    const labels: string[] = []
    const signups: ChartDataSet = {
      type: 'bar',
      label: 'Signups',
      backgroundColor: '#e8e8e8',
      data: [],
    }
    const ordersCount: ChartDataSet = {
      type: 'line',
      label: 'Number of orders',
      backgroundColor: '#1e88e5',
      borderColor: '#1e88e5',
      fill: false,
      data: [],
    }
    const ordersSum: ChartDataSet = {
      type: 'line',
      label: 'Total orders $',
      backgroundColor: '#95de3c',
      borderColor: '#95de3c',
      fill: false,
      data: [],
      yAxisID: 'y-axis-2',
    }

    for (let now = moment(oneMonthAgo); now.isSameOrBefore(today); now.add(1, 'day')) {
      labels.push(now.format(timeFormat))

      const signupsValue = random(10, 150)
      const ordersCountValue = random(0, 25)
      const ordersSumValue = random(10, 315)

      signups.data.push(signupsValue)
      ordersCount.data.push(ordersCountValue)
      ordersSum.data.push(ordersSumValue)
    }

    return {
      labels,
      datasets: [ordersSum, ordersCount, signups],
    }
  },
  getChartOptions(): Chart.ChartOptions {
    const timeFormat = 'MM/DD/YYYY'

    return {
      // responsive: true,
      title: {
        text: 'Chart.js Combo Time Scale',
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            display: true,
            time: {
              parser: timeFormat,
            },
          },
        ],
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
          },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            // grid line settings
            gridLines: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return '$' + value
              },
            },
          },
        ],
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'index',
        intersect: false,
      },
    }
  },
  // In real life this would be an http call
  getChartConfiguration(): Promise<Chart.ChartConfiguration> {
    const configuration = {
      type: 'bar',
      options: this.getChartOptions(),
      data: this.getChartData(),
    }

    return new Promise(resolve => setTimeout(() => resolve(configuration), 300))
  },
}
