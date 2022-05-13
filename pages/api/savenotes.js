import prisma from "../../lib/prisma";
import { withIronSessionApiRoute } from "iron-session/next";

async function savenotes(req, res) {
  const { method, session, body } = req;
  const notes = body.notes;

  switch (method) {
    case "POST": {
      const response = await prisma.$transaction(
        notes.map((note) =>
          prisma.note.upsert({
            where: { noteId: note.noteId },
            update: {
              text: note.text,
              ownerId: session.user.id,
            },
            create: {
              text: note.text,
              ownerId: session.user.id,
              noteId: note.noteId,
            },
          })
        )
      );
      const userNotes = await prisma.note.findMany({
        where: { ownerId: session.user.id },
      });
      return res.status(200).json(userNotes);
    }
    default:
      return res.status(404).json({ error: "Not found" });
  }
}

export default withIronSessionApiRoute(savenotes, {
  cookieName: "notepad_session",
  password: process.env.SESSION_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
