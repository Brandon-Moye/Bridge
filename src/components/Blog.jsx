import React, { useState } from 'react'
const Blog = ({ post }) => {
    return (
        <div className="blogPostWrapper grid grid-cols-2 auto-rows-min p-2 p-0.5">
            <h2 className="blogPostTitle">{post.title}</h2>
            <h3 className="blogPostDate">{post.date}</h3>
            <p className="blogPostType">{post.postType}</p>
            <p className="blogPostTextBody">{post.textBody}</p>
        </div>
    )
}

export default Blog;