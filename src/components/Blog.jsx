import React, { useState } from 'react'
const Blog = ({ post }) => {
    return (
        <div className="blogPost">
            <h2>{post.title}</h2>
            <p>{post.date}</p>
            <p>{post.textBody}</p>
        </div>
    )
}

export default Blog;