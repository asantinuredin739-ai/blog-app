import { useState } from 'react'

function BlogForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [titleError, setTitleError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (title.trim() === '') {
      setTitleError('Title cannot be empty')
      return
    }

    setTitleError('')
    onSubmit({ title, content })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 w-full"
        />
        {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="border rounded p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Publish Post
      </button>
    </form>
  )
}

export default BlogForm