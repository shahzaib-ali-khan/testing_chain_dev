const response = async function handler(req, res) {
  res.setPreviewData(
    {},
    {
      maxAge: 60 * 5,
    }
  );
  res.end();
}

export default response;