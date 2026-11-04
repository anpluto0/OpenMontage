#!/usr/bin/env bash
# Переключить язык композиции: ./use_lang.sh kz | ru  (копирует content_<lang>.js → content.js и ставит длительность)
set -e; cd "$(dirname "$0")"; L=${1:?kz|ru}
cp "content_$L.js" content.js
END=$(grep -oE 'end: *[0-9.]+' content.js | grep -oE '[0-9.]+$')
sed -i -E "s/data-duration=\"[0-9.]+\"/data-duration=\"$END\"/g; s/<html lang=\"[a-z]+\"/<html lang=\"$L\"/" index.html
echo "lang=$L duration=$END"
