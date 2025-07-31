import { useMemo, useState } from 'react';
import { exportToCSV } from '../utils/exportCSV';
import { exportToPDF } from '../utils/exportPDF';

function DataTable({ data }) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const filtered = useMemo(() => {
    return data
      .filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => {
        if (sortAsc) return a[sortKey] > b[sortKey] ? 1 : -1;
        else return a[sortKey] < b[sortKey] ? 1 : -1;
      });
  }, [query, sortKey, sortAsc, data]);

  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const toggleSort = key => {
    if (key === sortKey) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg mt-10">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-3">
          <button
            onClick={() => exportToCSV(filtered, 'metrics.csv')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
          >
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div id="pdf-export" className="overflow-x-auto">
        <table className="w-full text-sm text-left text-white">
          <thead className="text-xs uppercase bg-white/10 border-b border-white/10">
            <tr>
              <th onClick={() => toggleSort('name')} className="cursor-pointer px-4 py-3">Name</th>
              <th onClick={() => toggleSort('email')} className="cursor-pointer px-4 py-3">Email</th>
              <th onClick={() => toggleSort('campaign')} className="cursor-pointer px-4 py-3">Campaign</th>
              <th onClick={() => toggleSort('conversions')} className="cursor-pointer px-4 py-3">Conversions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item, index) => (
              <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">{item.campaign}</td>
                <td className="px-4 py-2">{item.conversions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          ◀ Prev
        </button>
        <span className="text-sm text-gray-300">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

export default DataTable;
