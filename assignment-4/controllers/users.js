const userServices = require("../services/user");

exports.viewAllUsers = async (req, res) => {
  try {
    const allUsers = await userServices.viewUsersFromGet();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).send("Error getting users");
  }
};

exports.viewOneUser = async (req, res) => {
  const id = req.params?.id;
  try {
    const allUsers = await userServices.viewUsersFromGet();
    const oneUser = findUserByID(allUsers, id);
    oneUser.length < 1 ? res.status(404).send("user not found") : res.status(200).json(oneUser);
  } catch (error) {
    console.log(error);
  }
};

exports.AddUsers = async (req, res) => {
  const user = req.body;
  if (Object.keys(user).length <= 0) {
    return res.status(500).send("Please add user details");
  }
  try {
    await userServices.saveUser(user);
    return res.status(200).json("saved");
  } catch (error) {
    console.log(error);
  }
};

exports.editUsers = async (req, res) => {
  const id = req.params.id;
  const updateProperty = req.body;
  if (!id) {
    res.status(404).send("user not found");
  }
  try {
    const allUsers = await userServices.viewUsersFromPost();
    const oneUser = findUserByID(allUsers, id);
    if (oneUser.length < 1) {
      res.status(404).send("user not found")
    }

    const updatedUser = oneUser.map((user) => {
      return { ...user, ...updateProperty };
    });
    userServices.saveEditedUser(updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {}
};

const findUserByID = (listOfUsers, id) => {
  const filteredUser = listOfUsers.filter((singleUser) => {
    return singleUser.id === id;
  });
  return filteredUser;
};
