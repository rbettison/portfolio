// File to populate some test data
import connectToDatabase from "./server/db/clientConnection";
import BlogPost from "./server/db/model/blogpost";
import User from "./server/db/model/user";
import Comment from "./server/db/model/comment";
import Like from "./server/db/model/like";


async function seed() {
    console.log('Seeding database');
    await connectToDatabase();
    console.log('Clearing up data');
    await BlogPost.deleteMany();
    await User.deleteMany();
    await Comment.deleteMany();

    const blog1 = await BlogPost.create({
        "body": "<p>Artificial Intelligence is defined as ‘the development of computer systems able to perform tasks normally requiring human intelligence’ and was first theorised by Alan Turing before and then after his work at Bletchley Park during the second World War. Although Turing lacked the computing power to turn his theory into reality, in 1945, he predicted that computers would one day ‘play very good chess’. 52 years later in 1997, the world champion Garry Kasparov was beaten by the chess computer Deep Blue. 25 years on and advances in computer technology and access to massive datasets have expanded AI’s abilities exponentially.</p> <p>Enter OpenAI and their product ChatGPT. With the arrival of ChatGPT, anyone with an internet connection can harness AI’s power. A tool which software engineers, blog writers and students alike are using to guide, inspire and in some cases, complete their work in its entirety (In fact, this blog author must admit ChatGPT helped with the article title). It seems like an innocent, if lazy, shortcut that we would be silly not to take advantage of. However, if ChatGPT can help to complete the work of a software engineer, how far away are software engineers from becoming redundant?</p> <p>There’s no denying that even since its recent inception ChatGPT has developed at an extraordinary rate. Elon Musk (whose interviews we take with a pinch of salt) warned against the rate of rapid development and says he wanted to create his own ‘safe’ version of ChatGPT. This may be part of the reason why OpenAI owner Sam Altman has gone public asking for regulation on AI. Going to government to ask to be regulated paints ChatGPT as the solution, not the problem. Altman has work to do to persuade a sceptical public that OpenAI is on its side in the fight against an army of robots intent on conquering Earth and farming humans in pods- like something out of a well-known 2000s science fiction movie. Facebook for example has struggled with reputational damage as regulation has been enforced after-the-fact on issues such as hate speech, fake news and the safety of minors. Public enquiries follow scandals in which government officials have questioned whether Facebook really is doing all it can to safeguard against these things happening on its platform. This has spilled out into a general distrust of all the players in ‘big tech’ and OpenAI (and other companies hoping to break into the AI market) will do well to learn from the mistakes of innovating tech companies that have gone before them.</p> <p>There are reasons why it is in the interest of the rest of us for AI to be regulated too. For all the good AI has the potential of doing, in the wrong hands it has an equal potential to cause catastrophe. President Putin has said of AI ‘… whoever becomes leader in this sphere will become the ruler of the world’ and while we’d all like to believe Putin has his thoughts on an AI-technology to help boost the productivity of Russia’s workforce – I wouldn’t bet on it. Having a globally recognised authority on what qualifies as acceptable AI use could avoid a second cold war situation as an AI-arms race develops between the worlds’ superpowers.</p> <p>But less of the doom and gloom. There are plenty of reasons to feel optimistic about a future with AI. There are huge potentials in healthcare, where AI could spot causal patterns hidden in vast swathes of data unnoticed before by humans and suggest personalised health treatment for patients. The other huge battleground in which AI can help us come out triumphant is climate change. Again, AI has the potential to inform more effective environmental policies and sustainable practices through the analysis of vast amounts of data. A tight rope lies ahead that we can only traverse with innovation from scientists and entrepreneurs and guided regulation from government. The key lies in regulation that encourages innovation while keeping us safe from those that would weaponize AI’s powers.</p>",
        "created": "2023-06-19T13:00:00.000",
        "author": "Rob Bettison",
        "title": "The Power and Peril of AI",
        "tags": [
        "ai",
        "chatgpt"
        ],
        "description": "A few thoughts on AI Regulation",
        "url": "the-power-and-peril-of-ai",
        "hide": true 
    })
    const blog2 = await BlogPost.create({
        "body": "<p>‘Cerrado’ the sign read. The hostel was shut. Not the ending my throbbing feet needed. I was hot and tired after my first day walking the Camino de Santiago – Spain’s famous pilgrim trail. It was my first adventure in Spain since moving from London and it wasn’t all going to plan…</p> <p>It was about a year ago during my annual review that I asked about transferring to a foreign office. I wanted a change from London, a crack at learning a language and an insight into how a foreign office operates. Having worked at Keytree before its merge with Deloitte, Madrid seemed like a perfect option. Keytree personnel were (and are) split between Madrid and London so I had a few contacts in Deloitte Spain I could call. The wheels were set in motion and soon I had a role in Madrid and the necessary partner approvals. Next... I needed a VISA. I remember my manager harking back to yesteryear ‘in the Keytree days (pre-Brexit) you could decide to move on Friday and be out there working on Monday’.</p> <p>It wasn’t until 6 months later in January that I landed in Madrid. I’d ‘endured’ a month sofa-surfing in London at friends’ houses, a 2 month stay at my aunt’s house and a month back with my parents in Derby. The cost of supporting documents for the VISA application (plus travel to the Spanish consulate in Manchester) and the VISA fee amounted to close to a grand. I did however (naively) think that the extra time I’d been afforded to scrub up on Duolingo would stand me in good stead. </p> <p>I was here. And after the essentials: finding a flat, registering my fingerprints at the local police station (required of all Spanish residents) and opening a Spanish bank account; I was ready to explore. A glance at a map of Spain will tell you Madrid is bang in the middle – and being from Derby, this at least felt familiar (the similarities, it turns out, end there). This makes it a perfect hub for striking out North, South, East or West. By Easter I had gone South to Cordoba (for Feria) and Granada (for the Alhambra) and North to San Sebastian (for the beach and the food!) and Bilbao (for the Guggenheim). In Madrid I’ve danced salsa, practiced Spanish at language exchanges and tried to keep up with the tiki-taka football that Spain is famous for. It is like London in that it is very international. It is different to London in that in my first 2 and a half months I didn’t see a single cloud.</p> <p>The ‘vibe’ in the Madrid office is superb. A fabulous mix of Spaniards from every corner of Spain- each intent on convincing you that their region has the best jamon/beaches/paella/festivals …. They are endlessly friendly and have been very welcoming. Practically, the project work has been a brand-new challenge (and not just linguistically)- a technically complex SAP ECC to SAP HANA migration to get my teeth stuck into. What’s more, whenever I’m by the coffee machine, grabbing lunch or a drink after work I’m having my head boggled by Spanish spoken at 100 mph. Interestingly, my contract is 9-7pm for three quarters of the year and 8-3pm during the summer months. Apparently (and as I am beginning to find out), this is absolutely necessary when temperatures are in the high 30s daily.</p> <p>My overarching impression of Spain and the Spanish is their affability and hospitality. As I found out during my Camino de Santiago escapade – the Spanish look out for people. Despite the hostel being full to the brim, space was made for me, and a makeshift bed constructed.</p> <p>Here’s to the next 6 months.</p>",
        "created": "2023-07-02T13:00:00.000",
        "author": "Rob Bettison",
        "title": "From London to Madrid.",
        "tags": [
            "travel",
            "work",
            "language"
        ],
        "description": "My experience of moving to Spain from the UK post-brexit.",
        "url": "from-london-to-madrid"
    })

    const user1 = await User.create({
        "name": "Rob Bettison Test"
    })
    const user2 = await User.create({
        "name": "Noob User Test"
    })

    const comment1 = await Comment.create({
        "message": "This is a fabolous post, I loved it!",
        "user": user1._id,
        "post": blog1._id
    })

    const comment2 = await Comment.create({
        "message": "I completely disagree with this comment!",
        "user": user1._id,
        "post": blog1._id,
        "parent": comment1._id
    })

    await Comment.updateOne({_id: comment1._id}, {
        "children": [comment2._id]
    })

    await BlogPost.updateOne({_id: blog1._id}, 
        {
            "comments": [comment1._id, comment2._id]
        }
    );

    await User.updateOne({_id: user1._id}, {
        "comments": [comment1._id]
    })

    await User.updateOne({_id: user2._id}, {
        "comments": [comment2._id]
    })



    console.log('Finished seeding database');
    return;
}

seed();