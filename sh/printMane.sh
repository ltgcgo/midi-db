#!/bin/bash
printf "\$ tree -ifl ./mane\n"
tree -ifl ./mane | while IFS= read -r line; do
	if [[ "$line" != *" -> "* ]]; then
		echo $line
	fi
done
printf "\n"
find ./mane -type f | while IFS= read -r file; do
	printf "\$ cat $file\n\n"
	cat "$file"
	printf "\n\n"
done