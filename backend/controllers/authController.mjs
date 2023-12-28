export const login = (req, res) => {
  const username = "test";
  const password = "123456";
  if (req.body.username !== username || req.body.password !== password) {
    return res.status(400).json({
      status: "error",
      data: "USERNAME_OR_PASSWORD_ISWRONG",
    });
  }
  res.status(200).json({
    status: "success",
    message: req.body,
  });
};
