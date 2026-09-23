import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import CredensitalProvider from 'next-auth/providers/credentials';
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.Google_ClientID_id,
      clientSecret: process.env.Google_ClientID_secret,
    }),
    CredensitalProvider({
      name:"Credential",
      credentials:{
        name:{label:"name",type:"text"},
        email:{label:"Email",type:"email"},
        id:{label:"id",type:"text"}
      },
      authorize:async(credential)=>{
        const email = credential.email as string | undefined ;
        const name = credential.name as string | undefined;
        const userid = credential.id as string | undefined;
        if(!email || !userid || !name){
          throw new Error("Invalid credentials")
        }
        console.log(userid)
        return {name:name,email:email,id:userid}
      }
    })
  ],
  pages:{
    signIn:"/login",
  },
  callbacks:{
    signIn:async({user,account})=>{
      if(account?.provider=="google"){
        try {
          const res = await fetch(`${process.env.Frontend_Url}api/googlelogin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              googleid: user.id,
              image: user.image
            })
          });
          const data = await res.json();
          console.log(data);
          return !!data.success;
        } catch (err) {
          console.error("Google login callback error:", err);
          return false;
        }
      }
      else if (account?.provider === "credentials") {
        return true 
      }
      else{
        return false
      }
    }
  }
})