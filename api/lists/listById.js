import { apiHandler, getUserFromToken } from '../helpers/api-handler.js';
import { ObjectId } from 'mongodb';

export default apiHandler({
    get: handler().get,
    delete: handler()._delete,
    patch: handler().patch
})

function handler() {
    return { get, _delete, patch };

    async function get({ req, res, listsCollection }) {
        const { id: listId } = req.params;
        const result = await listsCollection.findOne({ _id: new ObjectId(listId) }, { projection: { questions: 1, _id: 0 } });
        return res.status(200).json(result?.questions);
    }
    
    async function _delete({ req, res, listsCollection, usersCollection }) {
        const { id: listId } = req.params;
        const { user } = getUserFromToken(req);
        const userDefaultList = usersCollection.findOne(user, { projection: { defaultList: 1, _id: 0 } });
        
        if (userDefaultList === listId) throw 'Cannot delete default List';
        
        const result = await listsCollection.deleteOne({ _id: new ObjectId(listId) });
        return res.status(200).json(result);
    }
    
    async function patch({ req, res, listsCollection }) {
        const { id: listId } = req.params;
        const targetList = { _id: new ObjectId(listId) }

        const { ownerId } = await listsCollection.findOne(targetList, { projection: { ownerId: 1, _id: 0 } });
        const ownerOfList = ownerId.toString();
        const { userString } = getUserFromToken(req);
        if (userString !== ownerOfList) throw 'Only the list owner can modify their list';

        const [field] = Object.keys(req.body);
        const updateValue = req.body[field];
        const updateResult = await listsCollection.updateOne(targetList, { "$set": { [field]: updateValue } })
        return res.status(200).json({ 'message': updateResult })
    }
}