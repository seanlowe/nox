#!/bin/bash

MISSING_COMPONENTS=''

# color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # no color
# LIGHT_GREY_BACKGROUND='\033[0;100m'
# NORMAL_BACKGROUND='\033[0;49m'

# unicode characters
INSTALL_FOUND="$GREEN\U2714$NC"
INSTALL_MISSING="$RED\U2716$NC"
INSTALL_SEARCHING="\U2754"
WAVING_HAND="\U1F44B"
WRENCH="\U1F527"
SPARKLES="\U2728"
GLOWING_STAR="\U1F31F"

echo "Checking for required dependencies:"

# check for installation of node and npm
echo -en "$INSTALL_SEARCHING Node"
node --version &> /dev/null

# if node is not installed, add node to list of missing components
if [[ $? -ne 0 ]]; then
  sleep .5
  echo -e "\r $INSTALL_MISSING"
  MISSING_COMPONENTS="$MISSING_COMPONENTS node"
else
  sleep .5
  echo -e "\r $INSTALL_FOUND"
fi

echo -en "$INSTALL_SEARCHING NPM"
npm --version &> /dev/null

if [[ $? -ne 0 ]]; then
  sleep .5
  echo -e "\r $INSTALL_MISSING"
  MISSING_COMPONENTS="$MISSING_COMPONENTS npm"
else
  sleep .5
  echo -e "\r $INSTALL_FOUND"
fi

# check for installation of go
echo -en "$INSTALL_SEARCHING Go"
go version &> /dev/null

# if go is not installed, add go to list of missing components
if [[ $? -ne 0 ]]; then
  sleep .5
  echo -e "\r $INSTALL_MISSING"
  MISSING_COMPONENTS="$MISSING_COMPONENTS go"
else
  sleep .5
  echo -e "\r $INSTALL_FOUND"
fi

# check for installation of docker
echo -en "$INSTALL_SEARCHING Docker"
docker --version &> /dev/null

# if docker is not installed, add docker to list of missing components
if [[ $? -ne 0 ]]; then
  sleep .5
  echo -e "\r $INSTALL_MISSING"
  MISSING_COMPONENTS="$MISSING_COMPONENTS docker"
else
  sleep .5
  echo -e "\r $INSTALL_FOUND"
fi

# check for installation of homebrew
echo -en "$INSTALL_SEARCHING Homebrew"
brew --version &> /dev/null

# if homebrew is not installed, quit with a message
if [[ $? -ne 0 ]]; then
  sleep .5
  echo -e "\r $INSTALL_MISSING"
  MISSING_COMPONENTS="$MISSING_COMPONENTS brew"
else 
  sleep .5
  echo -e "\r $INSTALL_FOUND"
fi

# check for installation of overmind
# if brew is missing, don't try to check for overmind
BREW="brew"
if [[ $MISSING_COMPONENTS == *"$BREW"* ]]; then
  MISSING_COMPONENTS="$MISSING_COMPONENTS overmind"
else
  echo -en "$INSTALL_SEARCHING Overmind"
  overmind --version &> /dev/null

  # if overmind is not installed but brew is, install it
  if [ $? -ne 0 ]; then
    sleep .5
    echo -en "\r $INSTALL_MISSING Overmind ... installing"
    brew install overmind

    echo $?

    if [ $? -ne 0 ]; then
      sleep 1
      echo -e "\r $INSTALL_MISSING Overmind ... install failed."
      MISSING_COMPONENTS="$MISSING_COMPONENTS overmind"
    else
      sleep 1
      echo -e "\r $INSTALL_FOUND"
    fi
  else
    sleep 1
    echo -e "\r $INSTALL_FOUND"
  fi
fi

# display missing components
if [[ $MISSING_COMPONENTS != "" ]]; then
  echo -e "\nMissing components: $MISSING_COMPONENTS"
  echo "Please install the missing components and try again."
  exit 1
fi

# else, continue with the installation
echo -e "\nAll required dependencies are installed! $GLOWING_STAR\n"
echo -e "Continuing with installation... $WRENCH\n"

# starts in /home/slowe/Documents/projects/nox
echo -e "Installing the Nox frontend (Next.js)"
cd src
npm install &> /dev/null

if [[ $? -ne 0 ]]; then
  echo -e " $INSTALL_MISSING Frontend install failed. Please try again.\n"
  exit 1
fi

echo -e "Installing the Nox backend  (golang)"
cd ../noxd
go install &> /dev/null

if [[ $? -ne 0 ]]; then
  echo -e " $INSTALL_MISSING Backend install failed. Please try again."
  exit 1
fi

# get back to initial starting directory
cd ../

# copy example env to .env
cp .env.example .env
echo -e "\n.env file created! Don't forget to update your ENV values."

echo -e "\nNox installation complete! $SPARKLES\n"

# display instructions for starting the app
echo -e "To start the app, run the following command:"
echo -e " $ overmind start"
