import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';

import Post from './Post.jsx';

//Posts will be used to get all the posts available, as well as all the posts that the user has posted
const Posts = ({ userId, isProfile = false }) => {
  //be able to use the redux store
  const dispatch = useDispatch();
  //get the list of stored posts from the redux store
  const posts = useSelector((state) => state.posts)
  //get the token from the store
  const token = useSelector((state) => state.token);

  //reverse the order of posts
  const reversedPost = [...posts].reverse()
  
  //make an api call the the backend to get posts
  const getPosts = async () => {
    //api call the backend
    const response = await fetch('http://localhost:3001/posts', {
      //method of get
      method: 'GET',
      //authorisation header to validated request
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //get back the response
    const data = await response.json();
    //set the post value inside store
    dispatch(setPosts({ posts: data }));
  };

  //same function but this time only get posts created by the user
  const getUserPosts = async () => {
    //api call the backend specifically only for posts made by the user
    const response = await fetch(`http://localhost:3001/posts/${userId}`, {
      //method of get
      method: 'GET',
      //authorisation header to validated request
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //get back the response
    const data = await response.json();
    //set the post value inside store
    dispatch(setPosts({ posts: data }));
  };

  //load posts on page. Since there are no dependencies, load this only once
  useEffect(() => {
    //if isProfile is true, get only the posts posted by the user
    if (isProfile) {
      getUserPosts();
    }
    //else get all user posts
    else {
      getPosts();
    }
  }, []);

  return (
    <>
      {reversedPost.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          postHeader,
          description,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <Post
            key={_id}
            postId={_id}
            postUserId={userId}
            firstName={firstName}
            lastName={lastName}
            postHeader={postHeader}
            description={description}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        ),
      )}
    </>
  );
};

export default Posts;
