export default function errorHandlerMiddleware(err, req, res, next) {
  if (err.code && err.message) {
    res.status(500).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
