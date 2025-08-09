import express from "express";
import { validateBody, validateId } from "../helpers/validate.js";
import { idContactSchema } from "../schemas/contactsSchemas.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";
import { updateContactSchema } from "../schemas/contactsSchemas.js";
import { updateStatusContactSchema } from "../schemas/contactsSchemas.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

const bodyParserJson = express.json();

const contacts = express.Router();

contacts.get("/", getAllContacts);
contacts.get("/:id", validateId(idContactSchema), getOneContact);
contacts.delete("/:id", validateId(idContactSchema), deleteContact);
contacts.post(
  "/",
  bodyParserJson,
  validateBody(createContactSchema),
  createContact
);
contacts.put(
  "/:id",
  validateId(idContactSchema),
  bodyParserJson,
  validateBody(updateContactSchema),
  updateContact
);
contacts.patch(
  "/:id/favorite",
  validateId(idContactSchema),
  bodyParserJson,
  validateBody(updateStatusContactSchema),
  updateStatusContact
);

export default contacts;
