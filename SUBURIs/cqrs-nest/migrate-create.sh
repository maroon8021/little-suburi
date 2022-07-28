#!/bin/sh

if [ $# != 1 ]; then
  echo "ファイル名が指定されてません" 1>&2
  exit 1
fi

yarn typeorm migration:create ./src/interface/database/migration/$1