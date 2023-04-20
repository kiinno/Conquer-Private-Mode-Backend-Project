module.exports.toRequiredValidators = (validationChain) => {
  const oldChain = [...validationChain];
  const newChain = oldChain.map((v) =>
    v.notEmpty().withMessage("Please Fill This Field")
  );
  return newChain;
};

module.exports.toOptionalValidators = (validationChain) => {
  const oldChain = [...validationChain];
  const newChain = oldChain.map((v) => v.optional());
  return newChain;
};
