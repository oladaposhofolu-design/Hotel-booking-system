import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardChart({
  roomCount,
  bookingCount,
  paymentCount,
  userCount
}) {
  const data = {
    labels: [
      "Rooms",
      "Bookings",
      "Payments",
      "Users"
    ],
    datasets: [
      {
        label: "System Statistics",
        data: [
          roomCount,
          bookingCount,
          paymentCount,
          userCount
        ]
      }
    ]
  };

  return (
    <div
      style={{
        width: "700px",
        marginTop: "30px"
      }}
    >
      <Bar data={data} />
    </div>
  );
}

export default DashboardChart;