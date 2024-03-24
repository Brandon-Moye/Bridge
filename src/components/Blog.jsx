import React, { useState } from 'react'
const Blog = ({ post }) => {
    return (
        <div className="blogPost grid gap-1 grid-cols-2 grid-rows-3">
            <h2 className="postTitle bg-mainColor">{post.title}</h2>
            <h3>{post.date}</h3>
            <p>{post.postType}</p>
            <p>{post.textBody}</p>
        </div>
    )
}

export default Blog;