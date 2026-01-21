'use client';

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="text-neutral-400">No tasks yet. Create your first task!</p>
    );
  }

  return (
    <ul className="flex flex-wrap gap-3 justify-around items-center">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="border border-neutral-600 rounded-lg p-6 w-96 text-center"
        >
          <div>
            <h2 className="text-xl font-medium">{task.title}</h2>
            <p className="text-neutral-400 mt-2">{task.description}</p>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => onEdit(task)}
                className="bg-neutral-700 px-4 py-1 rounded hover:bg-neutral-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="bg-neutral-700 px-4 py-1 rounded hover:bg-neutral-600"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}