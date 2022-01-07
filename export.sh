#!/bin/bash

rm game.zip
zip game.zip src/*.js index.html src/Obstacles/*.js
cp game.zip archive/game_$(date +"%Y-%m-%d_%H-%M-%S").zip
