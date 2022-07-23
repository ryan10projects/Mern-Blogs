import { useState } from "react";
import { useBlogsContext } from "../hooks/useBlogsContext";
const BlogForm = () => {
    const { dispatch } = useBlogsContext();
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [ emptyFields, setEmptyFields ] = useState([]);

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(title, tags, content);
        const blogs = {title, tags, content};
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify(blogs),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json();
        if(!response.ok){
            setError(data.error);
            setEmptyFields(data.emptyFields)
        }
        if(response.ok){
            setEmptyFields([]);
            setTitle('');
            setTags('');
            setContent('');
            setError(null);
            console.log("Blog added",data);
            dispatch({type: 'ADD_BLOG', payload: data});
            
        }
    
    }
    return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new Blog</h3>

        <h3>Blog Title:</h3>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={emptyFields?.includes('title')? 'error': ''}/>
        <h3>Blog Tags:</h3>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className={emptyFields?.includes('tags')? 'error': ''}/>
        <h3>Blog Content:</h3>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className={emptyFields?.includes('content')? 'error': ''}/>
        <br></br>
        <button type="submit">Add Blog</button>
        {error && <div className="error">{error}</div>}
    </form>
    )
} 

export default BlogForm;