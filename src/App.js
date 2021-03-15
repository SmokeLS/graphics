import "./styles.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function App() {
  const getAvg = (param, data) => {
    return data.reduce((acc, item) => (acc += item[param]), 0) / data.length;
  };

  const getAvgSquare = (param, avg, data) => {
    let avgSquare = 0;

    data.forEach((item) => {
      avgSquare += Math.pow(item[param] - avg, 2);
    });

    avgSquare = Math.sqrt(avgSquare / data.length - 1);

    return avgSquare;
  };

  const getMaxDataByParam = (param, data) => {
    return Math.max(...data.map((item) => item[param]));
  };

  const avgUv = getAvg("uv", data);
  const avgPv = getAvg("pv", data);

  const avgSquareUv = getAvgSquare("uv", avgUv, data);
  const avgSquarePv = getAvgSquare("pv", avgPv, data);

  const maxDataUv = getMaxDataByParam("uv", data);
  const maxDataPv = getMaxDataByParam("pv", data);

  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="red" />
          <stop
            offset={`${(avgUv - avgSquareUv) / maxDataUv}`}
            stopColor="red"
          />
          <stop
            offset={`${(avgUv - avgSquareUv) / maxDataUv}`}
            stopColor="green"
          />
          <stop
            offset={`${(avgUv + avgSquareUv) / maxDataUv}`}
            stopColor="green"
          />
          <stop
            offset={`${(avgUv + avgSquareUv) / maxDataUv}`}
            stopColor="red"
          />
          <stop offset="100%" stopColor="red" />
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="colorPv" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="red" />
          <stop
            offset={`${(avgPv - avgSquarePv) / maxDataPv}`}
            stopColor="red"
          />
          <stop
            offset={`${(avgPv - avgSquarePv) / maxDataPv}`}
            stopColor="green"
          />
          <stop
            offset={`${(avgPv + avgSquarePv) / maxDataPv}`}
            stopColor="green"
          />
          <stop
            offset={`${(avgPv + avgSquarePv) / maxDataPv}`}
            stopColor="red"
          />
          <stop offset="100%" stopColor="red" />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="uv"
        stroke="url(#colorUv)"
        dot={false}
        activeDot={false}
      />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="url(#colorPv)"
        dot={false}
        activeDot={false}
      />
    </LineChart>
  );
}
