/* Scelle le contenu en clair dans un coffre chiffré.
   Usage : node sceller.mjs "<phrase de passe>"
   Lit  ./contenu.html  →  écrit ./page.enc
   Le clair n'est jamais publié : contenu.html est ignoré par git. */

import { readFile, writeFile } from 'node:fs/promises';
import { webcrypto as crypto } from 'node:crypto';

const ITERATIONS = 600000;
const PALIER = 4096; // le clair est complété pour que la taille ne trahisse rien

const phrase = process.argv[2];
if (!phrase) {
  console.error('Usage : node sceller.mjs "<phrase de passe>"');
  process.exit(1);
}

const b64 = (u8) => Buffer.from(u8).toString('base64');

const clair = await readFile(new URL('./contenu.html', import.meta.url), 'utf8');
const complete = clair.padEnd(Math.ceil(clair.length / PALIER) * PALIER, ' ');

const sel = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));

const matiere = await crypto.subtle.importKey(
  'raw', new TextEncoder().encode(phrase), 'PBKDF2', false, ['deriveKey']);
const cle = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt: sel, iterations: ITERATIONS, hash: 'SHA-256' },
  matiere, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);

const chiffre = await crypto.subtle.encrypt(
  { name: 'AES-GCM', iv }, cle, new TextEncoder().encode(complete));

await writeFile(new URL('./page.enc', import.meta.url),
  JSON.stringify({ sel: b64(sel), iv: b64(iv), it: ITERATIONS, d: b64(new Uint8Array(chiffre)) }));

console.log(`page.enc scellé · ${clair.length} caractères → ${complete.length} complétés`);
