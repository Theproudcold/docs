# docker 安装mysql
```bash
docker pull mysql:5.7
```
# 挂载本地目录
```bash
mkdir -p /home/service/mysql/data
```
# 挂载配置文件
```bash
mkdir -p /home/service/mysql/conf
```
#前往配置文件位置
```bash
cd /home/service/mysql/conf
```
# 新建配置文件
```bash
touch my.cnf
```
# 写入配置文件
```conf
[mysqld]
user=mysql
character-set-server=utf8
default_authentication_plugin=mysql_native_password
default-time_zone = '+8:00'
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8
```
# 启动容器
```bash
docker run -p 3306:3306 --name mysql -v /home/service/mysql/logs:/logs -v /home/service/mysql/data:/mysql_data -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7
```
# 进入容器
```bash
docker exec -it mysql bash
```
# 登录mysql
```bash
mysql -uroot -p
```
# 新建用户
```
CREATE USER 'admin'@'%' IDENTIFIED BY '123456';
```
# 赋予权限
```
GRANT ALL ON *.* TO 'admin'@'%'; 
```
# 刷新权限
```
flush privileges;
``` 

