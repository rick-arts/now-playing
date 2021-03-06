#!/bin/bash

# Automatic build and push our docker images

CURRENT=`pwd`
BASENAME='now-playing'
PROJECT='rickarts'

version=''

while getopts ":v:" opt; do
  case ${opt} in
    v )
      version=$OPTARG
      ;;
    \? )
      echo "Invalid option: $OPTARG" 1>&2
      ;;
    : )
      echo "Invalid option: $OPTARG requires an argument" 1>&2
      ;;
  esac
done
shift $((OPTIND -1))

docker buildx use builder
docker buildx build -q --load --platform linux/amd64 -t registry.roefja.dev/"$PROJECT"/"$BASENAME" .

if [ -n "${version}" ]; then
docker tag registry.roefja.dev/"$PROJECT"/"$BASENAME" registry.roefja.dev/"$PROJECT"/"$BASENAME":v-$version
fi

docker push -q --all-tags registry.roefja.dev/"$PROJECT"/"$BASENAME" 