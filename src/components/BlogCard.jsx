import { useNavigate } from 'react-router-dom'

function BlogCard({ post }) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/blog/${post.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition"
    >
      <h2 className="font-semibold text-lg text-gray-800 mb-2">{post.title}</h2>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
      {post.tags.includes('new') && (
        <p className="text-xs text-green-600 mt-2 font-medium">✦ Locally created post</p>
      )}
    </div>
  )
}

export default BlogCard