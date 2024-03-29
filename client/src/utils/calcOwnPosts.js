const calcOwnPost = (allposts, userId) => {
    //filter all posts to only the posts that the user posted
    let ownPost = allposts.filter((post) => post.userId === userId)
    //return how many posts the user has posted
    return ownPost.length
}

export default calcOwnPost