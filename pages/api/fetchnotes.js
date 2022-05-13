import prisma from "../../lib/prisma";
import { withIronSessionApiRoute } from "iron-session/next";

async function fetchnotes(req, res) {
  const { method, session } = req;

  switch (method) {
    case "GET": {
      const response = await prisma.note.findMany({
        where: { ownerId: session.user.id },
      });
      console.log(response);
      return res.status(200).json(response);
    }
    default:
      return res.status(404).json({ error: "Not found" });
  }
}

export default withIronSessionApiRoute(fetchnotes, {
  cookieName: "notepad_session",
  password: process.env.SESSION_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
