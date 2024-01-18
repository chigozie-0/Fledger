import Transaction from "./transaction";

class Channel {
    name: string;
    transactions: Transaction[];

    constructor(name: string) {
        this.name = name;
        this.transactions = [];
    }

    toFirebaseObject()
    {
        let transacs: any[]  = []
        this.transactions.forEach((t)=>{transacs.push(t.toFirebaseObject())});
        return {"name": this.name, "transactions": transacs}
    }

    static fromFirebaseObject(data:any): Channel
    {
        let name  = data["name"];
        let transactionData: any[] = data["transactions"];
        const transactions: Transaction[] = [];

        transactionData.forEach((tD) => {transactions.push(Transaction.fromFirebaseObject(tD))})

        const newChannel:Channel = new Channel(name)
        newChannel.transactions = transactions;

        return newChannel;
    }
}


export default Channel;