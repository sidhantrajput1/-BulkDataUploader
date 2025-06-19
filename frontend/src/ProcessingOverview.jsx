import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// Connect to backend
const socket = io("http://localhost:3000"); 

const ProcessingOverview = () => {
  const [stats, setStats] = useState({
    active: 0,
    completed: 0,
    queued: 0,
    failed: 0,
  });

  useEffect(() => {

    socket.on("job-stats", (data) => {
      setStats(data);
    });

    return () => {
      socket.off("job-stats");
    };

  }, []);

  return (
    <div className="">
      <h3 className="font-medium text-xl mb-1">Processing Overview</h3>
      <p className="text-gray-400 text-sm mb-6">Current processing statistics</p>

      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Active Job" value={stats.active} color="blue" />
        <StatCard label="Completed" value={stats.completed} color="green" />
        <StatCard label="Queued" value={stats.queued} color="orange" />
        <StatCard label="Failed" value={stats.failed} color="red" />
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className="bg-gray-100 p-4 shadow-sm rounded-md flex flex-col justify-center items-center">
    <span className={`font-bold text-${color}-600 text-md mb-1`}>{value}</span>
    <p className="text-gray-500">{label}</p>
  </div>
);

export default ProcessingOverview;
