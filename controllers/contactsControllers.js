import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contact.js";

export const getAllContacts = async (_, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
  } catch (error) {
    next(HttpError(500));
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (contact === null) {
      return next(HttpError(404, "Contact not found"));
    }
    res.status(200).send(contact);
  } catch (error) {
    next(HttpError(404));
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (contact === null) {
      return next(HttpError(404, "Contact not found"));
    }
    res.send(contact);
  } catch (error) {
    next(HttpError(404));
  }
};

export const createContact = async (req, res, next) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };
  try {
    const newContact = await Contact.create(contact);
    res.status(201).send(newContact);
  } catch (error) {
    next(HttpError(400));
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      favorite: req.body.favorite,
    };
    if (!contact || Object.keys(contact).length === 0) {
      return next(HttpError(400, "Body must have at least one field"));
    }
    const newContact = await Contact.findByIdAndUpdate(id, contact, {
      new: true,
    });
    if (contact === null) {
      return next(HttpError(404, "Contact not found"));
    }
    res.status(200).send(newContact);
  } catch (error) {
    next(HttpError(error, error.message));
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = {
      favorite: req.body.favorite,
    };
    if (!contact || Object.keys(contact).length === 0) {
      return next(HttpError(400, "Body must have at least one field"));
    }
    const newContact = await Contact.findByIdAndUpdate(id, contact, {
      new: true,
    });
    if (contact === null) {
      return next(HttpError(404, "Contact not found"));
    }
    res.status(200).send(newContact);
  } catch (error) {
    next(HttpError(404));
  }
};
