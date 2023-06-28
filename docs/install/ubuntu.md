To manually install `nox` on an **Ubuntu** system, follow these instructions to install the prerequisites before trying to install `nox`:

### node.js
You can install node on Ubuntu by running the following command:
```bash
$ snap install node --classic
```

### golang
```bash
$ curl -LO https://go.dev/dl/go1.20.5.linux-amd64.tar.gz
$ sudo tar -C /usr/local -xzvf go1.20.5.linux-amd64.tar.gz
$ export PATH=$PATH:/usr/local/go/bin
$ go version
```

Note: `1.20.5` was the most recent version at time of writing this guide. Please refer to the golang dev [docs](https://go.dev/doc/install) for more up-to-date information.

### docker
Check out docker's [website](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository) to install the docker CLI for your system.

After installing docker, you'll want to add your user to the docker group like so:
```bash
$ sudo usermod -aG docker <your username>
```
Then log out and back in to make sure your user has the correct permissions.

**Note**: there is also a GUI desktop app for docker if you need: [here](https://docs.docker.com/desktop/install/ubuntu/).

### overmind
You can install overmind using golang. Run the following commands:
```bash
$ go install github.com/DarthSim/overmind/v2@latest

# to move your overmind to a usable location without messing with PATH
$ sudo mv $(go env GOPATH)/bin /usr/local/bin

# or you can add your GOPATH/bin to your PATH, permanently
$ echo "export PATH=$PATH:$(go env GOPATH)/bin" >> ~/.bashrc # or .zshrc, etc - insert your shell file of choice
$ source ~/.bashrc # so that you can immediately use overmind without closing and reopening your shell
```

**Note**: at time of writing, v2 was the most recent release. It would be prudent to check the [official repository](https://github.com/DarthSim/overmind) to make sure information is accurate or for instructions on how to install overmind.

## Installing nox
Now that you've installed all the prereq's, you can install nox. Head back up to the [main installation guide](../manual-installation.md#installing-nox) to read the instructions on how to install `nox`.
