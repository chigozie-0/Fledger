/**
 * A user in a server
 */
class User 
{
    name: string;
    id: string;

    constructor(name:string, id:string) {
        this.name = name;
        this.id = id;
    }
    
    toFirebaseObject()
    {
        return {
            "name": this.name,
            "id": this.id,
            "serverIDs": []
        }
    }

    static fromFirebaseObject(data:any):User
    {
        return new User(data["name"], data["id"]);
    }
}

/**
 * The local user (logged in User)
 */
class LocalUser extends User
{
    private static instance: LocalUser;

    private serverIDs: Array<String>;

    static getInstance(): LocalUser{
        if (!this.instance)
        {
            throw Error("User is not initialized. Make sure you called init()")
        }
        return this.instance;
    }

    static init(name:string, id:string)
    {
        this.instance = new LocalUser(name, id);
    }

    private constructor(name:string, id:string) {
        super(name, id);
        this.serverIDs = [];
    }

    addServerID(id: string) {
        this.serverIDs.push(id);
    }
}



export default User;
export {LocalUser};