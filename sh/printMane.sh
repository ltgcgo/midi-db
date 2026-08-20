#!/bin/bash
cd ./mane
printf "user@dev:~/mane \$ tree -ifl .\n"
tree -ifl . | while IFS= read -r line; do
	if [[ "$line" != *" -> "* ]]; then
		if [[ "$line" == *".tsv" ]]; then
			echo $line
		fi
	fi
done
printf "\n"
find . -type f | while IFS= read -r file; do
	printf "\$ cat $file\n\n"
	cat "$file"
	printf "\n\n"
done