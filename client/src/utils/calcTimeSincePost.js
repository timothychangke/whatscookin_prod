const calcTimeSincePost = (timeString) => {
  // Parse the input string as a Date object
  const then = new Date(timeString);
  // Get the current time
  const now = new Date();
  // Calculate the difference in milliseconds
  const differenceMs = now - then;
  // Convert the difference to seconds
  const differenceSec = differenceMs / 1000;
  // Calculate the difference in minutes (round down)
  const minutes = Math.floor(differenceSec / 60);
  // Calculate the difference in hours (round down)
  const hours = Math.floor(minutes / 60);
  // Calculate the difference in days (round down)
  let days = Math.floor(hours / 24);
  // Determine the appropriate message based on the time difference
  let message;
  //if its more than one day
  if (days > 0) {
    if (days === 1) {
      //if the day is singular
      message = `${days} day ago`;
    } else {
      message = `${days} days ago`;
    }
    //if is less than one day but more than one hour
  } else if (hours > 0) {
    if (hours === 1) {
      message = `${hours} hour ago`;
      //if the hour is singular
    } else {
      message = `${hours} hours ago`;
    }
    //if is less than one hour but more than one minute
  } else {
    //if the minute is singular
    if (minutes === 1) {
      message = `${minutes} min ago`;
      //if the minute is zero or more than one
    } else {
      message = `${minutes} mins ago`;
    }
  }
  return message;
};

export default calcTimeSincePost;
