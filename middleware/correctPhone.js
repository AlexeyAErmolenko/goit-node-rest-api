function correctPhone(req, res, next) {
  const number = req.body.phone || null;
  if (number !== null) {
    req.body.phone = `(${number.slice(0, 3)}) ${number.slice(
      3,
      6
    )}-${number.slice(6, 10)}`;
  }
  next();
}

export default correctPhone;
