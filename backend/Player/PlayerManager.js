const { MongoClient } = require('mongodb');

class PlayerManager {
    // ChatGPT usage: No
    constructor() {
        this.client = new MongoClient('mongodb://localhost:27017');
        this.collection = null;
    }

    // ChatGPT usage: Partial
    async connect() {
        await this.client.connect();
        this.collection = this.client.db('wikipedia-race').collection('user');
        console.log("Successfully connected to the leaderboard database");
    }

    // ChatGPT usage: Yes
    async playerExists(id) {
        const player = await this.collection.findOne({ _id: id });
        return player !== null;
    }

    // ChatGPT usage: Partial
    async getTopPlayers(limit = 10) {
        return await this.collection
            .find()
            .sort({ elo: -1 }) // Assuming you have an 'elo' field in your documents
            .limit(limit)
            .toArray();
    }

    //ChatGPT usage: Partial
    async getPlayerInfo(id) {
        return await this.collection.findOne({ 
            _id: id,
        });
    }

    // ChatGPT usage: Partial
    async createNewPlayer(id, username) {
        this.collection.insertOne({
            _id: id,
            name: username,
            elo: 0,
            gamesWon: 0,
            gamesLost: 0,
            avgGameDuration: null,
            avgGamePathLength: null,
            friends: []
        });
    }

    // ChatGPT usage: Partial
    async updatePlayer(id, elo, gamesWon, gamesLost, avgGameDuration, avgGamePathLength, friends) {
        const updatedProperties = {
            elo,
            gamesWon,
            gamesLost,
            avgGameDuration,
            avgGamePathLength,
            friends
        };

        console.log(id);
        console.log(updatedProperties);
        const result = await this.collection.updateOne(
            { _id: id },
            { $set: updatedProperties } 
        );

        return result && result.modifiedCount === 1;
    }
}

module.exports = PlayerManager;
