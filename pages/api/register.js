import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import { withIronSessionApiRoute } from "iron-session/next";

const saltRounds = 10;

async function register(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST": {
      const password = body.password;
      const name = body.name;
      const email = body.email;

      // bcrypt.hash returns a promise

      let hashPassword = await bcrypt.hash(password, saltRounds);
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashPassword,
        },
      });
      req.session.user = {
        id: user.id,
      };
      await req.session.save();
      return res.status(200).json({
        id: user.id,
        name: user.name,
      });
    }
    default:
      return res.status(404).json({ error: "Not found" });
  }
}

export default withIronSessionApiRoute(register, {
  cookieName: "notepad_session",
  password: process.env.SESSION_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
