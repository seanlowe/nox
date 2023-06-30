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
Check out docker's [website](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository) to install the docker CLI for your system. Below are the installation instructions as of June 2023:

```bash
# install prerequisites
$ sudo apt-get update
$ sudo apt-get install ca-certificates curl gnupg

# add the official GPG key
$ sudo install -m 0755 -d /etc/apt/keyrings
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
$ sudo chmod a+r /etc/apt/keyrings/docker.gpg

# set up the repository
$  echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# install docker
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

After installing docker, you might want to add your user to the docker group (so you can run docker without sudo all the time) like so:
```bash
$ sudo usermod -aG docker <your username>
```
Then log out and back in to make sure your user has the correct permissions.

**Note**: if you want to use docker immediately without logging in and out, then run the following command:
```bash
$ newgrp docker
```

Now you can run docker to validate it's correctly installed:
```bash
$ sudo docker run hello-world
```

**Note**: there is also a GUI desktop app for docker if you need: [here](https://docs.docker.com/desktop/install/ubuntu/).

### overmind
You can install overmind using golang. Run the following commands:
```bash
$ go install github.com/DarthSim/overmind/v2@latest

# to move your overmind to a usable location without messing with PATH
$ sudo mv $(go env GOPATH)/bin/overmind /usr/local/bin

# or you can add your GOPATH/bin to your PATH, permanently
$ echo "export PATH=$PATH:$(go env GOPATH)/bin" >> ~/.bashrc # or .zshrc, etc - insert your shell file of choice
$ source ~/.bashrc # so that you can immediately use overmind without closing and reopening your shell
```

**Note**: at time of writing, v2 was the most recent release. It would be prudent to check the [official repository](https://github.com/DarthSim/overmind) to make sure information is accurate or for instructions on how to install overmind.

## Installing nox
Now that you've installed all the prereq's, you can install nox. Head back up to the [main installation guide](../manual-installation.md#installing-nox) to read the instructions on how to install `nox`.
