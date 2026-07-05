"use strict";

//import {OctaviaDevice, VoiceBank} from "https://jsr.io/@ltgc/octavia/0.0.10/dist/state.mjs";
//import {RootDisplay} from "https://jsr.io/@ltgc/octavia/0.0.10/dist/basic.mjs";
import {OctaviaDevice, VoiceBank} from "../libs/octavia@ltgcgo/state.mjs";
import {RootDisplay} from "../libs/octavia@ltgcgo/basic.mjs";

const config = JSON.parse(await Deno.readTextFile(`./conf/${Deno.args[0]}.ins.json`));

const dummyDevice = new OctaviaDevice();
const loadedName = new RootDisplay(dummyDevice);
const loadedBank = dummyDevice.baseBank;
loadedBank.strictMode = true;

for (const file of config.banks) {
	await loadedBank.load(await Deno.readTextFile(`./bank/${file}`, false, file));
	//console.debug(loadedBank.get(0, 0, 0, "gm"));
	//console.debug(loadedBank.bankInfo[0][0]);
};
for (const file of config.names) {
	await loadedName.loadMap(await Deno.readTextFile(`./map/${file}`, false, 0, file));
};
/*await new Promise((r) => {
	console.debug(`Waiting!`);
	setTimeout(r, 1000);
});
await new Promise((r) => {
	console.debug(`Waiting!`);
	setTimeout(r, 1000);
});*/

const textEncoder = new TextEncoder();
const fileHandle = await Deno.open(`./dist/${Deno.args[0]}.ins`, {
	"read": true,
	"write": true,
	"truncate": true,
	"create": true
});
const fileWriteHandle = fileHandle.writable.getWriter();
const fileWriteText = async function (text) {
	await fileWriteHandle.write(textEncoder.encode(`${text}`));
	await fileWriteHandle.ready;
};
const writtenSections = new Set();
fileWriteText(`.Patch Names`);
for (const item of config.items) {
	//console.debug(item);
	const [srcMsb, srcLsb, realMsb, realLsb, mode, catName, isLax] = item;
	if (writtenSections.has(catName)) {
		console.info(`Category ${catName} has already been written.`);
		continue;
	} else {
		writtenSections.add(catName);
	};
	//console.log(srcMsb, srcLsb, realMsb, realLsb, mode, catName);
	//const sourceBank = (srcMsb << 8) | (srcLsb & 255);
	fileWriteText(`\n\n[${catName}]`);
	loadedBank.strictMode = true;
	for (let prg = 0; prg < 128; prg ++) {
		/*let voiceObject = loadedBank.bankInfo[prg][sourceBank];
		if (isLax != null && !voiceObject?.name?.length > 0) {
			voiceObject = loadedBank.bankInfo[prg][(srcMsb << 8) | isLax];
		};*/
		loadedBank.strictMode = isLax ? false : true;
		let voiceObject = loadedBank.get(srcMsb, prg, srcLsb, mode ?? "g2");
		if (voiceObject.ending === " " && voiceObject?.name?.length > 0) {
			fileWriteText(`\n${prg}=${loadedName.getMapped(voiceObject?.name)}`);
		};
	};
};
fileWriteText(`\n\n.Instrument Definitions\n\n[Normal Voices]`);
for (const item of config.items) {
	//console.debug(item);
	const [srcMsb, srcLsb, realMsb, realLsb, mode, catName] = item;
	//console.log(srcMsb, srcLsb, realMsb, realLsb, mode, catName);
	const targetBank = (realMsb << 7) | (realLsb & 127);
	fileWriteText(`\nPatch[${targetBank}]=${catName}`);
};
fileWriteText(`\nPatch[*]=1`);
fileWriteText(`\n\n[Drum Kits]`);
for (const item of config.drums) {
	//console.debug(item);
	const [realMsb, realLsb, catName] = item;
	//console.log(srcMsb, srcLsb, realMsb, realLsb, catName);
	const targetBank = (realMsb << 7) | (realLsb & 127);
	fileWriteText(`\nPatch[${targetBank}]=${catName}`);
};
fileWriteText(`\nPatch[*]=${config.drums[0][2]}`);
fileWriteText(`\nDrum[*,*]=1`);
await fileWriteHandle.close();

Deno.exit(0);