import Channel from "./channel";
import User from "./user";

class Server {
    serverID: string;
    serverName: string;
    users: User[];
    channels: Channel[];
    serverType: string; // optional

    constructor(serverID: string, serverName:string, serverType:string = "general") {
        this.serverID = serverID;
        this.serverName = serverName;
        this.channels = [];
        this.users = [];
        this.serverType = serverType;
    }

    toFirebaseObject()
    {
        let users: any[]  = []
        let channels: any[]  = []
        this.users.forEach((u)=>{users.push(u.toFirebaseObject())});
        this.channels.forEach((c)=>{channels.push(c.toFirebaseObject())});
        return {
            "serverID": this.serverID,
            "serverName": this.serverName,
            "users": users,
            "channels": channels,
            "serverType": this.serverType
        }
    }

    // static fromFirebaseObject(): Server
    // {

    //     return ;
    // }
}

export default Server;