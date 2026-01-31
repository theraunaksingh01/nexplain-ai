//Temp File for hashing password

import bcrypt from "bcrypt";

async function run() {
  const hash = await bcrypt.hash("Z_4,@12GT1#b", 12);
  console.log(hash);
}

run();