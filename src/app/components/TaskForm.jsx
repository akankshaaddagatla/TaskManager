'use client';

import { useState } from 'react';

export default function TaskForm({ 
  initialData = { title: '', description: '' }, 
  isEditing = false,
  onSubmit,
  onCancel 
}) {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 p-6 rounded-lg w-96 mb-8 space-y-4"
    >
      <input
        type="text"
        placeholder="Task Title"
        value={formData.title}
        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        className="w-full p-2 rounded bg-neutral-700 outline-none"
        required
      />

      <input
        type="text"
        placeholder="Task Description"
        value={formData.description}
        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        className="w-full p-2 rounded bg-neutral-700 outline-none"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-neutral-600 py-2 rounded hover:bg-neutral-500 transition"
        >
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
        
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-neutral-700 py-2 rounded hover:bg-neutral-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}