import { firebase, FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';
import Channel from "./channel";
import Server from "./server";
import User from "./user";
import Transaction from "./transaction";


/**
 * This class handles all communications to and from our firebase project
 */
class FirebaseServer
{
    private static instance: FirebaseServer;
    private  usersCollection: FirebaseFirestoreTypes.CollectionReference;
    private  serversCollection: FirebaseFirestoreTypes.CollectionReference;

    constructor() {
        // FirebaseServer.usersCollection = firestore().collection('Users');
        // FirebaseServer.usersCollection = firestore().collection('Servers');
        this.usersCollection = firebase.firestore().collection('Users');
        this.serversCollection = firebase.firestore().collection('Servers');
        
    }
    static getInstance(): FirebaseServer {
        if(!this.instance) {
            this.instance = new FirebaseServer();
        }
        return this.instance;

    }

    async addUser(user: User) {
        await this.usersCollection.doc(user.id).set(user.toFirebaseObject())
    }

    async addUserToServer(serverID: string, user: User) {
        let snapshot = await this.serversCollection.doc(serverID).get();
        let serverObj: any = snapshot.data() as Object;
        let users: any[]  = serverObj["users"];
        console.log(user)
        users.push(user.toFirebaseObject());
        this.serversCollection.doc(serverID).update({"users": users});
        //this.addServerIdToUser(user.id, serverID); TODO: This currently has no use
    }


    async addServerIdToUser(userID:string, serverID:string)
    {
        let servers: any[];
        let snapshot = await this.usersCollection.doc(userID).get();
        let userObj: any = snapshot.data() as Object;
        servers = userObj["serverIDs"];
        servers.push(serverID);
        await this.usersCollection.doc(userID).update({"serverIDs": servers});
    }

    async addServer(server: Server) {
        await this.serversCollection.doc(server.serverID).set(server.toFirebaseObject())
    }

    async addChannelToServer(serverID: string, channel: Channel) {
        // let server = this.serversCollection.doc(serverID).data();
        // let channels: any[] = server["channels"];
        // channels.push(channel.toFirebaseObject());
        // this.serversCollection.doc(serverID).update({"channels": channels});

        // await this.serversCollection.doc(serverID).get().then((snapshot)=> {
        //     let serverObj: any = snapshot.data() as Object;
        //     let channels: any[]  = serverObj["channels"];
        //     channels.push(channel.toFirebaseObject());
        //     this.serversCollection.doc(serverID).update({"channels": channels});
        // });

        let path: string = serverID + "/channels/" + channel.name;
        let channelDoc = await this.serversCollection.doc(path).set(channel.toFirebaseObject());
        // await channelDoc.update(channel.toFirebaseObject());

    }


    async createUserAccount(user:User, password:string): Promise<User|null> {
        try {
            await auth().createUserWithEmailAndPassword(user.id + "@fledger.com", password);
        } catch (error:any) {
            if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            }
            //console.error(error);

            return null;
        }
        return user;
    }


    async signInUserAccount(user:User, password:string): Promise<User|null> {
        let userRes:User|null = null; 

        try {
            await auth().signInWithEmailAndPassword(user.id + "@fledger.com", password);
            console.log('User account signed in!');
            const userData = await this.usersCollection.doc(user.id).get();
            userRes =  User.fromFirebaseObject(userData.data());
            console.log("Local user: ", userRes.toFirebaseObject());
        } catch (error) {
            console.error(error);
            userRes = null;
        }
        
        return userRes;
    }


    async getServersForUser(user: User): Promise<Server[]>
    {
        let userServers:Server[] = [];
        await this.serversCollection.doc().get().then((snapshot)=>{
            let serversObj: any[] = snapshot.data() as Object[];
            serversObj.forEach((server) => {console.log(server)})
        });

        return userServers;
    }


    async getAllServersWithUser(user: User): Promise<Server[]>
    {
        // let userServers: Server[] = [];
        // let tempUserServers: Server[] = [];
        // let serversSnapshot = await this.serversCollection.where("users", "array-contains", user.toFirebaseObject()).get()
        // let serverObj: any = serversSnapshot.docs.forEach((snapshot) => {

        //     let data: any = snapshot.data() as Object;
        //     let usersInServer: User[] = [];
        //     let server: Server = new Server(data["serverID"], data["serverName"], data["serverType"]);
        //     let usersObj: any[] = data["users"];
        //     //let channelsObj: any[] = data["channels"];
        //     usersObj.forEach((u) => {
        //         let user:User = new User(u["name"], u["id"]);
        //         usersInServer.push(user);
        //     })
        //     // channelsObj.forEach((c) => {

        //     //     //TODO: Add transaction information

        //     //     let channel:Channel = new Channel(c["name"]);
        //     //     channels.push(channel);
        //     // })

        //     // server.channels = channels;
        //     server.users = usersInServer;
        //     tempUserServers.push(server);

        // });

        // for (let index = 0; index < tempUserServers.length; index++) {
        //     const server = tempUserServers[index];
        //     let channelDocSnapshot = await this.serversCollection.doc(server.serverID).collection("channels").get();
        //     let channels: Channel[] = [];
        //     channelDocSnapshot.docs.forEach((s) => {
        //         let data: any = s.data() as Object;
        //         // console.log(data)
        //         let channel:Channel = new Channel(data["name"]);
        //         channels.push(channel);
        //     });
        //     server.channels = channels;
        //     userServers.push(server);
        //     console.log(server.toFirebaseObject())
        // }

        // console.log(userServers[0].channels[0].name)
        // return userServers;

        let matchedServers: Server[] = [];
        // const queryUser = new User(" ", user.id); // For backwards compatibility with previous servers
        let snapshot = await this.serversCollection
        .where("users", "array-contains", user.toFirebaseObject())
        .get()
        const docs = snapshot.docs;
        for (let index = 0; index < docs.length; index++) {
            const doc = docs[index];
            let data: any = doc.data() as Object;
            let server: Server = await this.getServer(data["serverID"]);
            matchedServers.push(server);
        }
        return matchedServers;
    }

    async getServer(serverID:string): Promise<Server>
    {
        let serverSnapshot = await this.serversCollection.doc(serverID).get();
        let data: any = serverSnapshot.data() as Object;
        let usersInServer: User[] = [];
        let server: Server = new Server(data["serverID"], data["serverName"], data["serverType"]);
        let usersObj: any[] = data["users"];
        //let channelsObj: any[] = data["channels"];
        usersObj.forEach((u) => {
            let user:User = new User(u["name"], u["id"]);
            usersInServer.push(user);
        })
        server.users = usersInServer;
        let channelDocSnapshot = await this.serversCollection.doc(serverID).collection("channels").get();
        let channels: Channel[] = [];
        channelDocSnapshot.docs.forEach((s) => {
            let data: any = s.data() as Object;
            // console.log(data)

            let channel:Channel = new Channel(data["name"]);
            const transactionsData: any[] = data["transactions"];
            transactionsData.forEach((td) => {
                const transaction = Transaction.fromFirebaseObject(td);
                channel.transactions.push(transaction);
            })
            channels.push(channel);
        });
        server.channels = channels;
        return server;
    }

    async getServersByQuery(query: string): Promise<Server[]>
    {
        let matchedServers: Server[] = [];
        let snapshot = await this.serversCollection
        .where('serverName', '>=', query)
        .where('serverName', '<=', query + '\uf8ff')
        .get()
        const docs = snapshot.docs;
        for (let index = 0; index < docs.length; index++) {
            const doc = docs[index];
            let data: any = doc.data() as Object;
            let server: Server = await this.getServer(data["serverID"]);
            matchedServers.push(server);
        }
        return matchedServers;
    }


    async getUserByQuery(query: string): Promise<User|null>
    {
        let snapshot = await this.usersCollection
        .doc(query)
        .get();

        if(snapshot == null) return null;

        const data = snapshot.data();
        
        return User.fromFirebaseObject(data);
    }

    async subscribeToServerUpdates(server: Server, handler:Function)
    {
        let updatedServer = await this.getServer(server.serverID);
        handler(updatedServer);
    }

    async addTransaction(server: Server, channelIndex: number,  transaction: Transaction): Promise<Channel> {
        // let path: string = server.serverID + "/channels/" ; //+ server.channels[channelIndex].name;
        let channelDoc = await this.serversCollection.doc(server.serverID).collection("channels").doc(server.channels[channelIndex].name);

        // console.log(channelDoc.data());
        if(channelDoc != undefined)
        {
            await channelDoc.update(
                {
                    transactions: firebase.firestore.FieldValue.arrayUnion(
                        transaction.toFirebaseObject()
                    )
                });
        }
        else 
        {
            console.log("Backend->addTransaction: serverDoc undefined");  
        }

        let newChannelData = (await channelDoc.get()).data();

        console.log("Backend: Transaction added");
        return Channel.fromFirebaseObject(newChannelData);
    }

}

// const firebaseServer: FirebaseServer = FirebaseServer.getInstance();

export default FirebaseServer;