"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function TaskManager() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editTaskId, setEditTaskId] = useState(null);
  const [session, setSession] = useState(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession.data.session);
    return currentSession.data.session; // Return the session
  };

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/");
    }
  };

  const fetchTasks = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user?.id) {
      console.log("No user found");
      return;
    }

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error fetching tasks:", error.message);
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
      const { error } = await supabase
        .from("tasks")
        .insert({ ...newTask, user_id: session.user.id });

      if (error) {
        console.log("Error inserting task : ", error.message);
        return;
      }

      alert("Successfully inserted task!");
    } else {
      const { error } = await supabase
        .from("tasks")
        .update(newTask)
        .eq("id", editTaskId);

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
    if (!session?.user?.id) {
      alert("You need to be logged in!");
      return;
    }
    const {error } = await supabase.from("tasks").delete().eq("id", id).eq("user_id", session.user.id).select();


    if (error) {
      console.log("Error deleting task : ", error.message);
      return;
    }

    alert("Successfully deleted task!");
    fetchTasks();
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        // Fetch tasks only when session is set
        if (session) {
          fetchTasks();
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center text-white">
      <button
        onClick={() => {
          logOut();
        }}
        className=" m-4 bg-neutral-700 px-4 py-1 rounded hover:bg-neutral-600"
      >
        Log Out
      </button>
      <h1 className="text-3xl font-semibold m-4">Task Manager CRUD</h1>

      <div>
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
            }}
            className="w-full p-2 rounded bg-neutral-700 outline-none"
          />

          <input
            type="text"
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => {
              setNewTask((prev) => ({ ...prev, description: e.target.value }));
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
      </div>

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
