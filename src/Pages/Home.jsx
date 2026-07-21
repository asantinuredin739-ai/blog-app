import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import BlogCard from '../components/BlogCard'
import { localPostsAtom } from '../atoms/bookmarkAtoms'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const [localPosts] = useAtom(localPostsAtom)

  useEffect(() => {
    fetch('https://dummyjson.com/posts?limit=10')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch posts')
        return res.json()
      })
      .then((data) => {
        setPosts(data.posts)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const allPosts = [...localPosts, ...posts]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Blog Posts</h1>
          <p className="text-gray-500 mt-1">Discover interesting stories</p>
        </div>
        <button
          onClick={() => navigate('/create')}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Create New Post
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading posts...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="grid sm:grid-cols-2 gap-4">
          {allPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home