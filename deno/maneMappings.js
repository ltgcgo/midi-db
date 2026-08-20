"use strict";

import TextReader from "../libs/rochelle@ltgcgo/textRead.mjs";
import DsvParser from "../libs/rochelle@ltgcgo/dsvParse.mjs";

const rootPath = Deno.cwd();
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
const readPathIfSymLink = async function (path) {
	try {
		if (!(await Deno.lstat(path)).isSymlink) return;
		return (await Deno.readLink(path)).replace(rootPath, ".");
	} catch (err) {};
};
const tokenMap = new Map([["!", "CS"]]);
const emitMapTsv = function (map, firstLine) {
	let file = firstLine;
	for (const [key, value] of map) {
		let newKey = key;
		let newValue = value;
		if ("0123456789abcdef".indexOf(value[0]) >= 0) {
			for (const [token, tailing] of tokenMap) {
				if (key.indexOf(token) < 0) {
					continue;
				};
				newKey = key.replace(token, "");
				newValue += tailing;
			};
		};
		file += `\n${newKey}\t${newValue}`;
	};
	return file;
};
const constructList = async function (invokeDepth, map, childList, fileStream, parentBuffer, currentPath, filePrefix, carryOver = "") {
	const currentDepth = invokeDepth + 1;
	if (currentDepth >= maxDepth) return;
	const symlinkCache = new Map();
	console.debug(`Building for "${filePrefix}:${currentPath != null ? currentPath : (root)}"...`);
	for await (const line of DsvParser.parseObjects(DsvParser.TYPE_TSV | DsvParser.DATA_TEXT, TextReader.line(fileStream))) {
		//console.debug(line);
		//const binaryId = parseInt(line.id, 16);
		//const binaryString = new Uint8Array(parentBuffer.length + 1);
		//binaryString.set(parentBuffer);
		//binaryString[parentBuffer.length] = binaryId;
		//console.debug(line.name, binaryString);
		let tailBuffer, newCarryOver = carryOver, treeName = line.name;
		switch (line.name[0]) {
			case "@": {
				tailBuffer = "DI"; // Device ID.
				break;
			};
			case "!": {
				newCarryOver += ""; // Checksum.
				treeName = treeName.substring(1);
				break;
			};
			case "^": {
				tailBuffer = "CR"; // Checksum region start/begin.
				break;
			};
		};
		if (tokenMap.has(line.name[line.name.length - 1])) {
			newCarryOver += line.name[line.name.length - 1];
			treeName = treeName.substring(0, line.name.length - 1);
		};
		if (tailBuffer?.length > 0) {
			treeName = treeName.substring(1);
			line.name = line.name.substring(1);
		};
		//(carryOver?.length > 0 || newCarryOver?.length > 0) && console.debug(treeName, carryOver, newCarryOver);
		const newPath = `${currentPath}${currentPath?.length > 0 ? "." : ""}${line.name}`;
		const addedElement = `${line.id}${tailBuffer != null ? tailBuffer : ""}`;
		const binaryString = `${parentBuffer != null ? parentBuffer : ""}${addedElement}`;
		//console.debug(newPath, binaryString);
		//map[newPath] = binaryString.toHex();
		//map[newPath] = binaryString;
		const ownChildrenList = [], leafNode = {"k": treeName, "v": addedElement};
		childList.push(leafNode);
		const nullableLinkTargetPath = await readPathIfSymLink(`./${filePrefix}/${newPath.replaceAll(".", "/")}.tsv`);
		let pointerCurrentLevel;
		if (nullableLinkTargetPath?.length > 0) {
			pointerCurrentLevel = symlinkCache.get(nullableLinkTargetPath);
			if (pointerCurrentLevel?.length > 0) {
				console.debug(`Pointed duplicate "${treeName}" to member "${pointerCurrentLevel}" in the current level.`);
				leafNode.p = pointerCurrentLevel;
			} else {
				symlinkCache.set(nullableLinkTargetPath, treeName);
			};
		};
		if (pointerCurrentLevel?.length > 0) {
			map.set(newPath, `@${currentPath}${currentPath?.length > 0 ? "." : ""}${pointerCurrentLevel}:${binaryString}`);
		} else {
			map.set(newPath, binaryString);
			await readFileStreamWith(
				`./${filePrefix}/${newPath.replaceAll(".", "/")}.tsv`,
				async (childStream) => {
					await constructList(currentDepth, map, ownChildrenList, childStream, binaryString, newPath, filePrefix, newCarryOver);
				}
			);
			if (ownChildrenList.length > 0) {
				leafNode.c = ownChildrenList;
			} else if (carryOver.length > 0) {
				//console.log(carryOver);
				for (const token of carryOver) {
					const addition = tokenMap.get(token);
					if (addition?.length > 0) {
						leafNode.v += addition;
					};
				};
			};
		};
	};
	return map;
};

//await enumerateFoldersWith("./mane", console.log);




;

//console.debug(fullCcMap);
//console.debug(fullRpnMap);
//console.debug(fullNrpnMap);
//console.debug(fullSysExMap);

const childTreeCc = [];
const childTreeRpn = [];
const childTreeNrpn = [];
const childTreeSysEx = [];

await Deno.writeTextFile(
	"./dist/mane.cc.tsv",
	emitMapTsv(
		await constructList(
			0,
			new Map(),
			childTreeCc,
			(await Deno.open("./mane/cc.tsv")).readable,
			"",
			"",
			"./mane/cc"
		),
		firstLines
	)
);
await Deno.writeTextFile("./dist/mane.cc.tree.json", JSON.stringify(childTreeCc));
await Deno.writeTextFile(
	"./dist/mane.rpn.tsv",
	emitMapTsv(
		await constructList(
			0,
			new Map(),
			childTreeRpn,
			(await Deno.open("./mane/rpn.tsv")).readable,
			"",
			"",
			"./mane/rpn"
		),
		firstLines
	)
);
await Deno.writeTextFile("./dist/mane.rpn.tree.json", JSON.stringify(childTreeRpn));
await Deno.writeTextFile(
	"./dist/mane.nrpn.tsv",
	emitMapTsv(
		await constructList(
			0,
			new Map(),
			childTreeNrpn,
			(await Deno.open("./mane/nrpn.tsv")).readable,
			"",
			"",
			"./mane/nrpn"
		),
		firstLines
	)
);
await Deno.writeTextFile("./dist/mane.nrpn.tree.json", JSON.stringify(childTreeNrpn));
await Deno.writeTextFile(
	"./dist/mane.syx.tsv",
	emitMapTsv(
		await constructList(
			0,
			new Map(),
			childTreeSysEx,
			(await Deno.open("./mane/syx.tsv")).readable,
			"",
			"",
			"./mane/syx"
		),
		firstLines
	)
);
await Deno.writeTextFile("./dist/mane.syx.tree.json", JSON.stringify(childTreeSysEx));
