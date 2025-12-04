import { connect } from './connect.js';

const db = await connect();

// Brug din jam code her
const jamCode = '999111'; // ← SKIFT til din rigtige code

// Find jam id
const jamResult = await db.query('SELECT id FROM jams WHERE jam_code = $1', [jamCode]);

if (jamResult.rows.length === 0) {
    console.log('Jam ikke fundet!');
    process.exit(1);
}

const jamId = jamResult.rows[0].id;

// Tilføj 12 test deltagere
const names = [
    'Anna', 'Benjamin', 'Caroline', 'David',
    'Emma', 'Frederik', 'Gitte', 'Henrik',
    'Ida', 'Jakob', 'Katrine', 'Lars'
];

for (const name of names) {
    await db.query(
        'INSERT INTO participants (jam_id, name) VALUES ($1, $2)',
        [jamId, name]
    );
    console.log(`Tilføjet: ${name}`);
}

await db.end();
console.log('Alle 12 deltagere tilføjet!');