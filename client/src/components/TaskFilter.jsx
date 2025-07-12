const TaskFilter = ({ active, setActive, counts }) => {
  const buttons = ["My Tasks", "Delegated Task", "Meetings"];

  return (
    <div className="flex gap-3 mb-4">
      {buttons.map((label, index) => (
        <button
          key={label}
          className={`flex items-center gap-1 px-4 py-1 rounded-full border ${
            active === index ? "bg-white text-black" : "bg-zinc-900 text-white"
          }`}
          onClick={() => setActive(index)}
        >
          {label}
          <span className="text-xs bg-white text-black px-2 py-0.5 rounded-full">
            {counts && counts[index] !== undefined ? counts[index] : 0}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;