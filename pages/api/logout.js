import { withIronSessionApiRoute } from "iron-session/next";

async function logout(req, res) {
  const { method, session } = req;

  switch (method) {
    case "GET": {
      const response = await session.destroy();
      return res.redirect("/");
    }
    default:
      return res.status(404).json({ error: "Not found" });
  }
}

export default withIronSessionApiRoute(logout, {
  cookieName: "notepad_session",
  password: process.env.SESSION_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
