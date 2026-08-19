"use strict";

import TextReader from "../libs/rochelle@ltgcgo/textRead.mjs";
import DsvParser from "../libs/rochelle@ltgcgo/dsvParse.mjs";

const enumerateFoldersWith = async function (path, method) {
	for await (const folderEntry of Deno.readDir(path)) {
		if (!folderEntry.isDirectory) continue;
		folderEntry.path = `${path}/${folderEntry.name}`;
		await method(folderEntry);
	};
};
const readFileStreamWith = async function (path, method) {
	let pathEntry;
	try {
		pathEntry = await Deno.stat(path);
	} catch (err) {};
	if (!pathEntry) return;
	if (pathEntry.isFile) {
		try {
			await method((await Deno.open(path)).readable);
		} catch (err) {console.error(err)};
	};
};
const constructList = async function (map, fileStream, parentBuffer, currentPath, filePrefix, tailBuffer) {
	for await (const line of DsvParser.parseObjects(DsvParser.TYPE_TSV | DsvParser.DATA_TEXT, TextReader.line(fileStream))) {
		//console.debug(line);
		//const binaryId = parseInt(line.id, 16);
		//const binaryString = new Uint8Array(parentBuffer.length + 1);
		//binaryString.set(parentBuffer);
		//binaryString[parentBuffer.length] = binaryId;
		//console.debug(line.name, binaryString);
		const binaryString = `${parentBuffer != null ? parentBuffer : ""}${line.id}${tailBuffer != null ? tailBuffer : ""}`;
		const newPath = `${currentPath}${currentPath?.length > 0 ? "." : ""}${line.name}`;
		console.debug(newPath, binaryString);
		//map[newPath] = binaryString.toHex();
		map[newPath] = binaryString;
		await readFileStreamWith(`./${filePrefix}/${newPath.replaceAll(".", "/")}.tsv`, async (childStream) => {
			await constructList(map, childStream, binaryString, newPath, filePrefix);
		});
	};
};

//await enumerateFoldersWith("./mane", console.log);
const fullCcMap = {};
const fullRpnMap = {};
const fullNrpnMap = {};
const fullSysExMap = {};

await constructList(fullCcMap, (await Deno.open("./mane/cc.tsv")).readable, "", "", "./mane/cc");
await constructList(fullRpnMap, (await Deno.open("./mane/rpn.tsv")).readable, "", "", "./mane/rpn");
await constructList(fullNrpnMap, (await Deno.open("./mane/nrpn.tsv")).readable, "", "", "./mane/nrpn");
await constructList(fullSysExMap, (await Deno.open("./mane/syx.tsv")).readable, "", "", "./mane/syx", "de");

//console.debug(fullCcMap);
//console.debug(fullRpnMap);
//console.debug(fullNrpnMap);
//console.debug(fullSysExMap);

await Deno.writeTextFile("./dist/mane.cc.json", JSON.stringify(fullCcMap));
await Deno.writeTextFile("./dist/mane.rpn.json", JSON.stringify(fullRpnMap));
await Deno.writeTextFile("./dist/mane.nrpn.json", JSON.stringify(fullNrpnMap));
await Deno.writeTextFile("./dist/mane.syx.json", JSON.stringify(fullSysExMap));