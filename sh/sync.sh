#!/bin/bash
cat conf/sync.txt | while IFS= read -r file; do
	if [ -f "$file" ]; then
		cp -v "./${file}" "../octavia/data/${file}"
	fi
done