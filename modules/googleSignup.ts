import { Request, Response } from "express";
import validatebodyrequest from "../helpers/validaterequestbody";
import { token_generator } from "../helpers/token_generator";
import CryptoJS from "crypto-js";
import data_source from "../datasource/datasource";
import { User } from "../entities/User.entity";
import { Token } from "../entities/Token.entity";

const googleSignin = async (request: Request, response: Response) => {
  try {
    const result = validatebodyrequest(request.body, [
      "username:string",
      "email:string",
      "key:string",
    ]);
    if (!result.proceed) {
      return response.json(result);
    }
    const { username, email, key, login } = request.body;
    if (key !== process.env.GOOGLE_APP_VERYFIER_KEY!) {
      console.log("intruder trying to login with false credentials");
      return response.json({
        message:
          "incorrect google app key contact admin for key or try normal login",
        proceed: false,
      });
    }
    const encrypted_token = token_generator();
    var encrypted_password = CryptoJS.AES.encrypt(
      process.env.GOOGLE_APP_VERYFIER_KEY!,
      process.env.PASSWORD_ENCRYPTION_CODE!
    ).toString();
    const userRepo = data_source.getRepository(User);
    const tokenRepo = data_source.getRepository(Token);
    const email_exist = userRepo.findOne({ where: { email: email } });
    if (await email_exist) {
      await data_source
        .createQueryBuilder()
        .update(Token)
        .set({ token: encrypted_token })
        .where("user_id = :id", {
          id: await email_exist.then((user) => user?.id),
        })
        .execute();
      return response.json({
        message: "login successfull",
        proceed: true,
        token:encrypted_token,
      });
    }
    const user = new User();
    user.username = username;
    user.password = encrypted_password;
    user.email = email;
    user.email_verified = true;
    user.type = "google signin";
    await userRepo.save(user);
    const token_ = new Token();
    token_.user_id = user.id;
    token_.token = encrypted_token;
    await tokenRepo.save(token_);
    return response.json({
      message: "signup successfull redirecting to profile",
      proceed: true,
     token:encrypted_token,
    });
  } catch (error) {
    return response.json({
      message: `server error try again:${error}`,
      proceed: false,
    });
  }
};

export default googleSignin;
