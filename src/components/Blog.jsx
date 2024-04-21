import React, { useState } from 'react'
const Blog = ({ post }) => {
    return (
        <div className="blogPostWrapper grid grid-cols-2 auto-rows-min p-2 p-0.5">
            <h2 className="text-xl font-semibold sm:text-3xl col-span-2 postTitle bg-mainColor">{post.title}</h2>
            <h3 className="row-start-2">{post.date}</h3>
            <p className="row-start-2 mb-6">{post.postType}</p>
            <p className="text-sm postTextBody col-span-2 row-start-3 mb-10">{post.textBody}</p>
        </div>
    )
}

export default Blog;