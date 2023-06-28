# Manual Installation

## Prerequisites:
* node
* golang
* docker
* overmind

For more concise instructions based on your operating system, find your OS below:
- [Ubuntu](./install/ubuntu.md)

To install manually, you'll need to make sure you have all the prerequisites installed before trying to install `nox`:

### node.js
Here's a [link](https://nodejs.org/en/download/package-manager) to the node.js website where you can search for your operating system and install `node` accordingly.

### golang
Find the correct instructions on how to install golang for your machine on the go dev [docs](https://go.dev/doc/install).

### docker
Check out docker's [website](https://docs.docker.com/engine/install/) to install docker on your system.

**Note**: Depending on your system, there's both a GUI desktop app or a terminal CLI that you can install.

### overmind
Check out the [official repository](https://github.com/DarthSim/overmind) for instructions on how to install overmind.

## Installing nox
Now that you've installed all the prereq's, you can install nox. We have the all-in-one installer under `install.sh` but if you'd rather do it yourself, feel free to follow the instructions below:

```bash
$ git clone https://github.com/seanlowe/nox.git # or if you're using the GitHub CLI: gh repo clone seanlowe/nox
$ cd nox

# install the frontend
$ npm install

# install the backend
$ go install
```
