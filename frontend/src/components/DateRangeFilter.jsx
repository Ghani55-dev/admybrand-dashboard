import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateRangeFilter({ startDate, setStartDate, endDate, setEndDate }) {
  return (
    <div className="flex gap-4 items-center mb-4">
      <div>
        <label className="block text-sm font-semibold">From:</label>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          className="border px-3 py-1 rounded-md dark:bg-gray-800"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold">To:</label>
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          className="border px-3 py-1 rounded-md dark:bg-gray-800"
        />
      </div>
    </div>
  );
}
export default DateRangeFilter;
