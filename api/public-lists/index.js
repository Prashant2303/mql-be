import { ObjectId } from "mongodb";

const ERROR_MESSAGES = {
    503: 'Internal Server Error. Please try again later.'
}

export async function getPublicLists(req, res) {
    try {
        const { listsCollection } = res.locals.db;
        const cursor = await listsCollection.find({ access: 'Public' }).project({ questions: 0 });
        const lists = await cursor.toArray();
        return res.json(lists);
    } catch (err) {
        console.log(err);
        return res.status(503).send(ERROR_MESSAGES[503]);
    }
}

export async function getPublicListById(req, res) {
    const { listId } = req.params;
    try {
        const { listsCollection } = res.locals.db;
        const result = await listsCollection.findOne({ _id: new ObjectId(listId), access: 'Public' }, { projection: { ownerId: 0 } });
        return res.json(result);
    } catch (err) {
        console.error(err);
        return res.status(503).send(ERROR_MESSAGES[503]);
    }
}