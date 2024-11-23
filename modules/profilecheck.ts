import { Request, Response } from "express";
import { user_availlable } from "../helpers/token_valid";
import data_source from "../datasource/datasource";
import { User } from "../entities/User.entity";

export const profileCheck = async (req: Request, res: Response) => {
  const bearer_token = req.headers.authorization;
  const { proceed, user } = await user_availlable(bearer_token);
  if (proceed) {
    if (!user?.profile_url) {
      const { profile_image } = req.body;
      await data_source
        .createQueryBuilder()
        .update(User)
        .set({ profile_url: profile_image! })
        .where("id = :id", { id: user?.id })
        .execute();
    }
    return res.json({ proceed,user });
  }
  return res.json({ proceed,user });
};
