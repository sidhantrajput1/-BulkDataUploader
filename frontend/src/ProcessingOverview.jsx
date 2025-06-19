import React, { useEffect, useState } from "react";

const ProcessingOverview = ({ socket }) => {
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
  }, [socket]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-1">Processing Overview</h3>
      <p className="text-sm text-gray-500 mb-4">Real-time job stats</p>

      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Active Jobs" value={stats.active} color="blue" />
        <StatCard label="Completed" value={stats.completed} color="green" />
        <StatCard label="Queued" value={stats.queued} color="orange" />
        <StatCard label="Failed" value={stats.failed} color="red" />
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className="bg-gray-100 p-4 rounded shadow flex flex-col items-center">
    <span className={`text-${color}-600 text-2xl font-bold`}>{value}</span>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

export default ProcessingOverview;
