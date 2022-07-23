import React from 'react'
import { useBlogsContext } from '../hooks/useBlogsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function BlogDetails({singleData}) {
  const { dispatch } = useBlogsContext();
  const handleClick = async () =>{
    const response = await fetch('/api/blogs/'+singleData._id, {
      method: 'DELETE',
    })
    const json = await response.json()
    
    if (response.ok) {
      dispatch({type: 'DELETE_BLOG', payload: json})
    }
}

  return (
    <div className="blogs-details">
        <h4>{singleData.title}</h4>
        <p>Tags: {singleData.tags}</p>
        <p>Content: {singleData.content}</p>
        <p>{formatDistanceToNow(new Date(singleData.createdAt), { addSuffix: true})}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}
