import "./Body.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv1: 2400,
    amt: 400,
  },

  {
    name: "Page B",
    uv: 3000,
    pv1: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv1: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv1: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv1: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv1: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv1: 4300,
    amt: 2100,
  },
];
interface GPURote {
    adres: string;
    gpu: string;
}
interface CPURote {
    adres: string;
    cpu: string;
}
const Body = () => {
    const [cpuRoutes, setCPURoutes] = useState<CPURote[]>([]);
    const [gpuRoutes, setGPURoutes] = useState<GPURote[]>([]);

    // Використовуємо useEffect для завантаження даних після рендерингу компонента
    useEffect(() => {
        const fetchData = async () => {
            try {
                const cpuResponse = await axios.get<CPURote[]>("https://localhost:7055/Route/GetCPURoutes");
                setCPURoutes(cpuResponse.data);
                
                const gpuResponse = await axios.get<GPURote[]>("https://localhost:7055/Route/GetGPURoutes");
                setGPURoutes(gpuResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Помилка під час отримання даних");
            }
        };

        fetchData();
    }, []);

  return (
    <div className="body">
      <div className="inputs">
        <div className="inputs-container">
          <div className="matrix-input">
            <label className="text-style">Chose GPU</label>
            
            <select className="select" id="test-methods" name="options">
              {cpuRoutes.map((options:CPURote, index) => (
                <option key={index}>
                  {options.cpu}
                </option>
              ))}
            </select>
          </div>
          <div className="matrix-input">
            <label className="text-style">Chose CPU</label>
            <select className="select" id="test-methods" name="options">
              {gpuRoutes.map((options:GPURote, index) => (
                <option key={index}>
                  {options.gpu}
                </option>
              ))}
            </select>
          </div>
          <div className="matrix-input">
            <label className="text-style">Testing method</label>
            <select className="select" id="test-methods" name="options">
              <option value="option1">Addition</option>
              <option value="option2">Multiplication</option>
              <option value="option3">Singularity</option>
            </select>
          </div>
          <div className="matrix-input">
            <label className="text-style">Size of matrix A</label>
            <input className="input-style" type="text" />
          </div>
          <div className="matrix-input">
            <label className="text-style">Size of matrix B</label>
            <input className="input-style" type="text" />
          </div>
          <div className="matrix-input">
            <label className="text-style">Test step</label>
            <input className="input-style" type="text" />
          </div>
          <button className="test-button">Test</button>
        </div>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv1"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#82ca9d"
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Body;
