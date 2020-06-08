---
title: '[Deepin] Install NVIDIA' 
date: 2020-04-05 02:58:00
---

### Install Deepin 

参考[官方教程](https://bbs.deepin.org/forum.php?mod=viewthread&tid=135870).

</br>

</br>

</br>

### Install NVIDIA

Intel 自带的显卡默认只有756的分辨率，然后你需要先去[NVIDIA的官网](https://www.nvidia.cn/geforce/)下载自己显卡在Linux下的驱动，例如驱动文件为“NVIDIA-Linux-x86_64-352.55.run”。

注意：安装英伟达官方.run驱动很有可能出现问题，建议使用源内版本，请斟酌。

快捷键“Ctrl+Alt+F1”，进入tty1，然后登录系统，执行如下命令：

```shell
sudo systemctl stop lightdm #关闭登录管理器服务,先停止lightdm服务
sudo apt-get remove --purge nvidia* #卸载掉旧版驱动

echo 'blacklist nouveau'|sudo tee -a /etc/modprobe.d/nvidia-blacklists-nouveau.conf
sudo update-initramfs -u #之前使用的是nouveau就禁用nouveau

chmod u+x NVIDIA-Linux-x86_64-352.55.run #安装英伟达官方驱动,赋予可执行权限
sudo ./NVIDIA-Linux-x86_64-352.55.run #安装驱动文件

 	
sudo systemctl start lightdm#如果没有出现图形界面请尝试
```

**卸载**

```shell
sudo apt-get remove nvidia-driver nvidia-kernel-dkms glx-alternative-nvidia#如果为命令自动安装，终端执行如下命令可卸载
nvidia-uninstall#如果为命令自动安装，终端执行命令可卸载
nvidia-installer --uninstall
```

注意： 如果进入tty1之后系统一直刷出来一个形如`iwlwifi 0000:00:14.3: Unhandled alg: 0x707`的命令，那个是你的网卡驱动的问题，自行更新驱动就可。

</br>

</br>

</br>

### Afterwords

因为自己不太喜欢Deepin有点造作这点，譬如开机音乐，过度动画不流畅，许多软件还是得自己Google下载，而且网上存在的教程比较少，最后还是换回了Ubuntu，所以这篇文章就搁置吧……

</br>

</br>

</br>

### Referance

1. [如何安装显卡的闭源驱动](https://www.deepin.org/docs/deepintoeveryone/%E7%A1%AC%E4%BB%B6%E4%B8%8E%E9%A9%B1%E5%8A%A8/%E5%A6%82%E4%BD%95%E5%AE%89%E8%A3%85%E6%98%BE%E5%8D%A1%E7%9A%84%E9%97%AD%E6%BA%90%E9%A9%B1%E5%8A%A8/)
2. [tty不断出现iwlwifi 0000:00:14.3: Unhandled alg: 0x707](https://bbs.deepin.org/forum.php?mod=viewthread&tid=180531)        