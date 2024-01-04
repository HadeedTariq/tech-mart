import { connect } from "mongoose";

export async function connectToDb(uri: string) {
  try {
    await connect(uri);
    console.log("db connected");
  } catch (err) {
    console.log(err);
    process.exit();
  }
}
