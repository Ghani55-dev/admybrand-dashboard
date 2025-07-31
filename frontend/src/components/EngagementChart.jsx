import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

function EngagementChart({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition duration-300 hover:shadow-xl">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">User Engagement</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(str) => new Date(str).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
            stroke="#ccc"
          />
          <YAxis stroke="#ccc" />
          <Tooltip formatter={(value) => `${value} clicks`} />
          <Line type="monotone" dataKey="clicks" stroke="#f97316" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EngagementChart;
