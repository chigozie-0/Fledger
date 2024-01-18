import ShortUniqueId from "short-unique-id";
import Channel from "./channel";
import FirebaseServer from "./firebase_server";
import Server from "./server";
import User, { LocalUser } from "./user"
import Transaction from "./transaction";


// let localUser: LocalUser;
// let servers: Server[] = [];


export default class AppData
{
    static servers: Server[] = [];
    static localUser: LocalUser;
    static currentServer: Server|null = null;
    static appStateCode: number = 0.000; // Used for re-rendering. Will remove after fix
    //TODO: remove. issue has been fixed with useContext
}

async function authenticateUserLogin(username: string, password: string): Promise<boolean>
{
    let firebaseServer: FirebaseServer = FirebaseServer.getInstance();
    let res = await firebaseServer.signInUserAccount(new User(" ", username), password);

    if(res == null) return false;

    // firebaseServer.addUser(res);
    LocalUser.init(res.name, res.id);
    AppData.localUser = LocalUser.getInstance();
    console.log(" User authenticated ")
    return true
}


async function authenticateUserSignUp(name:string, username: string, password: string): Promise<boolean>
{
    let firebaseServer: FirebaseServer = FirebaseServer.getInstance();
    let res = await firebaseServer.createUserAccount(new User(name, username), password);

    if(res == null) return false;

    firebaseServer.addUser(res);
    LocalUser.init(res.name, res.id);
    AppData.localUser = LocalUser.getInstance();
    console.log(" User authenticated ");
    return true;
}

function populateTestData(): boolean{
    let firebaseServer: FirebaseServer = FirebaseServer.getInstance();

  let user0 = new User("James", "james007");
  let user1 = new User("John", "john009");
  firebaseServer.addUser(user0);
  firebaseServer.addUser(user1);
  firebaseServer.addUser(AppData.localUser)

  let newServer:Server = new Server("testserver01", "Geek squad");
  firebaseServer.addServer(newServer);
  firebaseServer.addUserToServer(newServer.serverID, user0);
  firebaseServer.addUserToServer(newServer.serverID, user1);
  firebaseServer.addUserToServer(newServer.serverID, AppData.localUser);

  let newServer1:Server = new Server("testserver02", "Geek squad 2");
  firebaseServer.addServer(newServer1);
  firebaseServer.addUserToServer(newServer1.serverID, AppData.localUser);
  firebaseServer.addUserToServer(newServer1.serverID, user0);
  firebaseServer.addUserToServer(newServer1.serverID, user1);
  

  let newChannel: Channel = new Channel("general");
  let newChannel1: Channel = new Channel("food");
  firebaseServer.addChannelToServer(newServer.serverID, newChannel);
  firebaseServer.addChannelToServer(newServer1.serverID, newChannel);
  firebaseServer.addChannelToServer(newServer1.serverID, newChannel1);
  console.log("YAY!!!!");
  console.log(user1.toFirebaseObject());

  return true;
}

async function getServers(localUser: User): Promise<Server[]>
{
    let firebaseServer: FirebaseServer = FirebaseServer.getInstance();
    try {
        // TODO: Make seraches include user name 
        AppData.servers = await firebaseServer.getAllServersWithUser(localUser);
        console.log("Got servers: " + AppData.servers.length);
    } catch (error) {
        console.log("ERROR: " + error);
    }

    return AppData.servers
}

async function createNewServer(name: string, serverType: string) {
    let firebaseServer: FirebaseServer = FirebaseServer.getInstance();

    const uid = new ShortUniqueId({ length: 10 });
    let ID:string  = uid.rnd();

    let newServer:Server = new Server(ID.toLocaleUpperCase(), name, serverType);
    console.log("Server creation initiated")
    await firebaseServer.addServer(newServer);
    console.log("   1. Server created")
    await firebaseServer.addUserToServer(newServer.serverID, AppData.localUser);
    console.log("   2. User added to server")
    let generalChannel: Channel = new Channel("general");
    await firebaseServer.addChannelToServer(newServer.serverID, generalChannel);
    console.log("   3. General channel created")

    AppData.appStateCode = Math.random();
  
    console.log(`Server created. name: ${newServer.serverName}, type: ${newServer.serverType}`)

}


async function createChannelForServer(channelName:string, server: Server) 
{

    let firebaseServer: FirebaseServer = FirebaseServer.getInstance();
    let newChannel: Channel = new Channel(channelName);
    await firebaseServer.addChannelToServer(server.serverID, newChannel);
    
}

async function searchServers(query:string) {
    let firebaseServer: FirebaseServer = FirebaseServer.getInstance();
    let res = firebaseServer.getServersByQuery(query);
    return res;
}

async function searchFirebaseUser(query:string) {
    let firebaseServer: FirebaseServer = FirebaseServer.getInstance();
    let res = await firebaseServer.getUserByQuery(query);
    return res;
}

async function joinServer(server: Server, user: User) {
    let firebaseServer: FirebaseServer = FirebaseServer.getInstance();
    let res = await firebaseServer.addUserToServer(server.serverID, user);
    return res;
}

async function loadSelectedServer(server:Server, updatesHandler:Function) {
    let firebaseServer: FirebaseServer = FirebaseServer.getInstance();
    firebaseServer.subscribeToServerUpdates(server, updatesHandler);
}

async function addTransactionToServer(server: Server, channelIndex: number, transaction: Transaction): Promise<Channel> {
    let firebaseServer: FirebaseServer = FirebaseServer.getInstance();
    let updatedChannel: Channel = await firebaseServer.addTransaction(server, channelIndex, transaction);
    return updatedChannel;
}


// export default servers;
export {authenticateUserLogin, 
    getServers, 
    populateTestData, 
    authenticateUserSignUp, 
    createNewServer,
    searchServers,
    joinServer,
    createChannelForServer,
    loadSelectedServer,
    addTransactionToServer,
    searchFirebaseUser
};