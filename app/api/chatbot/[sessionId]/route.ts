import { NextRequest, NextResponse } from "next/server";
import { sendMessage } from "../CXService";

export const POST = async (req: NextRequest, { params }: { params: { sessionId: string }}) => {

    try {
        let reqJson = await req.json();
        let message = reqJson.message;
        let resp = await sendMessage(message, params.sessionId);
        
        return NextResponse.json({message: resp}, {status: 200})
    } catch(err) {
        console.log(err);
        return NextResponse.json({message: "Error communicating with chatbot"}, {status: 500});
    }
    
}