import React from "react";
import Chart from "react-apexcharts";
import moment from "moment";

const ColumnChart = (props) => {
  const series = props.series;
  const options = {
    chart: {
      type: "bar",
      height: 350,
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
      type: "category",
      labels: {
        formatter: function (val) {
          const num = moment(val).format("MM");

          const month = moment()
            .month(num - 1)
            .format("MMM");
          const year = moment(val).format("YY");
          return month + " " + year;
        },
      },
    },
    yaxis: {
      title: {
        text: "₹ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹ " + val;
        },
      },
    },
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="bar"
        height={350}
        width={"100%"}
      />
    </div>
  );
};

export default ColumnChart;
