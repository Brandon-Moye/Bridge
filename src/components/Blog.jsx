import React, { useState } from 'react'
const Blog = ({ post }) => {
    return (
        <div className="blogPost">
            <h2 className="font-bold underline text-green-400">{post.title}</h2>
            <h3>{post.date}</h3>
            <p>{post.postType}</p>
            <p>{post.textBody}</p>
        </div>
    )
}

export default Blog;