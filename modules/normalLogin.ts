import { Request, Response } from "express";
import validateBodyRequest from "../helpers/validaterequestbody";
import data_source from "../datasource/datasource";
import { User } from "../entities/User.entity";
import CryptoJS from "crypto-js";
import { token_generator } from "../helpers/token_generator";
import { Token } from "../entities/Token.entity";

const normalLogin = async (request: Request, response: Response) => {
  const { body } = request;
  const { message, proceed } = validateBodyRequest(body, [
    "email:string",
    "password:string",
  ]);
  if (!proceed) {
    return response.json({ message, proceed});
  }
  const userRepo = data_source.getRepository(User);
  const user = await userRepo.findOneBy({
    email: body.email,
  });
  if (!user) {
    return response.json({
      message: "user not found/ try sign in first",
      proceed: false,
    });
  }
  const password = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASSWORD_ENCRYPTION_CODE!
  ).toString(CryptoJS.enc.Utf8);

  if (password !== body.password) {
    return response.json({
      message: "incorrect password",
      proceed: false,
    });
  }
  let encrypted_token = token_generator();
  await data_source
    .createQueryBuilder()
    .update(Token)
    .set({token:encrypted_token})
    .where("user_id = :id", { id: user.id })
    .execute()
    return response.json({message:"login success",proceed:true,token:encrypted_token});
};

export default normalLogin;
