import { getServerSession } from "next-auth/next";
import { OPTIONS } from "./options";

export async function isAuthorised() {

    console.log('Checking session object: ');
    const session = await getServerSession(OPTIONS);
    console.log('session:' + session);

    if(!session || session == null) {
        return false
    } else {
        return true
    }
    
}