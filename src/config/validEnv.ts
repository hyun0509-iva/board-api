import "dotenv/config";
import { cleanEnv, port, str } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str({
      choices: ["development", "test", "production", "staging"]
    }),
    MONGO_PATH: str(),
  });
}

export default validateEnv;
