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
        console.log(email,name,userid)
        return {name:name,email:email,id:userid}
      }
    })
  ],
  pages:{
    signIn:"/login",
  },
})