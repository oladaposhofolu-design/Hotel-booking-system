import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function RevenueChart({
  revenue,
  bookings
}) {
  const data = {
    labels: [
      "Revenue",
      "Bookings"
    ],
    datasets: [
      {
        data: [
          revenue,
          bookings
        ]
      }
    ]
  };

  return (
    <div
      style={{
        width: "400px",
        marginTop: "30px"
      }}
    >
      <Pie data={data} />
    </div>
  );
}

export default RevenueChart;