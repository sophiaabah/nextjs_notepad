import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import { withIronSessionApiRoute } from "iron-session/next";

async function signin(req, res) {
  const { method, body } = req;
  try {
    switch (method) {
      case "POST": {
        const email = body.email;
        const password = body.password;

        // console.log({ email: email, password: password });

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          return res
            .status(400)
            .json({ error: "email and password incorrect" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return res
            .status(400)
            .json({ error: "email and password incorrect" });
        }

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
  } catch (error) {
    return res.status(500).send({ message: "Request failed." });
  }
}

export default withIronSessionApiRoute(signin, {
  cookieName: "notepad_session",
  password: process.env.SESSION_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
