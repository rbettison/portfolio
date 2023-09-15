import connectToDatabase from "../../db/clientConnection";

export default async function contact(req, res) {
    console.log('getting blog');
    let books = [];

    let client = await connectToDatabase();
    return client.collection('blogposts')
        .find().sort({author: 1}).forEach(book=> {
            books.push(book);
            console.log('here');
            })
        .then(() => res.status(200).json(books))
        .catch(() => {
            res.status(500).json({error: 'Could not fetch the documents.'})
        });
    // return res.status(200).json(books);
}