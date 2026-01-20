"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editTaskId, setEditTaskId] = useState(null);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error fetching tasks : ", error.message);
      return;
    }

    setTasks(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.title) {
      alert("Empty Task!, please enter title");
      return;
    }

    if (!editTaskId) {
      const { error } = await supabase.from("tasks").insert(newTask);

      if (error) {
        console.log("Error inserting task : ", error.message);
        return;
      }

      alert("Successfully inserted task!");
    } else {
      const { error } = await supabase.from("tasks").update(newTask).eq("id",editTaskId);

      if (error) {
        console.log("Error updating task : ", error.message);
        return;
      }

      alert("Successfully updated task!");
      setEditTaskId(null);
    }

    setNewTask({ title: "", description: "" });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.log("Error deleting task : ", error.message);
      return;
    }

    alert("Successfully deleted task!");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  });

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-semibold mb-8">Task Manager CRUD</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 p-6 rounded-lg w-96 mb-8 space-y-4"
      >
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => {
            setNewTask((prev) => ({ ...prev, title: e.target.value }));
            console.log(newTask);
          }}
          className="w-full p-2 rounded bg-neutral-700 outline-none"
        />

        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => {
            setNewTask((prev) => ({ ...prev, description: e.target.value }));
            console.log(newTask);
          }}
          className="w-full p-2 rounded bg-neutral-700 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-neutral-600 py-2 rounded hover:bg-neutral-500 transition"
        >
          {editTaskId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <ul className="flex flex-wrap gap-3">
        {tasks.map((task, key) => (
          <li
            key={key}
            className="border border-neutral-600 rounded-lg p-6 w-96 text-center"
          >
            <div>
              <h2 className="text-xl font-medium">{task.title}</h2>
              <p className="text-neutral-400 mt-2">{task.description}</p>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => {
                    setEditTaskId(task.id);
                    setNewTask({
                      title: task.title,
                      description: task.description,
                    });
                  }}
                  className="bg-neutral-700 px-4 py-1 rounded hover:bg-neutral-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDelete(task.id);
                  }}
                  className="bg-neutral-700 px-4 py-1 rounded hover:bg-neutral-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
