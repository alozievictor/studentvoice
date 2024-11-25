import React from "react";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";

const TimeLineChart = ({ data }) => {
  const seriesData = [
    {
      name: "series1",
      data: data.map(({ x, y }) => [new Date(x).getTime(), y]),
    },
  ];

  const options = {
    chart: {
      type: "area",
      width: "100%",
      height: "100%",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#4b5dff"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.9,  
        stops: [0, 100, 100],
      },
      colors: ["#4b5dff"],
    },
    xaxis: {
      type: "datetime",
    },
  };

  return <ReactApexChart options={options} series={seriesData} type="area" height={350} />;
};

TimeLineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.string.isRequired,
      y: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TimeLineChart;