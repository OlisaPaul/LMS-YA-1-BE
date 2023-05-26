const avatarStyles = require("../common/avatarStyles.common");

const getRandomAvatarStyle = () => {
  // Generate a random number between 0 and (avatarStyles.length - 1)
  const randomIndex = Math.floor(Math.random() * avatarStyles.length);

  // Use the random index to select a random avatar style from the array
  return avatarStyles[randomIndex];
};

const generateRandomAvatar = async (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const _email = email.trim();

  const isValidEmail = emailRegex.test(_email);
  if (!isValidEmail) {
    throw new Error("Invalid email");
  }

  const entropySource = () => Math.random().toString(36).substring(2, 7);

  const replaceAt = `-${entropySource()}-`;
  const replaceDot = `-${entropySource()}-`;

  const seed = _email.replace("@", replaceAt).replace(/\./g, replaceDot);

  const randomAvatarStyle = getRandomAvatarStyle();

  if (!randomAvatarStyle || !avatarStyles.includes(randomAvatarStyle)) {
    // console.error('Invalid avatar style') // log this error to the console
    throw new Error("Something failed: ");
  }

  const avatarUrl = `https://api.dicebear.com/5.x/${randomAvatarStyle}/svg?seed=${seed}&size=200&radius=50`;

  return avatarUrl;
};
module.exports = generateRandomAvatar;
