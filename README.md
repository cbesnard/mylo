Mylo App

![Mylo](./public/icon144.png)

## Installation

1) Install vagrant 1.9.1 / ansible 2.2

2) Go on the root directory and create the vagrant :

    `vagrant up`

3) Add your sh key to the VM
  
    `vagrant ssh` and put your ssh key in the .ssh/authorized_keys file.
    Try to log in using `ssh ubuntu@10.0.0.20`

4) Provision the VM

    `ansible-playbook -i devops/provisioning/hosts/vagrant devops/provisioning/playbook.yml`

Now you are ready to dev :)
