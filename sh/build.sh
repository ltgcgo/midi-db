#!/bin/bash
shx insBuild OctaviaRecommend
shx insBuild OctaviaAlternative
deno run --allow-read --allow-write "./deno/maneMappings.js"
exit