import { useEffect, useState } from 'react';
import axios from 'axios';
import MetricCard from '../components/MetricCard';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import DataTable from '../components/DataTable';
import { exportToPDF } from '../utils/exportPDF';
import DateRangeFilter from '../components/DateRangeFilter';
import EngagementChart from '../components/EngagementChart';
import useFetch from '../hooks/useFetch';

function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { data: growthData, loading } = useFetch('https://admybrand-dashboard-t4bi.onrender.com/api/user-growth/');
  const { data: engagementData, loading: loadingEngagement } = useFetch('https://admybrand-dashboard-t4bi.onrender.com/api/engagement/');

  // Fetch summary metrics every 5 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch data table once
  useEffect(() => {
    axios.get('https://admybrand-dashboard-t4bi.onrender.com/api/user-campaigns/')
      .then(res => setTableData(res.data));
  }, []);

  const fetchData = () => {
    axios.get('https://admybrand-dashboard-t4bi.onrender.com/api/metrics/')
      .then(res => setMetrics(res.data));
  };

  if (!metrics) return <p className="text-center p-10 text-gray-500 dark:text-gray-300">Loading Dashboard...</p>;

  return (
    <div className="p-6 space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-500">

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Revenue" value={`₹${metrics.revenue}`} />
        <MetricCard label="Users" value={metrics.users} />
        <MetricCard label="Conversions" value={metrics.conversions} />
        <MetricCard label="Growth %" value={`${metrics.growth_percent}%`} />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <LineChart data={metrics.chart_data} />
        <PieChart data={metrics.pie_data} />
      </div>

      {/* Engagement */}
      <div className="space-y-6">
        {loadingEngagement ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading Engagement Chart...</p>
        ) : (
          <EngagementChart data={engagementData} />
        )}
      </div>

      {/* Table + Filter */}
      <div className="space-y-6">
        <DateRangeFilter
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <DataTable data={tableData} />
      </div>

      {/* PDF Export Button */}
      <div className="flex justify-end">
        <button
          onClick={() => exportToPDF('pdf-export')}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
        >
          🧾 Export PDF
        </button>
      </div>

      {/* Printable PDF Area */}
      <div id="pdf-export" className="hidden print:block">
        {/* You can repeat Metrics, Charts or Table here for PDF rendering */}
      </div>
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white">...</div>
    </div>
  );
}

export default Dashboard;
