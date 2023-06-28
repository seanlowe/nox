#!/bin/bash

if [ "$SHELL" != "/bin/bash" ] ; then
  echo "Please run this script with bash."
  exit 1
fi

MISSING_COMPONENTS=''
RUNNING_DIR=$(dirname "$(readlink -f "$0")")
BIN_DIR="$RUNNING_DIR/../../bin"

# color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # no color

# unicode characters
INSTALL_FOUND="$GREEN\U2714$NC"
INSTALL_MISSING="$RED\U2716$NC"
INSTALL_SEARCHING="\U2754"
WRENCH="\U1F527"
SPARKLES="\U2728"
GLOWING_STAR="\U1F31F"

function validateInstall() {
  local program=$1
  local dash=$2

  echo -en "$INSTALL_SEARCHING $program"
  eval "$(${program} ${dash}version &> /dev/null)"

  if [[ $? -ne 0 ]] ; then
    sleep .5
    echo -e "\r $INSTALL_MISSING"
    MISSING_COMPONENTS="$MISSING_COMPONENTS $program"
    return 1
  fi

  sleep .5
  echo -e "\r $INSTALL_FOUND"

  return 0
}

echo "Checking for required dependencies:"

validateInstall "node" "--"

validateInstall "npm" "--"

validateInstall "go" ""

validateInstall "docker" "--"

validateInstall "overmind" "--"

# display missing components
if [[ $MISSING_COMPONENTS != "" ]] ; then
  echo -e "\nMissing components: $MISSING_COMPONENTS"
  echo "Please install the missing components and try again. Read the manual installation instructions for more information. (docs/manual-installation.md)"
  exit 1
fi

# else, continue with the installation
echo -e "\nAll required dependencies are installed! $GLOWING_STAR\n"
echo -e "Continuing with installation... $WRENCH\n"


# ------------------- #
#       FRONTEND      #
# ------------------- #

# starts in /home/slowe/Documents/projects/nox
echo -e "Installing the Nox frontend (Next.js)"
cd src
npm install &> /dev/null

if [[ $? -ne 0 ]] ; then
  echo -e " $INSTALL_MISSING Frontend install failed. Please try again.\n"
  exit 1
fi

# ------------------- #
#       BACKEND       #
# ------------------- #

echo -e "Installing the Nox backend  (golang)"
cd ../noxd
go install &> /dev/null

if [[ $? -ne 0 ]] ; then
  echo -e " $INSTALL_MISSING Backend install failed. Please try again."
  exit 1
fi

# get back to initial starting directory
cd ../

# copy example env to .env
cp .env.example .env
echo -e "\n.env file created! Don't forget to update your ENV values."

echo -e "\nNox installation complete! $SPARKLES\n"

# ------------------- #
#     INSTRUCTIONS    #
# ------------------- #

# display instructions for starting the app
echo -e "To start the app, run the following command:"
echo -e " $ overmind start"
