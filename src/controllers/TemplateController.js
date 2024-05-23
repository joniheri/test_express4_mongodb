const template = async (req, res) => {
  try {
    return res.send({
      status: 'euccess',
      message: `Success`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error catch',
      message: error.message,
    });
  }
};
