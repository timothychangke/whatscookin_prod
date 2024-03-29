const calcOwnLikes = (allposts, userId) => {
    //filter all posts to only contain the posts made by the user
    let ownPost = allposts.filter((post) => post.userId === userId)
    //return the number of likes from these posts that the user posted
    return ownPost.reduce((acc, post) => acc + Object.keys(post.likes).length, 0)
}

export default calcOwnLikes