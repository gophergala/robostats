#/usr/bin/env bash
source ./env.bash
rm -rf api.tar.gz
revel package robostats/api
scp api.tar.gz www-data@dev.robostats.io:
ssh www-data@dev.robostats.io '
  killall api;
  rm -rf api;
  mkdir api;
  tar xvzf api.tar.gz -C api/;
  cd api && ./run.sh
'
