const path = require("path");

const { readFile, writeFile } = require("fs/promises");

const postJsonFile = path.join(__dirname, "..", "data", "post.json");
const getJsonFile = path.join(__dirname, "..", "data", "get.json");
exports.viewUsersFromPost = async () => {
  try {
    const file = JSON.parse(await readFile(postJsonFile, { encoding: "utf8" }));
    return file;
  } catch (error) {
    console.log(error);
  }
};

exports.viewUsersFromGet = async () => {
  try {
    const file = JSON.parse(await readFile(getJsonFile, { encoding: "utf8" }));
    return file;
  } catch (error) {
    console.log(error);
  }
};

exports.saveUser = async (user) => {
    let parsedUser = JSON.parse(JSON.stringify(user))
    try {
      const existingUsers = JSON.parse(await readFile(getJsonFile, { encoding: "utf8" }));
      existingUsers.users.push(parsedUser);
    await writeFile(getJsonFile, JSON.stringify(existingUsers));
  } catch (error) {
      console.log(error)
  }
};

exports.saveEditedUser = async (editedUser) => {
  let parsedEditedUser = JSON.parse(JSON.stringify(editedUser))
  try {
    let existingUsers = JSON.parse(await readFile(getJsonFile, { encoding: "utf8" }));
    // this loop allows accessing array by reference 
    for (let i=0; i< existingUsers.users.length; i++) {
      if (existingUsers.users[i].id === parsedEditedUser[0].id) {
        existingUsers.users[i] = parsedEditedUser[0]
      }
    }
  await writeFile(getJsonFile, JSON.stringify(editedListOfUsers));
} catch (error) {
    console.log(error)
}
};
