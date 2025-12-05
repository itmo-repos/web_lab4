#!/bin/bash

cd frontend
npm run build
cd ..

mvn clean install

ssh helios "rm -rf wildfly-38.0.1.Final/standalone/deployments/lab4.war*"

scp ./backend/target/lab4.war helios:wildfly-38.0.1.Final/standalone/deployments

ssh \
  -L 46704:localhost:46704 \
  -L 46702:localhost:46702 \
  helios
