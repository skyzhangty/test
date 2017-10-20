#!/bin/bash

jshintSrcFiles="src/scripts/** test/**"
platoLocalReportsDir="dist/reports/plato"
platoJenkinsReportsDir="/var/www/html/plato/umhr-study-team"

if [ $1 = "dev" ] || [ $1 = "offline" ]
then
    platoReportsDir=$platoLocalReportsDir
else
    platoReportsDir=$platoJenkinsReportsDir
fi

./node_modules/.bin/plato -r -d $platoReportsDir -e .eslintrc.json -t "UMHR-STUDY-TEAM" $jshintSrcFiles
