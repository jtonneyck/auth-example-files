module.exports = user => {
  //stripping away password and returning the rest of the user object.
  const { password, ...rest } = user;
  return rest;
};
