import React, { useState } from 'react'
const Blog = ({ post }) => {
    return (
        <div className="blogPost grid grid-cols-2 auto-rows-min gap-2">
            <h2 className="text-xl sm:text-3xl col-span-2 postTitle bg-mainColor">{post.title}</h2>
            <h3 className="row-start-2">{post.date}</h3>
            <p className="row-start-2">{post.postType}</p>
            <p className="postTextBody col-span-2 row-start-3">{post.textBody}</p>
        </div>
    )
}

export default Blog;