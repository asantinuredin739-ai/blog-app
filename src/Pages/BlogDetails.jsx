import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { bookmarksAtom, localPostsAtom } from '../atoms/bookmarkAtoms'

function BlogDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom)
  const [localPosts] = useAtom(localPostsAtom)

  useEffect(() => {
    const localMatch = localPosts.find((p) => p.id === Number(id))

    if (localMatch) {
      setPost(localMatch)
      setComments([])
      setLoading(false)
      setError(null)
      return
    }

    setLoading(true)
    Promise.all([
      fetch(`https://dummyjson.com/posts/${id}`).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch post')
        return res.json()
      }),
      fetch(`https://dummyjson.com/comments/post/${id}`).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch comments')
        return res.json()
      }),
    ])
      .then(([postData, commentsData]) => {
        setPost(postData)
        setComments(commentsData.comments)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id, localPosts])

  const isBookmarked = bookmarks.some((b) => b.id === post?.id)

  function handleBookmark() {
    const alreadyBookmarked = bookmarks.find((b) => b.id === post.id)
    if (!alreadyBookmarked) {
      setBookmarks((prev) => [...prev, post])
    } else {
      setBookmarks((prev) => prev.filter((b) => b.id !== post.id))
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-blue-600 hover:underline flex items-center gap-1"
      >
        ← Back to posts
      </button>

      {loading && <p className="text-gray-500">Loading post...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && post && (
        <>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-start mb-3">
              <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>
              <button
                onClick={handleBookmark}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isBookmarked
                    ? 'bg-yellow-400 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <p className="text-gray-700 leading-relaxed">{post.body}</p>
          </div>

          <h2 className="text-xl font-semibold mb-3 text-gray-800">Comments</h2>
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white border border-gray-200 p-4 rounded-lg">
                  <p className="font-medium text-gray-800">{comment.user.username}</p>
                  <p className="text-gray-600">{comment.body}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default BlogDetails