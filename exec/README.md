# 서비스 배포 문서

## 배포 환경

- Ubuntu 20.04 LTS (GNU/Linux 5.4.0-1018-aws x86_64)
- 환경에 따라 vi, nano / ssh, bash 같은 명령어가 달라질 수 있으니 주의

## 서버 포트

| 서비스       | 포트 번호                                           |
| ------------ | --------------------------------------------------- |
| MySQL 8.0.28 | 3306                                                |
| Springboot   | 8080                                                |
| React        | 3000                                                |
| NGINX        | 80(http) -> 443, 443(https)->3000(/), 8000(/api/v1) |

## Docker, docker-compose 설치

```shell
# 사용자 root로 변경
sudo su

apt-get update && apt-get upgrade

apt-get install \
	apt-transport-https \
	ca-certificates \
	curl \
	gnupg \
	lsb-release

-fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o
/usr/share/keyrings/docker-archive-keyring.gpg

echo \
	"deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg]
	https://download.docker.com/linux/ubuntu \
	$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get install docker-ce docker-ce-cli containerd.io

curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose
```

## DB 설치

1. Docker를 활용하여 mariaDB 10.2 설치

```shell
docker run --name mysql -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=<root 비밀번호> mysql:8.0.28
```

2. MySQL Workbench 등을 사용하여 root로 접속 후 아래 파일의 sql문 실행

## 프로젝트 컨테이너 적재

- 미리 빌드해둔 파일을 이용하여 프로젝트를 배포합니다.

1. node, java 설치

```shell
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -

apt-get update

apt-get install -y nodejs

apt-get install openjdk-11-jdk
```

2. git 설치 후 저장소 clone

```shell
apt-get install git

cd /opt # 폴더가 없다면 mkdir /opt

git clone https://lab.ssafy.com/s06-blockchain-nft-sub2/S06P22A401.git # 이후에 나오는 git 사용자 아이디 비밀번호 입력
```

3. 프로젝트 build

```shell
cd /opt/S06P22A401/frontend
npm install
npm run build

cd /opt/S06P22A401/backend
chmod 777 gradlew
./gradlew clean build
```

4. docker-compose 활용하여 프로젝트 앱 컨테이너 적재

```shell
cp /opt/S06P22A401/exec/docker-compose.yml /opt
cd /opt

docker-compose up --build -d springboot
docker-compose up --build -d react
```

## SSL 인증서 발급 및 프로젝트 배포

1. 인증서 발급을 위한 코드 작성 및 수정

```shell
cd /opt

docker-compose up --build -d nginx
docker-compose up --build -d certbot

vi /opt/nginx/conf.d/nginx.conf

# 아래의 코드 입력
server {
     listen 80;
     listen [::]:80;

     server_name <도메인 ip 또는 이름> # <>괄호 지우고 입력할 것

     location /.well-known/acme-challenge/ {
             allow all;
             root /var/www/certbot;
     }
}

cp /opt/S06P12A106/exec/init-letsencrypt.sh /opt
vi /opt/init-letsencrypt.sh

# 아래의 내용 변경
domains="<도메인 ip 또는 이름>" # <>괄호는 지우고 ""는 길 것
email="<이메일>" # <>괄호는 지우고 ""는 길 것
```

2. 위에서 수정한 init-letsencrypt.sh 파일 실행

```shell
chmod 777 init-letsencrypt
./init-letsencrypt.sh

# IMPORTANT NOTES: - Congratulations! 가 떠야 정상적으로 인증서가 발급된 것
```

3. NGINX 서버 설정 추가

```shell
vi /opt/nginx/conf.d/app.conf

# 아래의 내용 복사 및 <> 내용 변경, <>괄호도 지울 것
server {
    listen 80;
    listen [::]:80;

    server_name <도메인 ip 또는 이름>;

    location /.well-known/acme-challenge/ {
            allow all;
            root /var/www/certbot;
    }

    location / {
        return 301 <도메인 ip 또는 이름>$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name <도메인 ip 또는 이름>;

    ssl_certificate /etc/letsencrypt/live/<도메인 ip 또는 이름>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<도메인 ip 또는 이름>/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location /api/v1/ {
        proxy_pass http://springboot:8080;
        proxy_set_header    Host                $http_host;
        proxy_set_header    X-Real-IP           $remote_addr;
        proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
    }
    location /upload/ {
        proxy_pass http://springboot:8080;
        proxy_set_header    Host                $http_host;
        proxy_set_header    X-Real-IP           $remote_addr;
        proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
    }
    location / {
        proxy_pass http://react:3000;
        proxy_set_header    Host                $http_host;
        proxy_set_header    X-Real-IP           $remote_addr;
        proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
    }
}

docker-compose up --build -d nginx # NGINX 재시작
```

## 참고 문서

- [Docker NGINX SSL 인증서 설치/배포](https://velog.io/@fordevelop/Docker-Nginx-Certbot-Lets-Encrypt%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4-SSL-%EC%9D%B8%EC%A6%9D%EC%84%9C-%EB%B0%9C%EA%B8%89)
