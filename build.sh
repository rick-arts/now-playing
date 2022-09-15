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

npm update --save

docker buildx create --name "$PROJECT"-"$BASENAME"
docker buildx build -q --push --platform linux/amd64 -t registry.roefja.dev/"$PROJECT"/"$BASENAME" --builder "$PROJECT"-"$BASENAME" --cache-to=type=local,dest=.dockercache/"$PROJECT"/"$BASENAME" .

if [ -n "${version}" ]; then
docker buildx build -q --push --platform linux/amd64 -t registry.roefja.dev/"$PROJECT"/"$BASENAME":v$version --builder "$PROJECT"-"$BASENAME" --cache-from=type=local,src=.dockercache/"$PROJECT"/"$BASENAME" .
fi

docker buildx build -q --push --platform linux/amd64 -t "$PROJECT"/"$BASENAME" --builder "$PROJECT"-"$BASENAME" --cache-from=type=local,src=.dockercache/"$PROJECT"/"$BASENAME" .
docker buildx rm "$PROJECT"-"$BASENAME"