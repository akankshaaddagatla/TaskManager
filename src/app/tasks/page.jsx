"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

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
    if (!session?.user?.id) {
      alert("You need to be logged in!");
      return;
    }
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
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center text-white p-4">
      <LogoutButton />
      
      <h1 className="text-3xl font-semibold m-4">Task Manager CRUD</h1>

      {/* Using TaskForm Component */}
      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        editTaskId={editTaskId}
        onSubmit={handleSubmit}
      />

      {/* Using TaskList Component */}
      <TaskList
        tasks={tasks}
        onEdit={(task) => {
          setEditTaskId(task.id);
          setNewTask({
            title: task.title,
            description: task.description,
          });
        }}
        onDelete={handleDelete}
      />
    </div>
  );

}
