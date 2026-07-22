import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex gap-8 items-center px-8 py-4 bg-white border-b shadow-sm sticky top-0 z-10">
      <Link to="/" className="font-bold text-xl text-blue-600">
        📝 MyBlog
      </Link>
      <div className="flex gap-6 ml-auto text-gray-600">
        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
        <Link to="/create" className="hover:text-blue-600 transition">Create Post</Link>
        <Link to="/bookmarks" className="hover:text-blue-600 transition">Bookmarks</Link>
      </div>
    </nav>
  )
}

export default Navbar