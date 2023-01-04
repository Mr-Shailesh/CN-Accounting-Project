import React from "react";
import Chart from "react-apexcharts";

const AreaChart = ({ width, height, series }) => {
  const options = {
    chart: {
      type: "area",
      height: 350,
      redrawOnParentResize: true,
      events: {
        beforeMount: (chart) => {
          chart.windowResizeHandler();
        },
        animationEnd: (chart) => {
          chart.windowResizeHandler();
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹" + val || 0;
        },
      },
    },
  };
  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="area"
        height={height}
        width={width}
      />
    </div>
  );
};

export default AreaChart;
