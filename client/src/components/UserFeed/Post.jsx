import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'state';

import FlexBox from 'components/UI/FlexBox';
import Friend from './Friend.jsx';
import Container from 'components/UI/Container.jsx';

import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  Insights,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  Typography as Text,
  useTheme,
} from '@mui/material';

const Post = ({
  postId,
  postUserId,
  firstName,
  lastName,
  postHeader,
  description,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  //get access to the palette via useTheme
  const { palette } = useTheme();
  //set colors of the friend component
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  //const get state from redux store
  const dispatch = useDispatch();
  //get token from redux store
  const token = useSelector((state) => state.token);
  //get logged in user id from the redux store
  const loggedInUserId = useSelector((state) => state.user._id);

  //create a state of record whether the comments list is open or not
  const [isComments, setIsComments] = useState(false);

  //likes on the backend is a hashmap of the key being userid and the value being a boolean value of whether the post is liked by that user
  const isLiked = Boolean(likes[loggedInUserId]);
  //get the like count
  const likeCount = Object.keys(likes).length;

  //function to like if not liked previously and unlike if liked previously
  const changeLikeStatus = async () => {
    //an api call to the backend to patch the like status
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      //patch method is used as liked array is modified partially
      method: 'PATCH',
      //authorisation headers
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      //pass the userId to the backend so that they can keep track on whether the userId has liked the post
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    //get back the entire post with the updated likes array
    const updatedPost = await response.json();
    //set Post looks through all the posts to find and replace the newly updated post
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <Container m="2rem 0">
      <Friend
        friendId={postUserId}
        firstName={firstName}
        lastName={lastName}
        userPicturePath={userPicturePath}
      />
      <Text color={main} sx={{ mt: '1rem' }}>
        {description}
      </Text>{' '}
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBox mt="0.25rem">
        <FlexBox gap="1rem">
          <FlexBox gap="0.3rem">
            <IconButton onClick={changeLikeStatus}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Text>{likeCount}</Text>
          </FlexBox>

          <FlexBox gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Text>{Object.keys(comments).length}</Text>
          </FlexBox>
        </FlexBox>
        <IconButton>
          <Insights sx={{fontSize: '2rem'}}/>
        </IconButton>
      </FlexBox>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, idx) => (
            //make the key truly unique
            <Box key={`${firstName}${lastName}-${idx}`}>
              <Divider />
              <Text sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment}
              </Text>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </Container>
  );
};

export default Post;
