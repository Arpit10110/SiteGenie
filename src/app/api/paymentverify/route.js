import { NextResponse } from "next/server";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { UserModel } from "@/model/Usermodel";
import { TokenModel } from "@/model/Token";
import { connectDB } from "@/db/db";
import { getuser } from "@/lib/getuser";
const cashfree = new Cashfree(
    // CFEnvironment.PRODUCTION,
    CFEnvironment.SANDBOX,
    process.env.Cashfree_App_ID, 
    process.env.Cashfree_Secret
  );
  
  export const POST = async (req) => {
    try {
      await connectDB();
      const { orderId, tokens } = await req.json();
      if (!orderId || !tokens) {
        return NextResponse.json({ success: false, message: "Please fill in all the fields" });
      }
      const user = await getuser();
      if (!user) {
        return NextResponse.json({ success: false, message: "Please LogIn First" });
      }
      const user_data = await UserModel.findOne({ email: user.user.email });
      if (!user_data) {
        return NextResponse.json({ success: false, message: "User not found" });
      }
      const response = await cashfree.PGOrderFetchPayments(orderId);
      const paymentData = Array.isArray(response.data) ? response.data[0] : response.data;
      if (paymentData.payment_status === "SUCCESS") {
        const token = await TokenModel.findOne({ userid: user_data._id });
        const addtoken = Number(token.token) + Number(tokens);
        await TokenModel.updateOne({ userid: user_data._id }, { token: addtoken });
        return NextResponse.json({ success: true, data: paymentData });
      }
      return NextResponse.json({ success: false, message: "Payment Failed", data: paymentData });
    } catch (error) {
      return NextResponse.json({ success: false, message: error.message || error }); // error.message for clarity
    }
  };
  