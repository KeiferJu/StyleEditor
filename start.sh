#!/bin/bash

pm2 start node_modules/.bin/webpack-dev-server -n style-editor-server -- --progress --profile --colors
