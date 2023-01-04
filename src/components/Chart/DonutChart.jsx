import React from "react";
import styles from './Char.module.scss'
import Chart from "react-apexcharts";

const DonutChart = (props) => {
  const dountLabels = props.dountLabel;
  const donutOptions = {
    labels: dountLabels,
    legend: {
      position: props.fromUsage ? "left" : "bottom",
      horizontalAlign: "center",
    },
    colors: ["#f7da4a", "#d9505c", "#00ab6f"],
  };
  const donutSeries = props.donutValue;
  return (
    <div>
      <Chart
        options={donutOptions}
        series={donutSeries}
        type="donut"
        className={styles.donutChart}
        width='100%'
      />
    </div>
  );
};

export default DonutChart;
