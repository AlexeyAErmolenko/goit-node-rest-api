import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (_, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.json({ status: 200, data: { contacts } });
  } catch (error) {
    next(HttpError(500));
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await contactsService.getContactById(contactId);
    if (!contact) {
      return next(HttpError(404, "Not found"));
    }
    res.json({ status: 200, data: { contact } });
  } catch (error) {
    next(HttpError(404));
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await contactsService.removeContact(contactId);
    if (!contact) {
      return next(HttpError(404, "Not found"));
    }
    res;
    res.json({ status: 200, data: { contact } });
  } catch (error) {
    next(HttpError(404));
  }
};

export const createContact = async (req, res, next) => {
  try {
    const contact = req.body;
    const newContact = await contactsService.addContact(contact);
    res.json({ status: 201, data: { newContact } });
  } catch (error) {
    next(HttpError(400));
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const contactId = req.params;
    const contact = req.body;
    if (!contact || Object.keys(contact).length === 0) {
      return next(HttpError(400, "Body must have at least one field"));
    }
    const newContact = await contactsService.updContact(contactId, contact);
    if (!newContact) {
      return next(HttpError(404, "Not found"));
    }
    res.json({ status: 200, data: { newContact } });
  } catch (error) {
    next(HttpError(error, error.message));
  }
};
