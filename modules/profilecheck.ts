import { Request, Response } from "express";
import { user_availlable } from "../helpers/token_valid";
import data_source from "../datasource/datasource";
import { User } from "../entities/User.entity";
import moment from "moment";
import { Userdetails } from "../entities/Userdetails.entity";

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
        const nick_name = user?.username.trim().replace(' ','_');
        const user_id = user?.id;
        const tier = 0;  //0 -> free tier, 1 -> monthly 2 -> yearly;
        const expiry_date = moment(user?.createdAt).add(7,'days').toISOString();
        const createdAt = moment().toISOString();
        const updatedAt = createdAt;
        await data_source.createQueryBuilder().insert().into(Userdetails).values([
          {user_id:user_id,nickname:nick_name,tier,expiry_date,createdAt,updatedAt}
        ]).execute();
    }
    const user_data = await data_source
    .getRepository(Userdetails)
    .createQueryBuilder("userdetails").select([
      "userdetails.nickname",
      "userdetails.tier",
      "userdetails.expiry_date"
    ])
    .where("userdetails.user_id = :user_id", { user_id: user?.id })
    .getOne();
    return res.json({ proceed,user,user_data });
  }
  return res.json({ proceed,user,user_data:null});
};
