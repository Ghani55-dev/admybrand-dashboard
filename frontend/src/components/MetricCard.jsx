function MetricCard({ label, value }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl text-center rounded-xl p-6 shadow-lg border border-white/10 hover:scale-105 transition-transform duration-300">
      <p className="text-sm font-medium">{label}</p>
      <h2 className="text-2xl font-bold" >{value}</h2>
    </div>
  );
}

export default MetricCard;

