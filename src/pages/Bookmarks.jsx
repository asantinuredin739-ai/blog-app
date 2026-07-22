import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { bookmarksAtom } from '../atoms/bookmarkAtoms'

function Bookmarks() {
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom)
  const navigate = useNavigate()

  function handleRemove(id) {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bookmarks</h1>

      {bookmarks.length === 0 ? (
        <p className="text-gray-500">No bookmarks yet.</p>
      ) : (
        <div className="grid gap-4">
          {bookmarks.map((post) => (
            <div key={post.id} className="border p-4 rounded shadow">
              <h2
                onClick={() => navigate(`/blog/${post.id}`)}
                className="font-semibold cursor-pointer hover:underline"
              >
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{post.tags.join(', ')}</p>
              <button
                onClick={() => handleRemove(post.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove Bookmark
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Bookmarks