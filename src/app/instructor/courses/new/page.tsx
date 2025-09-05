"use client";
import { useState } from 'react';

export default function NewCoursePage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(4900);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    try {
      const key = `uploads/${Date.now()}-${file.name}`;
      const res = await fetch('/api/instructor/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, contentType: file.type }),
      });
      const data = await res.json();
      await fetch(data.url, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });
      alert('Uploaded!');
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Create Course</h1>
      <div className="space-y-2 max-w-xl">
        <input className="border rounded px-3 py-2 w-full" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="border rounded px-3 py-2 w-full" placeholder="Price (cents)" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <input className="border rounded px-3 py-2 w-full" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button disabled={uploading} onClick={handleUpload} className="rounded bg-black text-white px-4 py-2 text-sm">{uploading ? 'Uploading...' : 'Upload asset'}</button>
      </div>
    </main>
  );
}


