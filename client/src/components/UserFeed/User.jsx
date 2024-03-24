import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserImage from '../UI/UserImage';
import FlexBox from '../UI/FlexBox';
import Container from '../UI/Container';

import {
  ManageAccountsOutlined,
  EditOutlined,
  EmailOutlined,
  DescriptionOutlined,
} from '@mui/icons-material';
import { Box, Typography as Text, Divider, useTheme } from '@mui/material';

export default function User({ userId, picturePath }) {
  //set the colors of the widget
  const { palette } = useTheme();
  //get dark color from palette
  const dark = palette.neutral.dark;
  //get medium color from palette
  const medium = palette.neutral.medium;
  //get main color from palette
  const main = palette.neutral.main;

  //navigate to different routes in app
  const navigate = useNavigate();
  //grab token from the store
  const token = useSelector((state) => state.token);

  //add user state
  const [user, setUser] = useState(null);
  //add profile viewer count state
  const [profileViewer, setProfileViewer] = useState(
    Math.floor(Math.random() * 100),
  );

  //call backend to get user
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'GET',
      //grab the jwt token from the Bearer
      headers: { Authorization: `Bearer ${token}` },
    });
    //wait for user data to be called
    const data = await response.json();
    //set data to user state
    setUser(data);
  };

  //getUser() is called when you first render the page as there are no dependencies in useEffect
  useEffect(() => {
    getUser();
  }, []);

  //don't return anything if user failed to fetch
  if (!user) {
    return null;
  }

  //destructure the User object
  const { firstName, lastName, bio, friends, email } = user;

  return (
    <Container>
      <FlexBox
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBox gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Text
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                '&:hover': { color: palette.primary.light, cursor: 'pointer' },
              }}
            >
              {firstName} {lastName}
            </Text>
            <Text color={medium}>{friends.length} friends</Text>
          </Box>
        </FlexBox>
        <ManageAccountsOutlined />
      </FlexBox>
      <Divider />
      <Box p="1rem 0">
        <Box display="flex" alighItems="center" gap="1rem" mb="0.5rem">
          <DescriptionOutlined fontSize="large" sx={{ color: main }} />
          <Text color={medium}>{bio}</Text>
        </Box>
      </Box>
      <Divider />
      <Box p="1rem 0">
        <FlexBox mb="0.5rem">
          <Text color={medium}>Profile viewers</Text>
          <Text color={medium} fontWeight="500">
            {profileViewer}
          </Text>
        </FlexBox>
        <FlexBox mb="0.5rem">
          <Text color={medium}>Total Likes</Text>
          <Text color={medium} fontWeight="500">
            wip
          </Text>
        </FlexBox>
        <FlexBox mb="0.5rem">
          <Text color={medium}>Posts made</Text>
          <Text color={medium} fontWeight="500">
            wip
          </Text>
        </FlexBox>
      </Box>
      <Divider />
      <Box p="1rem 0">
        <Text fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Contact me:
        </Text>
        <FlexBox gap="1rem">
          <FlexBox gap="1rem">
            <EmailOutlined fontSize="large" />
            <Box>
              <Text color={main} fontWeight="500">
                Email
              </Text>
              <Text color={{ medium }}>{email}</Text>
            </Box>
          </FlexBox>
          <EditOutlined sx={{ color: main }} />
        </FlexBox>
      </Box>
    </Container>
  );
}
