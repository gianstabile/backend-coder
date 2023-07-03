import { restoreService } from "./../services/restore.service.js";

export async function restore(req, res) {
  try {
    const { email } = req.body;

    await restoreService.createRestore(email);

    return res.status(200).send("Password reset email sent successfully.");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function changePassword(req, res) {
  try {
    const { newPassword } = req.body;
    const { token } = req.query;
    const result = await restoreService.changePassword(token, newPassword);

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
