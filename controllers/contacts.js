import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contact.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 5, favorite } = req.query;
    const skip = (page - 1) * limit;

    const filter = { owner: req.user.id };
    if (favorite !== undefined) {
      const isFavorite = favorite === "true";
      filter.favorite = isFavorite;
    }

    const contacts = await Contact.find(filter).skip(skip).limit(limit);

    const total = await Contact.countDocuments(filter);

    res.status(200).send({
      contacts,
      total,
      page,
      limit,
    });
  } catch (error) {
    next(HttpError(500));
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const contact = await Contact.findById(id);
    // if (contact === null) {
    //   return next(HttpError(404, "Contact not found"));
    // }
    // if (contact.owner.toString() === req.user.id) {
    //   return res.status(404).send({ message: "Contact is not found" });
    // }
    const contact = await Contact.findOne({ _id: id, owner: req.user.id });
    if (contact === null) {
      return res.status(404).send({ message: "Contact is not found" });
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
    if (contact.owner.toString() === req.user.id) {
      return res.status(404).send({ message: "Contact is not found" });
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
    owner: req.user.id,
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
      owner: req.user.id,
    };

    if (!contact || Object.keys(contact).length === 0) {
      return next(HttpError(400, "Body must have at least one field"));
    }

    const newContact = await Contact.findByIdAndUpdate(id, contact, {
      new: true,
    });

    if (newContact === null) {
      return next(HttpError(404, "Contact not found"));
    }

    if (contact.owner.toString() === req.user.id) {
      return res.status(404).send({ message: "Contact is not found" });
    }
    res.status(200).send(newContact);
  } catch (error) {
    next(HttpError(error, message.error));
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
    if (contact.owner.toString() === req.user.id) {
      return res.status(404).send({ message: "Contact is not found" });
    }
    res.status(200).send(newContact);
  } catch (error) {
    next(HttpError(404));
  }
};
