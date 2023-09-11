#!/bin/bash
# Sorter
deno run --allow-all utils/mapOrder.js map/xg.10.tsv bank/xg.tsv bank/plg-100sg.tsv > map/xg.10.tsv.sorted
# Mover
cd map
ls -1 *.sorted | while IFS= read -r file; do
	mv -v "${file}" "${file/.sorted/}"
done
exit