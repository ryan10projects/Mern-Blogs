import { useEffect} from "react"
import { useBlogsContext } from "../hooks/useBlogsContext"
// components
import BlogDetails from "../components/BlogDetails"
import BlogForm from "../components/BlogForm"

const Home = () => {
  const {blogs, dispatch} = useBlogsContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/blogs')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_BLOG', payload: json})
      }
    }

    fetchData()
  }, [dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {blogs && blogs.map(singleData => (
          <BlogDetails singleData={singleData} key={singleData._id} />
        ))}
      </div>
      <BlogForm />
    </div>
  )
}

export default Home
