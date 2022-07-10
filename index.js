import contacts from "./contacts.js";
import yargs from "yargs";
import {hideBin} from "yargs/helpers";

async function testContactsLib() {
    try {
        const listOfContacts = await contacts.listContacts();
        console.log(listOfContacts);

        const contact = await contacts.getContactById("2");
        console.log("Contact:", contact);

        const new_contacts = await contacts.addContact("Berlard", "berlards@gmail.com", "+401567843");
        console.log("New list", new_contacts);

        const removed_contact = await contacts.removeContact("12");
        console.log("Removed contact", removed_contact);
    } catch (e) {
        console.error("Error spawned. Details:", e.toString());
    }

}

async function invokeAction({action, id, name, email, phone}) {
    try {
        switch (action) {
            case "list":
                console.log(await contacts.listContacts());
                break;

            case "get":
                console.log(await contacts.getContactById(id));
                break;

            case "add":
                console.log(await contacts.addContact(name, email, phone));
                break;

            case "remove":
                console.log(await contacts.removeContact(id));
                break;

            default:
                console.warn("\x1B[31m Unknown action type!");
        }
    } catch (e) {
        console.error("Error spawned. Details:", e.toString());
    }

}

const arr = hideBin(process.argv);
const {argv} = yargs(arr);
invokeAction(argv)