const MonthYearHeader = () => {
  const date = new Date();
  const monthYear = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-3 text-white mb-2">
      <span className="text-lg">📅 {monthYear}</span>
      <button className="text-xl">&lt;</button>
      <button className="text-xl">&gt;</button>
    </div>
  );
};

export default MonthYearHeader;