"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import createPostAction from "@/app/actions/post/create-post";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const statusOptions = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLIC", label: "Public" },
  { value: "PRIVATE", label: "Unlisted" },
] as const;

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("Escreve aqui o teu **Markdown**...");
  const [status, setStatus] = useState<"DRAFT" | "PUBLIC" | "PRIVATE">("DRAFT");
  const [state, formAction] = useActionState(createPostAction, {
    message: "",
    success: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("status", status);
    await formAction(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-4 flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold">Criar Novo Post</h1>

      {state.message && (
        <div
          className={`p-3 rounded ${
            state.success ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"
          }`}
        >
          {state.message}
        </div>
      )}

      {state.errors && (
        <div className="space-y-2 text-red-300 text-sm">
          {state.errors.title?.errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
          {state.errors.content?.errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
          {state.errors.status?.errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      )}

      <input
        type="text"
        placeholder="Título do Post"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border border-white/20 rounded bg-black/50 text-white placeholder-white/60 focus:outline-none focus:border-blue-500"
        required
      />

      <div className="flex gap-4">
        {statusOptions.map((option) => (
          <label
            key={option.value}
            className={`flex items-center gap-2 cursor-pointer ${
              status === option.value
                ? "text-blue-300"
                : "text-white/60 hover:text-white"
            }`}
          >
            <input
              type="radio"
              name="status"
              value={option.value}
              checked={status === option.value}
              onChange={() => setStatus(option.value as "DRAFT" | "PUBLIC" | "PRIVATE")}
              className="accent-blue-500"
            />
            {option.label}
          </label>
        ))}
      </div>

      {/* Editor de Markdown com preview */}
      <div data-color-mode="light">
        <MDEditor
          value={content}
          onChange={(val) => setContent(val || "")}
          height={400}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={state.message === "Post created successfully!"}
      >
        {state.message === "Post created successfully!" ? "Post Created!" : "Publicar"}
      </button>
    </form>
  );
}