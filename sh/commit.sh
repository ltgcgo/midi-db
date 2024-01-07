#!/bin/bash
#shx Standard Utility
# Push to a single remote
git stage -A && git commit && git push $1
# Push to all remotes
#git stage -A && git commit && git remote | xargs -L1 git push
exit
