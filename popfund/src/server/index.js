const express = require('express');
const os = require('os');

const {MongoClient} = require('mongodb');
const mongo_uri = 'mongodb+srv://genuser:popfund@popfund-cluster-jxrtb.mongodb.net/test?retryWrites=true&w=majority';

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Current Databases:");
    databasesList.databases.forEach(db => console.log(` ~ ${db.name}`));
}

// remove this when done testing
async function connectDB(){
    const mongo_uri = 'mongodb+srv://genuser:popfund@popfund-cluster-jxrtb.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(mongo_uri);
    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

//Haversine formula: SHOULD TEST MORE
function euclidianDistance(lat1, lon1, lat2, lon2) {
    lat1 = parseFloat(lat1);
    lon1 = parseFloat(lon1);
    lat2 = parseFloat(lat2);
    lon2 = parseFloat(lon2);
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
        const earthRD = 6371000;
        const oPhi = lat1 * Math.PI/180;
        const tPhi = lat2 * Math.PI/180;
        const dlat = ((lat2-lat1)* Math.PI/180);
        const dlam = ((lon2-lon1)* Math.PI/180);
        const a = Math.sin(dlat/2) * Math.sin(dlat/2) + Math.cos(oPhi) * Math.cos(tPhi) * Math.sin(dlam/2) * Math.sin(dlam/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return (c * earthRD/1609);
	}
}

connectDB().catch(console.error);
const app = express();

app.use(express.static('dist'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// List of APIS
app.get('/', (req, res) => res.send('GET request to the homepage'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

//api/getBusinesses?lat=333&long=444&distance=10
app.get('/api/getBusinesses', async (req, res) => {
    const lat = req.query.lat;
    const long = req.query.long;
    const distance = req.query.distance;
    console.log(`lat: ${lat}`);
    console.log(`long: ${long}`);
    const client = new MongoClient(mongo_uri);
    try {
        await client.connect();
        currentDB = client.db('popfund')
        let businessObjects = []
        listofBusinesses = currentDB.collection('businesses').find({}, async (err, data) => {
            await data.forEach(doc => {
                const lat2 = doc.lat;
                const long2 = doc.long;
                if (euclidianDistance(lat, long, lat2, long2) < (distance)){
                    businessObjects.push(doc);
                }
            });
            //made asynchronous
            console.log(businessObjects);
            res.send(businessObjects);
        })

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

});


//businessPage?id=20380
app.get('/api/getBusinessPage', async (req, res) => {
    const reqID = req.query.id;
    const client = new MongoClient(mongo_uri);
    var ObjectId = require('mongodb').ObjectID;
    try {
        await client.connect();
        currentDB = client.db('popfund')
        collection = currentDB.collection('businesses')
        oid = new ObjectId(reqID.toString())
        businessObjects = await collection.findOne({ _id : oid });
            //made asynchronous
        // for loop through the items array
        // get by id item
        // build an array of items
        // chnage the current items array to use that instead of the ids
        console.log(businessObjects);
        res.send(businessObjects);
        
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
});

const bcrypt = require('bcrypt');

app.post('/api/login', async (req, res) => {
    console.log('request body');
    console.log(req.body);
    email = req.body.email;
    password = req.body.password;
    const client = new  MongoClient(mongo_uri);
    try {
        await client.connect();
        currentDB = client.db('popfund');
        users = currentDB.collection('users');
        matchingUser = await users.findOne({email: email});
        hashedPassword = matchingUser.password;
        console.log(matchingUser);
        bcrypt.compare(password, hashedPassword).then((result) => {
            console.log(result);
            if (result) {
                // passwords matching
                console.log('sending ok')
                res.status(200);
                return res.send({'_id': matchingUser._id, name: matchingUser.name});
            } else {
                // passwords not matching
                res.status(401);
                return res.send();
            }
        });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    /*
    res.status(500);
    res.send('something terribly wrong has occured.');
    */
})

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
