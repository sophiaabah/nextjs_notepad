import prisma from "../../lib/prisma";
import { withIronSessionApiRoute } from "iron-session/next";

async function user(req, res) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const sessionUser = req.session.user;
      if (!sessionUser || !sessionUser.id) {
        console.log("no session user", sessionUser);
        return res.status(200).json(null);
      }
      const user = await prisma.user.findFirst({
        where: { id: sessionUser.id },
        include: { notes: true },
      });
      if (!user) {
        console.log("user not found", sessionUser, user);
        return res.status(200).json(null);
      }
      return res.status(200).json({
        id: user.id,
        name: user.name,
        notes: user.notes,
      });
    }
    default:
      return res.status(400).json({ error: "Not found" });
  }
}

export default withIronSessionApiRoute(user, {
  cookieName: "notepad_session",
  password: process.env.SESSION_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
