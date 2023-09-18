import { ObjectId } from "mongodb";
import connectToDatabase from "../../../db/clientConnection";

export default async function getBlogPost(req, res) {
    console.log('getting blog post');

    console.log(req.query);
    let client = await connectToDatabase();
    return client.collection('blogposts')
        .findOne({"_id": new ObjectId(req.query.pid)})
        .then((book) => res.status(200).json(book))
        .catch(() => {
            res.status(500).json({error: 'Could not fetch the documents.'})
        });
    // return res.status(200).json(books);
}