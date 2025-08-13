import express from "express";
import { validateBody, validateId } from "../helpers/validate.js";
import { idContactSchema } from "../schemas/joiSchemas.js";
import { createContactSchema } from "../schemas/joiSchemas.js";
import { updateContactSchema } from "../schemas/joiSchemas.js";
import { updateStatusContactSchema } from "../schemas/joiSchemas.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contacts.js";
import correctPhone from "../middleware/correctPhone.js";

const bodyParserJson = express.json();

const contacts = express.Router();

contacts.get("/", getAllContacts);
contacts.get("/:id", validateId(idContactSchema), getOneContact);
contacts.delete("/:id", validateId(idContactSchema), deleteContact);
contacts.post(
  "/",
  bodyParserJson,
  validateBody(createContactSchema),
  correctPhone,
  createContact
);
contacts.put(
  "/:id",
  validateId(idContactSchema),
  bodyParserJson,
  validateBody(updateContactSchema),
  correctPhone,
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
