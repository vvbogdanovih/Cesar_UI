import "./Body.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../ApiAdres";

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


interface GPURote {
  adres: string;
  gpu: string;
}
interface CPURote {
  adres: string;
  cpu: string;
}
interface BenchmarkResult {
  size: number;
  elapsedTimeCPU: number;
  elapsedTimeCPUMultiThread: number;
  elapsedTimeGPU: number;
}
const Body = () => {
  // BenchmarkResult
  const [benchmarkResult, setBenchmarkResult] = useState<BenchmarkResult[]>([]);
  // Routes
  const [cpuRoutes, setCPURoutes] = useState<CPURote[]>([]);
  const [gpuRoutes, setGPURoutes] = useState<GPURote[]>([]);

  // test param
  const [cpuRoute, setCPURoute] = useState("");
  const [gpuRoute, setGPURoute] = useState("");
  const [testMethod, setTestMethod] = useState("option1");
  const [matrixAStarSize, setMatrixAStarSize] = useState("10");
  const [matrixAEndSize, setMatrixAEndSize] = useState("50");
  const [testStep, setTestStep] = useState("10");

  // useEffect для завантаження даних після рендерингу компонента
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cpuResponse = await axios.get<CPURote[]>(
          `${api}/Route/GetCPURoutes`
        );
        setCPURoutes(cpuResponse.data);
        setCPURoute(cpuResponse.data[0].adres);
        const gpuResponse = await axios.get<GPURote[]>(
          `${api}/Route/GetGPURoutes`
        );
        setGPURoutes(gpuResponse.data);
        setGPURoute(gpuResponse.data[0].adres);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Помилка під час отримання даних");
      }
    };

    fetchData();
  }, []);

  const handleButtoun = async () => {
    console.log(testMethod);
    switch (testMethod) {
        case "option1":
            const response1 = await axios.post(
                `${api}/Benchmark/Sum`,
                { matrixAStarSize, matrixAEndSize, testStep, gpuRoute, cpuRoute}
              );
              console.log(response1.data);
              setBenchmarkResult(response1.data);
          break;
        case "option2":
            const response2 = await axios.post(
                `${api}/Benchmark/Mult`,
                { matrixAStarSize, matrixAEndSize, testStep, gpuRoute, cpuRoute}
              );
              setBenchmarkResult(response2.data); 
          break;
        case "option3":
            const response3 = await axios.post(
                `${api}/Benchmark/Sing`,
                { matrixAStarSize, matrixAEndSize, testStep, gpuRoute, cpuRoute}
              );
              setBenchmarkResult(response3.data); 
          break;
        default:
            alert(testMethod);
    }
          
  };

  return (
    <div className="body">
      <div className="inputs">
        <div className="inputs-container">
          <div className="matrix-input">
            <label className="text-style">Chose CPU</label>
            <select
              className="select"
              id="CPURoteId"
              name="optionsCPU"
              onChange={(e) => {
                const foundRoute = cpuRoutes.find(
                  (route) => route.cpu === e.target.value
                );
                const adres = foundRoute ? foundRoute.adres : "none";
                setCPURoute(adres);
              }}
            >
              {cpuRoutes.map((options: CPURote, index) => (
                <option key={index}>{options.cpu}</option>
              ))}
            </select>
          </div>

          <div className="matrix-input">
            <label className="text-style">Chose GPU</label>
            <select
              className="select"
              id="GPURoteId"
              name="optionsGPU"
              onChange={(e) => {
                const foundRoute = gpuRoutes.find(
                  (route) => route.gpu === e.target.value
                );
                const adres = foundRoute ? foundRoute.adres : "none";
                setCPURoute(adres);
              }}
            >
              {gpuRoutes.map((options: GPURote, index) => (
                <option key={index}>{options.gpu}</option>
              ))}
            </select>
          </div>

          <div className="matrix-input">
            <label className="text-style">Testing method</label>
            <select
              className="select"
              id="test-methods"
              name="optionsTestMethod"
              onChange={(e) => setTestMethod(e.target.value)}
            >
              <option value="option1">Addition</option>
              <option value="option2">Multiplication</option>
              <option value="option3">Singularity</option>
            </select>
          </div>

          <div className="matrix-input">
            <label className="text-style">Start size of matrix</label>
            <input
              className="input-style"
              type="text"
              value={matrixAStarSize}
              onChange={(e) => setMatrixAStarSize(e.target.value)}
            />
          </div>

          <div className="matrix-input">
            <label className="text-style">End size of matrix</label>
            <input
              className="input-style"
              type="text"
              value={matrixAEndSize}
              onChange={(e) => setMatrixAEndSize(e.target.value)}
            />
          </div>

          <div className="matrix-input">
            <label className="text-style">Test step</label>
            <input
              className="input-style"
              type="text"
              value={testStep}
              onChange={(e) => setTestStep(e.target.value)}
            />
          </div>

          <button className="test-button" onClick={handleButtoun}>
            Test
          </button>
        </div>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={benchmarkResult}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="size" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="elapsedTimeCPU"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="elapsedTimeCPUMultiThread"
              stroke="#92ca9d"
              activeDot={{ r: 7 }}
            />
            <Line
              type="monotone"
              dataKey="elapsedTimeGPU"
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
