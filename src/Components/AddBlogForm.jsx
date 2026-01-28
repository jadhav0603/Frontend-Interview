import React, { useMemo, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const categories = ["FINANCE", "TECH",'CAREER', 'EDUCATION',"REGULATIONS","LIFESTYLE"];

const toLocalInput = (iso) => {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
};

const toISO = (localValue) => {
  return new Date(localValue).toISOString();
};

const AddBlogForm = () => {
  const queryClient = useQueryClient();
  const defaultDate = useMemo(() => toLocalInput(new Date().toISOString()), []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [dateLocal, setDateLocal] = useState(defaultDate);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [msg, setMsg] = useState("");

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post("http://localhost:3001/blogs", payload);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });

      setTitle("");
      setDescription("");
      setCoverImage("");
      setContent("");
      setDateLocal(toLocalInput(new Date().toISOString()));
      setSelectedCategories([]);
      setMsg("");
    },
  });

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) => {
      if (prev.includes(cat)) return prev.filter((x) => x !== cat);
      return [...prev, cat];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedCategories.length === 0) return setMsg("Select at least one category");
    if (title.trim().length < 3) return setMsg("Title should be at least 3 characters");
    if (!description.trim()) return setMsg("Description is required");
    if (!coverImage.trim()) return setMsg("Cover image is required");
    if (!content.trim()) return setMsg("Content is required");
    if (!dateLocal) return setMsg("Date is required");

    setMsg("");

    const payload = {
      id: crypto?.randomUUID?.() ? crypto.randomUUID() : String(Date.now()),
      category: selectedCategories,
      title: title.trim(),
      description: description.trim(),
      coverImage: coverImage.trim(),
      content: content.trim(),
      date: toISO(dateLocal),
    };

    mutate(payload);
    
  };

  return (
    <div className="flex justify-center">

        <div className="m-5 border rounded-2xl p-4">
      <h2 className="text-xl font-semibold mb-4">Add Blog</h2>

      {msg ? (
        <div className="mb-3 p-2 border border-red-300 rounded text-red-700">{msg}</div>
      ) : null}

      {isError ? (
        <div className="mb-3 p-2 border border-red-300 rounded text-red-700">
          {error?.message || "Something went wrong"}
        </div>
      ) : null}

      {isSuccess ? (
        <div className="mb-3 p-2 border border-green-300 rounded text-green-700">
          Blog added successfully
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="font-medium mb-2">Category</p>
          <div className="flex gap-4 flex-wrap">
            {categories.map((c) => (
              <label key={c} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(c)}
                  onChange={() => toggleCategory(c)}
                />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Future of Fintech"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short summary..."
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Cover Image URL</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Date & Time</label>
          <input
            className="border rounded px-3 py-2"
            type="datetime-local"
            value={dateLocal}
            onChange={(e) => setDateLocal(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[160px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write full content..."
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Add Blog"}
        </button>
      </form>
    </div>

    </div>
  );
};

export default AddBlogForm;
