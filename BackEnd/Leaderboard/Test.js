const leaderboardDB = require('./LeaderboardDB');

db = new leaderboardDB();
db.connect().then(() => {
    db.createNewPlayer(100, 'Mark');
});