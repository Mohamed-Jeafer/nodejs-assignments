const userServices = require("../services/user");

exports.viewAllUsers = (req, res) => {
  const allUsers = userServices.viewUsers();
  if (!allUsers) {
    res.status(404).send("Error getting users");
  }
  res.status(200).json(allUsers);
};

exports.viewOneUser = async (req, res) => {
  const id = req.params.id;
  if (!id) {
        res.status(404).send("user not found");
  }
  try {
    const allUsers = await userServices.viewUsersFromGet();
    const OneUser = findUserByID(allUsers, id);
    res.status(200).json(OneUser);
  } catch (error) {
    console.log(error);
  }
};

exports.AddUsers = async (req, res) => {
  const user = req.body;
  if (!user) {
    res.status(404).send("user not found");
  }
  try {
    await userServices.saveUser(user);
    res.status(200).json("saved");
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
    const updatedUser = oneUser.map((user) => {
      return { ...user, ...updateProperty };
    });
    userServices.saveEditedUser(updatedUser)
    res.status(200).json(updatedUser);
  } catch (error) {}
};

const findUserByID = (listOfUsers, id) => {
  const filteredUser = listOfUsers.users.filter((singleUser) => {
    return singleUser.id === id;
  });
  return filteredUser;
};
