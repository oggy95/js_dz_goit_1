import fs from "fs/promises";
import * as url from 'url';
import {nanoid} from "nanoid";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const filePath = `${__dirname}\\db\\contacts.json`;

/**
 * List contacts from base
 * @return {Array} array of contacts
 */
async function listContacts() {
    const result = await fs.readFile(filePath);
    return JSON.parse(result);
}

/**
 * Get contact by ID
 * @param {Number} contactId Contact ID
 * @return {Object|null} Contact
 */
async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result ? result : null;
}

/**
 * Remove contact by ID
 * @param {Number} contactId Contact ID
 * @return {Object|null} Contact
 */
async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    const [result] = contacts.splice(idx, 1);
    await updateContacts(contacts);
    return result;
}

/**
 * Update database
 * @param {Array} contacts new array to update
 */
async function updateContacts(contacts) {
    await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
}

/**
 * Insert new contact into database
 * @param {string} name Name of contact
 * @param {string} email Email of contact
 * @param {string} phone Phone number of contact
 */
async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const insertObject = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(insertObject);
    await updateContacts(contacts);
    return contacts;
}

export default {
    getContactById,
    addContact,
    removeContact,
    listContacts
}