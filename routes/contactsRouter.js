import express from "express";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";
import { updateContactSchema } from "../schemas/contactsSchemas.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";

const bodyParserJson = express.json();

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", getOneContact);
contactsRouter.delete("/:id", deleteContact);
contactsRouter.post(
  "/",
  bodyParserJson,
  validateBody(createContactSchema),
  createContact
);
contactsRouter.put(
  "/:id",
  bodyParserJson,
  validateBody(updateContactSchema),
  updateContact
);

export default contactsRouter;
