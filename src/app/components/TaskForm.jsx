'use client';

export default function TaskForm({ 
  newTask, 
  setNewTask, 
  editTaskId,
  onSubmit 
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-neutral-800 p-6 rounded-lg w-96 mb-8 space-y-4"
    >
      <input
        type="text"
        placeholder="Task Title"
        value={newTask.title}
        onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
        className="w-full p-2 rounded bg-neutral-700 outline-none"
      />

      <input
        type="text"
        placeholder="Task Description"
        value={newTask.description}
        onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
        className="w-full p-2 rounded bg-neutral-700 outline-none"
      />

      <button
        type="submit"
        className="w-full bg-neutral-600 py-2 rounded hover:bg-neutral-500 transition"
      >
        {editTaskId ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}