在CentOS上使用Docker安装GitLab的步骤如下，我将结合参考文章中的信息，为您提供一个清晰、详细的指南：

### 1. **安装Docker**

如果您还没有安装Docker，首先需要安装Docker。可以去Docker官方下载，或者使用Docker的下载链接。安装完成后，按照官方推荐进行安装并注册账号。

### 2. **检查Docker版本**

安装完成后，使用以下命令检查Docker版本：


```bash
docker -v
```
或者


```bash
docker --version
```
### 3. **选择GitLab镜像**

* 搜索GitLab镜像：


```bash
docker search gitlab
```
您会看到多个镜像，选择适合您需求的镜像，例如 `gitlab/gitlab-ce`（ce表示社区免费版）。

* 下载GitLab镜像：

如果您想要下载最新版本的GitLab社区免费版，可以使用以下命令：


```bash
docker pull gitlab/gitlab-ce:latest
```
或者，您可以指定一个特定的版本，例如：


```bash
docker pull gitlab/gitlab-ce:14.10.3-ce.0
```
### 4. **配置安装目录和端口**

* 选择安装目录：

根据您的硬盘分配，选择需要进行映射的卷的位置。通常，您需要映射出三个卷，分别用于存储GitLab的数据、日志和配置文件。

例如，您可以将这三个卷放到统一的目录下，如 `/u01/gitlab`：


```bash
export GITLAB_HOME=/u01/gitlab
```
* 规划端口：

容器内外端口最好保持一致，便于后续的设置。至少需要两个端口：HTTP（或HTTPS）端口，用于网站登录和HTTP协议的代码同步；SSH端口，用于SSH方式的代码同步。

### 5. **运行GitLab容器**

使用以下命令运行GitLab容器：


```bash
sudo docker run --detach \
  --hostname gitlab \
  --publish 8061:80 \
  --publish 8062:443 \
  --publish 8060:22 \
  --name gitlab \
  --restart always \
  --volume $GITLAB_HOME/config:/etc/gitlab \
  --volume $GITLAB_HOME/logs:/var/log/gitlab \
  --volume $GITLAB_HOME/data:/var/opt/gitlab \
  gitlab/gitlab-ce:14.10.3-ce.0
```
请注意，上面的端口映射（`--publish`）和卷映射（`--volume`）是基于示例的，您可能需要根据自己的需求进行调整。

### 6. **配置GitLab**

容器启动后，您可能需要修改配置文件，对访问地址和端口等进行配置。配置文件位于 `$GITLAB_HOME/config/gitlab.rb`。

### 7. **重新配置和启动GitLab**

如果修改了配置文件，您需要重新配置GitLab以使更改生效。对于Omnibus安装，可以使用以下命令：


```bash
sudo gitlab-ctl reconfigure
```
对于Docker安装，您可能需要重启GitLab容器：


```bash
docker restart gitlab
```
### 8. **访问GitLab**

使用您设置的HTTP或HTTPS地址和端口访问GitLab。例如，如果您使用了上面的端口映射，您可以通过 `http://<您的服务器IP>:8061` 或 `https://<您的服务器IP>:8062` 访问GitLab。

请注意，以上步骤可能因您的具体环境和需求而有所不同。务必根据您的实际情况进行调整。