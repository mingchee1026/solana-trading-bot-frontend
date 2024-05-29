import React from 'react'
// import dynamic from 'next/dynamic'
// const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
import ApexChart from 'react-apexcharts'

const PriceChartLine = ({ data }) => {
  const state = {
    options: {
      chart: {
        id: 'Price Movement',
        type: 'area',
        height: 200,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: '#999',
            label: {
              show: true,
              text: 'Support',
              style: {
                color: '#fff',
                background: '#00E396',
              },
            },
          },
        ],
        xaxis: [
          {
            x: new Date('03 Mar 2024').getTime(),
            borderColor: '#999',
            yAxisIndex: 0,
            label: {
              show: true,
              text: 'Time',
              style: {
                color: '#fff',
                background: '#775DD0',
              },
            },
          },
        ],
      },
      markers: {
        size: 0,
        style: 'hollow',
      },
      xaxis: {
        type: 'datetime',
        categories: data?.map((data) => data[0]),
        tickAmount: 10,
      },
      yaxis: {
        labels: {
          // formatter: function (val: number) {
          //   return (val / 1000000).toFixed(0);
          // },
          style: {
            color: 'white',
          },
        },
        title: {
          text: 'Price',
        },
      },
      //   stroke: { width: 2, curve: "smooth" },
      dataLabels: { enabled: false, style: { color: 'black' } },
      tooltip: {
        x: {
          format: 'dd MMM yyyy hh:mm:ss',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 80],
        },
      },
    },
    series: [
      {
        name: 'Price',
        data: data?.map((data) => data[1]),
      },
    ],
  }

  // return <Line options={options} data={data} className="h-96" />
  return (
    <ApexChart
      type="area"
      height={200}
      width="100%"
      options={state}
      series={state.series}
      // className="h-36"
    />
  )
}

export default PriceChartLine
