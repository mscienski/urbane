#!/usr/bin/env bash

sudo add-apt-repository ppa:saiarcot895/myppa
sudo apt-get update
sudo apt-get -y install apt-fast

curl --silent --location https://deb.nodesource.com/setup_4.2.2 | sudo -E bash -
sudo apt-add-repository ppa:brightbox/ruby-ng
sudo chown -R `whoami` /etc/apt/sources.list.d/
sudo apt-fast update
sudo apt-fast install -y ruby2.2 ruby2.2-dev git nodejs
wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh
