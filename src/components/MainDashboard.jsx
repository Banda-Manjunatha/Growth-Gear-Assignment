import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaSearch,
  FaMagic,
  FaChartLine,
  FaUsers,
  FaMoneyBillWave,
  FaChartPie,
  FaHistory,
  FaArrowRight,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { processQuery, setCurrentQuery } from "../features/querySlice";
import { suggestQueries } from "../utils/mockQueryProcessor";

const PreDefinedQueries = [
  {
    icon: <FaMoneyBillWave className="text-green-400 mr-3" />,
    title: "Monthly Sales Revenue",
    description: "Analyze monthly revenue trends",
    query: "Show monthly sales revenue",
  },
  {
    icon: <FaUsers className="text-blue-400 mr-3" />,
    title: "User Cohort Analysis",
    description: "Break down user groups and engagement",
    query: "Compare user cohorts",
  },
  {
    icon: <FaChartLine className="text-purple-400 mr-3" />,
    title: "Performance Metrics",
    description: "Track key business performance indicators",
    query: "Analyze quarterly performance",
  },
  {
    icon: <FaChartPie className="text-yellow-400 mr-3" />,
    title: "Customer Retention",
    description: "Understand customer retention rates",
    query: "Display customer retention metrics",
  },
];

const MainDashboard = () => {
  const dispatch = useDispatch();
  const [inputQuery, setInputQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const { queryHistory, results, status, error } = useSelector(
    (state) => state.query
  );

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setInputQuery(value);
    setSuggestions(suggestQueries(value));
  };

  const executeQuery = (query) => {
    // Clear input field
    setInputQuery("");

    // Dispatch query processing
    dispatch(setCurrentQuery(query));
    dispatch(processQuery(query));
  };

  const handleQuerySubmit = () => {
    if (inputQuery.trim()) {
      executeQuery(inputQuery);
    }
  };

  const handlePredefinedQueryClick = (query) => {
    executeQuery(query);
  };

  const renderChart = () => {
    if (!results) return null;

    const chartProps = {
      width: "100%",
      height: 300,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    return (
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl mt-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-200 flex items-center">
          <FaArrowRight className="mr-3 text-blue-500" />
          {results.title}
        </h3>
        <ResponsiveContainer {...chartProps}>
          {results.type === "line" ? (
            <LineChart data={results.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey={Object.keys(results.data[0])[0]}
                stroke="#9CA3AF"
              />
              <YAxis
                stroke="#9CA3AF"
                dataKey={Object.keys(results.data[0])[1]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey={Object.keys(results.data[0])[1]}
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ r: 6, fill: "#3B82F6", stroke: "white" }}
              />
            </LineChart>
          ) : (
            <BarChart data={results.data}>
              <CartesianGrid strokeDasharray="2 2" stroke="#374151" />
              <XAxis
                dataKey={Object.keys(results.data[0])[0]}
                stroke="#9CA3AF"
              />
              <YAxis
                stroke="#9CA3AF"
                dataKey={Object.keys(results.data[0])[1]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#fff",
                }}
                cursor={{ fill: "#1F2937", opacity: 0.5 }}
              />
              <Bar
                dataKey={Object.keys(results.data[0])[1]}
                fill="#3B82F6"
                barSize={50}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4 flex items-center justify-center">
            <FaMagic className="mr-4 text-blue-500" />
            Gen AI Analytics
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Unlock insights with natural language queries. Click a suggested
            query or type your own.
          </p>
        </div>

        {/* Query Input */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
          <div
            className={`flex items-center bg-gray-700 rounded-lg p-2 mb-4 ${
              isFocused ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <FaSearch className="text-gray-400 mr-3" />
            <input
              type="text"
              value={inputQuery}
              onChange={handleQueryChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask a business question..."
              className="w-full bg-transparent text-gray-100 focus:outline-none text-lg"
            />
            <button
              onClick={handleQuerySubmit}
              disabled={!inputQuery.trim()}
              className={`
                px-6 py-2 rounded-md ml-3 transition 
                ${
                  inputQuery.trim()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              Submit
            </button>
          </div>

          {/* Suggested Queries */}
          <h4 className="text-lg font-semibold text-gray-300 mb-4 flex items-center">
            <FaMagic className="mr-2 text-blue-500" />
            Suggested Queries
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {PreDefinedQueries.map((query, index) => (
              <div
                key={index}
                onClick={() => handlePredefinedQueryClick(query.query)}
                className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition flex items-center"
              >
                {query.icon}
                <div>
                  <h4 className="text-gray-200 font-semibold">{query.title}</h4>
                  <p className="text-gray-400 text-sm">{query.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Query Results */}
        {status === "loading" && (
          <div className="text-center">
            <div className="animate-pulse text-gray-400">
              Processing your query...
            </div>
          </div>
        )}

        {status === "succeeded" && renderChart()}

        {status === "failed" && (
          <div className="bg-red-900 text-red-300 p-4 rounded-lg text-center">
            {error || "Query processing failed"}
          </div>
        )}

        {/* Query History */}
        {queryHistory.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center">
              <FaHistory className="mr-3 text-blue-500" />
              Query History
            </h3>
            <div className="space-y-2">
              {queryHistory.slice(0, 5).map((query, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-3 rounded-md text-gray-300 hover:bg-gray-600 transition flex justify-between items-center"
                >
                  <span>{query.query}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(query.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainDashboard;
