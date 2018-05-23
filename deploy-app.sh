#!/bin/bash
echo "Starting deploy"
cd ./dist
mv ./../deploy/.gitlab-ci.yml ./.gitlab-ci.yml
mv ./../deploy/index.php ./index.php
git config --global user.name thigobernardes
git config --global user.email tmb0710@gmail.com
git init
git add .
git commit -m "new build"
git push -f https://thiagolab262:XHm-LLe-2yn-qvD@gitlab.com/LAB262/web-agro-control-system-deploy.git HEAD:master
