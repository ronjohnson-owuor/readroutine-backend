import { idText } from "typescript";
import data_source from "../datasource/datasource";
import { Token } from "../entities/Token.entity";
import { User } from "../entities/User.entity";

export const user_availlable = async (token: string | undefined) => {
  if (token && token.startsWith("Bearer ")) {
    const extractedToken = token.split(" ")[1];
    if (extractedToken) {
      const decrypted = extractedToken.trim();
      const user = await data_source
        .getRepository(Token)
        .createQueryBuilder("token")
        .where("token.token = :token", { token: decrypted })
        .getOne();
      if (!user) {
        return { proceed: false, id: null, decrypted };
      } else {
        const user_details = await data_source
          .getRepository(User)
          .createQueryBuilder("user").select([
            "user.id",
            "user.username",
            "user.email",
            "user.email_verified",
            "user.profile_url",
            "user.createdAt",
            "user.updatedAt",
          ])
          .where("user.id = :id", { id: user.user_id })
          .getOne();
        return { proceed: true, user:user_details};
      }
    }
  }
  return { proceed: false, id: null };
};
