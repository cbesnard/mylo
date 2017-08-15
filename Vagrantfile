$BOX = "ubuntu/xenial64"
$IP = "10.0.0.20"
$MEMORY = ENV.has_key?('VM_MEMORY') ? ENV['VM_MEMORY'] : "1024"
$CPUS = ENV.has_key?('VM_CPUS') ? ENV['VM_CPUS'] : "1"
$MYLO_ROOT_FOLDER = "/var/www/Mylo/current"

Vagrant.configure("2") do |config|
  config.vm.hostname = "Mylo.dev"
  config.vm.box = $BOX
  config.vm.network :private_network, ip: $IP
  config.ssh.forward_agent = true

  config.vm.synced_folder ".", $MYLO_ROOT_FOLDER , type: "nfs"

  config.vm.provider "virtualbox" do |v|
    v.name = "Mylo"
    v.customize ["modifyvm", :id, "--cpuexecutioncap", "100"]
    v.customize ["modifyvm", :id, "--memory", $MEMORY]
    v.customize ["modifyvm", :id, "--cpus", $CPUS]
  end

   config.vm.provision "ansible" do |ansible|
      ansible.playbook = "./devops/provisioning/playbook.yml"
   end
end