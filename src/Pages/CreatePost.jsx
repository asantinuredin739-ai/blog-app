import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import BlogForm from '../components/BlogForm'
import { localPostsAtom } from '../atoms/bookmarkAtoms'

function CreatePost() {
  const navigate = useNavigate()
  const [localPosts, setLocalPosts] = useAtom(localPostsAtom)

  function handleCreatePost({ title, content }) {
    const newPost = {
      id: Date.now(),
      title,
      body: content,
      tags: ['new'],
    }

    setLocalPosts((prev) => [newPost, ...prev])
    navigate('/')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <BlogForm onSubmit={handleCreatePost} />
    </div>
  )
}

export default CreatePost