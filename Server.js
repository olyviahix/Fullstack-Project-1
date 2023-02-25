const http = require ('http');
const express = require ('express');
const app = express();
app.use(express.json());
const {Sequelize, DataTypes} = require ('sequelize');
const cors=require('cors');

const sequelizeConnection = new
Sequelize('postgres://postgres:Livins11223344!!@localhost:5432/olyviahix', {
    define:{
        timestamps:false,
        schema: 'we_ride'
    }
})


const UserTime = sequelizeConnection.define("UserTimes",{

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
    },

    lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
    },

    trackId:{
        type: DataTypes.INTEGER,
        field: 'track_id',
    },

    lapTime:{
        type: DataTypes.TIME,
        field: 'lap_time'
    }
})
    

const Track = sequelizeConnection.define("Tracks",{
    
    trackId:{
        type: DataTypes.INTEGER,
        field: 'track_id',
        autoIncrement: true,
        primaryKey: true
    },

    trackName: {
        type: DataTypes.STRING,
        field: 'track_name'
    }
})

Track.belongsToMany(UserTime, {
    through: 'UserTime',
    foreignKey: 'trackId' 

})

app.use (cors());

//write get, post, put, delete functions below

app.get('/tracks',(req,res)=>{
    Track.findAll().then(tracks=>{
        let trackList = JSON.stringify(tracks);
        res.setHeader('Content-type','application/json');
        res.send(trackList);
        res.status(200);
    })
})

// how to get all track times for specific track?
app.get('/UserTimes',(req,res)=>{
    UserTime.findAll().then(userTime=>{
        let UserTimes = JSON.stringify(userTime);
        res.setHeader('Content-type','application/json');
        res.send(UserTimes);
        res.status(200);
    })
})

app.post('/tracks',(req,res)=>{
    const trackData = req.body;
    Track.create({
        trackId:trackData.trackId,trackName:trackData.trackName
    })
    res.status(201).send("Track created successfully");
})

app.post('/UserTimes',(req,res)=>{
    const userData = req.body;
    UserTime.create({
        Id:userData.Id,firstName:userData.firstName,lastName:userData.lastName,trackId:userData.trackId,lapTime:userData.lapTime
    })
    res.status(201).send("Time posted successfully");
})


// app.put('/user/:password,userId',(req,res)=>{
//     const password = req.params['password'];
//     const userId = req.params['userId'];
//     User.findByPk(userId).then(user=>{
//         if(user){
//             // const userData = req.body;
//             user.update({
//                 userPassword:password, 
//             },{
//                 where:{userId:userId}
//             })
//             res.status(200).send("Password updated successfully");            
//         }else{
//             res.status(404).send("User not found");            
//         }
//     })
//     }
// )

// app.delete('/user:userId',(req,res)=>{
//     const user = req.params['iserId'];
//     user.findByPk(userId).then((user)=>{
//         if(user){
//             user.destroy({
//                 where:{userId:userId}
//             })
//             res.status(200).send("User deleted successfully");
//         }else{
//             res.status(404).send("User not found");
//         }
//     })
// })




sequelizeConnection.authenticate().then(()=>{
    console.log("Database connection successful")
}).catch((error)=>{
    console.log(error);
})

sequelizeConnection.sync().then(()=>{
    console.log("Tables created successfully")
})

const server = http.createServer(app);
server.listen(3000, '127.0.0.1', ()=>{
    console.log('Server started');
})