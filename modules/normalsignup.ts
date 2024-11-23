import { Request, Response } from "express";
import validatebodyrequest from "../helpers/validaterequestbody";
import { token_generator } from "../helpers/token_generator";
import CryptoJS from "crypto-js";
import data_source from "../datasource/datasource";
import { User } from "../entities/User.entity";
import { Token } from "../entities/Token.entity";

const normalSignin = async (request: Request, response: Response) => {
  try {
    const result = validatebodyrequest(request.body, [
      "username:string",
      "email:string",
      "password:string",
    ]);
    if (!result.proceed) {
      return response.json(result);
    }
    const { username, email, password } = request.body;
    let encrypted_token = token_generator();
    var encrypted_password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_ENCRYPTION_CODE!
    ).toString();
    const userRepo = data_source.getRepository(User);
    const tokenRepo = data_source.getRepository(Token);
    const email_exist = userRepo.findOne({ where: { email: email } });
    if (await email_exist) {
      return response.json({
        message: "that email already exist",
        proceed: false,
      });
    }

    const user = new User();
    user.username = username;
    user.password = encrypted_password;
    user.email = email;
    user.email_verified = false;
    user.type = "normal signin";
    await userRepo.save(user);
    const token_ = new Token();
    token_.user_id = user.id;
    token_.token = encrypted_token ;
    await tokenRepo.save(token_);
    return response.json({
      message: "signup successfull",
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

export default normalSignin;
