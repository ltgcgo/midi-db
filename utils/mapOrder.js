"use strict";

let utf8Enc = new TextEncoder();

let targetText, orderIndex = 0, orderMap = {};

for (let i = 0; i < Deno.args.length; i ++) {
	let e = Deno.args[i];
	if (i) {
		(await Deno.readTextFile(e)).split("\n").forEach((text, line) => {
			if (line && text?.length) {
				let id = text.split("\t")[3];
				if (!orderMap[id]) {
					orderMap[id] = orderIndex;
					//console.debug(`${id}: ${orderIndex}`);
					orderIndex ++;
				};
			};
		});
		console.error(`Imported ${orderIndex} entries from the order file.`);
	} else {
		targetText = await Deno.readTextFile(e);
	};
};

let targetList = [], targetMap = {};

targetText.split("\n").forEach((text, line) => {
	if (line && text?.length) {
		let [id, name] = text.split("\t");
		targetList.push(id);
		targetMap[id] = name;
	};
});

console.error(`Imported ${targetList.length} entries from the map file.`);

targetList.sort((a, b) => {
	//console.error(`Comparing ${a} (${orderMap[a]}) with ${b} (${orderMap[b]})...`);
	return Math.sign((orderMap[a] || 0) - (orderMap[b] || 0));
});

console.error(`Map sorted against the order.`);

let outText = "ID	Name";
targetList.forEach((e) => {
	outText += `\n${e}\t${targetMap[e]}`;
});

Deno.stdout.write(utf8Enc.encode(outText));