import User from "./user";

export default class Transaction {
    transactionID: number;
    dateTime: Date;
    note: string;
    payer: User;
    amount: Money;
    location:string;
    participants: TransactionParticipant[];
    createdBy: User;

    constructor(
        transactionID: number,
        dateTime: Date,
        note: string,
        payer: User,
        amount: Money,
        location:string,
        participants: TransactionParticipant[],
        createdBy: User
        ) 
    {
        this.transactionID = transactionID;
        this.dateTime = dateTime;
        this.note = note;
        this.amount = amount;
        this.payer = payer;
        this.location = location;
        this.participants = participants;
        this.createdBy  = createdBy;
    }

    createReminder() {
    }

    toFirebaseObject()
    {
        let participants: any[]  = []
        this.participants.forEach((u)=>{participants.push(u.toFirebaseObject())});
        return {
            "transactionID": this.transactionID,
            "dateTime": this.dateTime.toString(),
            "note": this.note,
            "payer": this.payer.toFirebaseObject(),
            "amount": this.amount.toFirebaseObject(),
            "location": this.location,
            "participants": participants,
            "createdBy": this.createdBy.toFirebaseObject()
        }
    }

    static fromFirebaseObject(data: any): Transaction
    {
        const transactionID: number = data["transactionID"] as number;
        const dateTime: Date = new Date(Date.parse(data["dateTime"]));
        const note: string = data["note"];
        const payer: User = User.fromFirebaseObject(data["payer"]);;
        const amount: Money = Money.fromFirebaseObject(data['amount']);
        const location:string = data["location"];
        const participants: TransactionParticipant[] = [];
        const createdBy: User = User.fromFirebaseObject(data["createdBy"]);

        let participantsObj: any[] = data["participants"];
        participantsObj.forEach((p)=>{
            participants.push(TransactionParticipant.fromFirebaseObject(p));
        })

        const transaction:Transaction = new Transaction(
                                                transactionID,
                                                dateTime,
                                                note,
                                                payer,
                                                amount,
                                                location,
                                                participants,
                                                createdBy
                                            );
        return transaction;
    }
}

class TransactionParticipant
{
    user: User;
    amount: Money;

    constructor(user:User, amount:Money)
    {
        this.user = user;
        this.amount = amount;
    }

    toFirebaseObject()
    {
        return {
            "user": this.user.toFirebaseObject(),
            "amount": this.amount.toFirebaseObject()
        }
    }

    static fromFirebaseObject(data:any):TransactionParticipant
    {
        return new TransactionParticipant(User.fromFirebaseObject(data["user"]), Money.fromFirebaseObject(data["amount"]));

    }
    
}

class Money {
    amount: number;

    constructor(amount:number)
    {
        this.amount = amount;
    }

    toFirebaseObject()
    {
        return {
            "amount": this.amount
        }
    }

    static fromFirebaseObject(data:any): Money
    {
        return new Money(data['amount'])
    }
}

export {TransactionParticipant, Money}