import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import HttpError from "../helpers/HttpError.js";

const contactsPath = path.resolve("db", "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  const removedContact = contacts[index];
  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];
  await writeContacts(newContacts);
  return removedContact || null;
}

async function addContact({ name, email, phone }) {
  const contacts = await readContacts();
  const truePhone = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(
    6,
    10
  )}`;

  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone: truePhone,
  };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact || null;
}

async function updContact(
  contactId,
  { name = null, email = null, phone = null }
) {
  let truePhone = null;
  if (phone !== null) {
    truePhone = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(
      6,
      10
    )}`;
  }
  const oldContact = await getContactById(contactId);
  const newContact = {
    id: contactId,
    name: name || oldContact.name,
    email: email || oldContact.email,
    phone: truePhone || oldContact.phone,
  };
  await removeContact(contactId);
  const contacts = await readContacts();
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact || null;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updContact,
};
