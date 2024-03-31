#!/bin/bash
# Sorter
deno run --allow-all utils/mapOrder.js map/xg.10.tsv bank/xg.tsv bank/plg-150dr.tsv bank/plg-150pf.tsv bank/plg-150vl.tsv bank/plg-100sg.tsv bank/plg-150dx.tsv bank/plg-150an.tsv > map/xg.10.tsv.sorted
deno run --allow-all utils/mapOrder.js map/xg.12.tsv bank/xg.tsv bank/plg-150dr.tsv bank/plg-150pf.tsv bank/plg-150vl.tsv bank/plg-100sg.tsv bank/plg-150dx.tsv bank/plg-150an.tsv > map/xg.12.tsv.sorted
deno run --allow-all utils/mapOrder.js map/xg.24.tsv bank/xg.tsv bank/plg-150dr.tsv bank/plg-150pf.tsv bank/plg-150vl.tsv bank/plg-100sg.tsv bank/plg-150dx.tsv bank/plg-150an.tsv > map/xg.24.tsv.sorted
deno run --allow-all utils/mapOrder.js map/gs.10.tsv bank/gs.tsv > map/gs.10.tsv.sorted
deno run --allow-all utils/mapOrder.js map/gs.12.tsv bank/gs.tsv > map/gs.12.tsv.sorted
deno run --allow-all utils/mapOrder.js map/gs.24.tsv bank/gs.tsv > map/gs.24.tsv.sorted
deno run --allow-all utils/mapOrder.js map/ns5r.10.tsv bank/ns5r.tsv > map/ns5r.10.tsv.sorted
deno run --allow-all utils/mapOrder.js map/ns5r.12.tsv bank/ns5r.tsv > map/ns5r.12.tsv.sorted
deno run --allow-all utils/mapOrder.js map/ns5r.24.tsv bank/ns5r.tsv > map/ns5r.24.tsv.sorted
deno run --allow-all utils/mapOrder.js map/sd.10.tsv bank/sd.tsv > map/sd.10.tsv.sorted
deno run --allow-all utils/mapOrder.js map/sd.12.tsv bank/sd.tsv > map/sd.12.tsv.sorted
deno run --allow-all utils/mapOrder.js map/sd.24.tsv bank/sd.tsv > map/sd.24.tsv.sorted
deno run --allow-all utils/mapOrder.js map/s90es.10.tsv bank/s90es.tsv > map/s90es.10.tsv.sorted
deno run --allow-all utils/mapOrder.js map/s90es.12.tsv bank/s90es.tsv > map/s90es.12.tsv.sorted
deno run --allow-all utils/mapOrder.js map/s90es.24.tsv bank/s90es.tsv > map/s90es.24.tsv.sorted
deno run --allow-all utils/mapOrder.js map/kross.24.tsv bank/kross.tsv > map/kross.24.tsv.sorted
# Mover
cd map
ls -1 *.sorted | while IFS= read -r file; do
	mv -v "${file}" "${file/.sorted/}"
done
exit