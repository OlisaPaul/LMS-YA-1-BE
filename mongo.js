const { User } = require("./src/model/user.model");

const getUser = async () => {
  const user = await User.aggregate([
    {
      $group: {
        _id: null, // Use null instead of "_id" for grouping all documents
        // Replace "test" with the actual field name to add to the set
      },
    },
  ]);

  return user;
};

getUser()
  .then((user) => console.log(user))
  .catch((error) => console.error(error));
