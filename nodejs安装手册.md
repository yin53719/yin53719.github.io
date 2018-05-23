#CentOS 下安装 Node.js

1，下载

wget https://nodejs.org/dist/v7.6.0/node-v7.6.0-linux-x64.tar.xz

2，解压

tar xvf node-v7.6.0-linux-x64.tar.xz

3，进入目录

cd  cd node-v7.6.0-linux-x64

4,安装

./configure

make

make install

5，配置环境变量
vim /etc/profile

#set for nodejs

export NODE_HOME=/usr/local/nodejs

export PATH=$NODE_HOME/bin:$PATH

6,编译/etc/profile 使配置生效

source /etc/profile

更新linux  yum源 nodejs版本

curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -

