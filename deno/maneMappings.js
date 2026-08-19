"use strict";

import TextReader from "../libs/rochelle@ltgcgo/textRead.mjs";
import DsvParser from "../libs/rochelle@ltgcgo/dsvParse.mjs";

const firstLines = "path\tbinary";
const maxDepth = 16;

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
const emitMapTsv = function (map, firstLine) {
	let file = firstLine;
	for (const [key, value] of map) {
		file += `\n${key}\t${value}`;
	};
	return file;
};
const constructList = async function (invokeDepth, map, fileStream, parentBuffer, currentPath, filePrefix, tailBuffer) {
	const currentDepth = invokeDepth + 1;
	if (currentDepth >= maxDepth) return;
	console.debug(`Building for "${filePrefix}:${currentPath != null ? currentPath : (root)}"...`);
	for await (const line of DsvParser.parseObjects(DsvParser.TYPE_TSV | DsvParser.DATA_TEXT, TextReader.line(fileStream))) {
		//console.debug(line);
		//const binaryId = parseInt(line.id, 16);
		//const binaryString = new Uint8Array(parentBuffer.length + 1);
		//binaryString.set(parentBuffer);
		//binaryString[parentBuffer.length] = binaryId;
		//console.debug(line.name, binaryString);
		const appendNow = line.name.indexOf("@") == 0;
		if (appendNow) {
			line.name = line.name.substring(1);
		};
		const newPath = `${currentPath}${currentPath?.length > 0 ? "." : ""}${line.name}`;
		const binaryString = `${parentBuffer != null ? parentBuffer : ""}${line.id}${appendNow && tailBuffer != null ? tailBuffer : ""}`;
		//console.debug(newPath, binaryString);
		//map[newPath] = binaryString.toHex();
		//map[newPath] = binaryString;
		map.set(newPath, binaryString);
		await readFileStreamWith(`./${filePrefix}/${newPath.replaceAll(".", "/")}.tsv`, async (childStream) => {
			await constructList(currentDepth, map, childStream, binaryString, newPath, filePrefix);
		});
	};
	return map;
};

//await enumerateFoldersWith("./mane", console.log);




;

//console.debug(fullCcMap);
//console.debug(fullRpnMap);
//console.debug(fullNrpnMap);
//console.debug(fullSysExMap);

await Deno.writeTextFile(
	"./dist/mane.cc.tsv",
	emitMapTsv(
		await constructList(
			0,
			new Map(),
			(await Deno.open("./mane/cc.tsv")).readable,
			"",
			"",
			"./mane/cc"
		),
		firstLines
	)
);
await Deno.writeTextFile(
	"./dist/mane.rpn.tsv",
	emitMapTsv(
		await constructList(
			0,
			new Map(),
			(await Deno.open("./mane/rpn.tsv")).readable,
			"",
			"",
			"./mane/rpn"
		),
		firstLines
	)
);
await Deno.writeTextFile(
	"./dist/mane.nrpn.tsv",
	emitMapTsv(
		await constructList(
			0,
			new Map(),
			(await Deno.open("./mane/nrpn.tsv")).readable,
			"",
			"",
			"./mane/nrpn"
		),
		firstLines
	)
);
await Deno.writeTextFile(
	"./dist/mane.syx.tsv",
	emitMapTsv(
		await constructList(
			0,
			new Map(),
			(await Deno.open("./mane/syx.tsv")).readable,
			"",
			"",
			"./mane/syx",
			"DI"
		),
		firstLines
	)
);