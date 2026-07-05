#!/bin/bash
if [ "$1" == "" ]; then
	echo "Must provide a config."
	ls -1 conf/*.ins.json 2>/dev/null | while IFS= read -r file; do
		step1="${file/conf\//}"
		echo "- ${step1/\.ins\.json/}"
	done
elif [ -f "conf/$1.ins.json" ]; then
	deno run --allow-read --allow-write --allow-net deno/insBuild.js $1
else
	echo "\"$1\" doesn't exist."
fi
exit