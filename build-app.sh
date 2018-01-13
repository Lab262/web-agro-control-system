#!/bin/bash
echo "Starting build"
ember build --environment=production
echo "Renaming root path"
sed -i -- 's/\/assets/.\/assets/g' ./dist/index.html
