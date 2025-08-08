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

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", validateId(idContactSchema), getOneContact);
contactsRouter.delete("/:id", validateId(idContactSchema), deleteContact);
contactsRouter.post(
  "/",
  bodyParserJson,
  validateBody(createContactSchema),
  createContact
);
contactsRouter.put(
  "/:id",
  validateId(idContactSchema),
  bodyParserJson,
  validateBody(updateContactSchema),
  updateContact
);
contactsRouter.patch(
  "/:id/favorite",
  validateId(idContactSchema),
  bodyParserJson,
  validateBody(updateStatusContactSchema),
  updateStatusContact
);

export default contactsRouter;
