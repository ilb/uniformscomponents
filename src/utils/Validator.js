const Validator = (model) => {
  const error = [];

  if (!model?.firstName) {
    error.push({
      dataPath: '.firstName',
      message: 'Неверный firstName'
    });
  }
  console.log(error);
  return error;
};
export default Validator;
