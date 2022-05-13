import prisma from "../../lib/prisma";
import { withIronSessionApiRoute } from "iron-session/next";

async function deletenote(req, res) {
  const { method, session, body } = req;

  switch (method) {
    case "POST": {
      const note = await prisma.note.findFirst({
        where: {
          noteId: body.noteId,
          ownerId: session.user.id,
        },
      });

      if (!note) {
        return res.status(400).json({ error: "Note not found" });
      }

      await prisma.note.delete({
        where: {
          noteId: body.noteId,
        },
      });
      return res.status(200).json(true);
    }
    default:
      return res.status(404).json({ error: "Not found" });
  }
}

export default withIronSessionApiRoute(deletenote, {
  cookieName: "notepad_session",
  password: process.env.SESSION_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
