#!/bin/sh

PARAM_STR=""
for param in $(cat $1 | grep  '^-'); 
do
  PARAM_STR="$PARAM_STR $param"
done
echo $PARAM_STR