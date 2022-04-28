const path = require("path");

const { readFile, writeFile } = require("fs/promises");

const postJsonFile = path.join(__dirname, "..", "data", "post.json");
const getJsonFile = path.join(__dirname, "..", "data", "get.json");
exports.viewUsersFromPost = async () => {
  try {
    const { users } = JSON.parse(
      await readFile(postJsonFile, { encoding: "utf8" })
    );
    return users;
  } catch (error) {
    console.log(error);
  }
};

exports.viewUsersFromGet = async () => {
  try {
    const { users } = JSON.parse(await readFile(getJsonFile, { encoding: "utf8" }));
    return users;
  } catch (error) {
    console.log(error);
  }
};

exports.saveUser = async (user) => {
  let parsedUser = JSON.parse(JSON.stringify(user));
  try {
    const existingUsers = JSON.parse(
      await readFile(getJsonFile, { encoding: "utf8" })
    );
    existingUsers.users.push(parsedUser);
    await writeFile(getJsonFile, JSON.stringify(existingUsers));
  } catch (error) {
    console.log(error);
  }
};

exports.saveEditedUser = async (editedUserData) => {
  let [editedUser] = JSON.parse(JSON.stringify(editedUserData));
  try {
    let existingUsers = JSON.parse(
      await readFile(getJsonFile, { encoding: "utf8" })
    );
    // this loop allows accessing array by reference
    for (let i = 0; i < existingUsers.users.length; i++) {
      if (existingUsers.users[i].id === editedUser.id) {
        existingUsers.users[i] = editedUser;
      }
    }

    await writeFile(getJsonFile, JSON.stringify(existingUsers));
  } catch (error) {
    console.log(error);
  }
};
