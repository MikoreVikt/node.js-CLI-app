const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    return JSON.parse(await fs.readFile(contactsPath, "utf8"));
  } catch (err) {
    return console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();

    const contactById = contacts.find((el) => el.id === contactId.toString());
    console.log("contactById: ", contactById);

    return contactById;
  } catch (err) {
    return console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const filteredContacts = contacts.filter(
      (el) => el.id !== contactId.toString()
    );

    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts, null, 2),
      (err) => {
        if (err) console.log(err);
      }
    );

    console.log(`Contact with id:${contactId} has been removed!`);
  } catch (err) {
    return console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    const newContactsArr = [...contacts, newContact];

    fs.writeFile(
      contactsPath,
      JSON.stringify(newContactsArr, null, 2),
      (err) => {
        if (err) console.log(err);
      }
    );

    console.log(`New contact has been added!`, newContact);
  } catch (err) {
    return console.log(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
