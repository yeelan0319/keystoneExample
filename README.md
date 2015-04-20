#Symbolic Corporate Website

## Requirement

- Deploy on bare metal

	- node 0.10.X
	- mongoDB 3.0.1
	- redis 2.8.19
	- npm
	
- Deploy with docker

	- docker 1.5+
	- docker compose 1.1.0
	- npm	

## Deploy with Docker (Development)

1. Make sure you installed all required softwares.
	
	- docker on [MAC](https://docs.docker.com/installation/mac/) or [Ubuntu](https://docs.docker.com/installation/ubuntulinux/)
	- [docker compose](https://docs.docker.com/compose/install/)
	
2. Pull the latest code to your local folder. ***Caution**: pull both mainline code as well as node_modues*		

	- Set up server-dependent environment (For first time Deployment only). 

		- Edit ```docker-compose.yml.development.sample``` and save it as ```docker-compose.yml```
		- Copy ```Dockerfile.development.sample``` and save it as ```Dockerfile```. Edit it only if you changes the port inside container in ```docker-compose.yml```.
		- If you don't have the HTTPS Key and Certification generate before, please do the following.
		 
			1. Create a server side private key
			
					openssl genrsa -des3 -out server.key 1024
			
			2. Create the certificate signing request
	
					openssl req -new -key server.key -out server.csr
			
			3. Sign the certificate by yourself
	
					openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
			
			4. Remove the required password when using certificate
	
					cp server.key server.key.orig
					openssl rsa -in server.key.orig -out server.key
		- Edit ```env.sample``` and save it as ```.env```. 

	
3. Run docker container. Under certain circumstance you may need to run it with ```sudo```

		docker-compose up -d

You may now visit the port you expose and see the service running. If you make changes to the source code. You may refresh and see the changes in realtime. 
***Notice**: When there is an update in ```Dockerfile```/```docker-compose.yml```, please remove the old image and rebuild it using ```docker-compose build```*
	


## Deploy with Docker (Production)

1. Make sure you installed all required softwares.
	
	- docker on [MAC](https://docs.docker.com/installation/mac/) or [Ubuntu](https://docs.docker.com/installation/ubuntulinux/)
	- [docker compose](https://docs.docker.com/compose/install/)
	
2. Pull the latest code to your local folder. ***Caution**: pull just mainline code for production environment*		

3. **For first time Deployment**
	- Set up server-dependent environment. 

		- Edit ```docker-compose.yml.production.sample``` and save it as ```docker-compose.yml```
		- Copy ```Dockerfile.production.sample``` and save it as ```Dockerfile```. Edit it only if you changes the port inside container in ```docker-compose.yml```.
		- If you don't have the HTTPS Key and Certification generate before, please do the following.
		 
			1. Create a server side private key
			
					openssl genrsa -des3 -out server.key 1024
			
			2. Create the certificate signing request
	
					openssl req -new -key server.key -out server.csr
			
			3. Sign the certificate by yourself
	
					openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
			
			4. Remove the required password when using certificate
	
					cp server.key server.key.orig
					openssl rsa -in server.key.orig -out server.key
		- Edit ```env.sample``` and save it as ```.env```. 

	- Run docker container. Under certain circumstance you may need to run it with ```sudo```

			docker-compose up -d
		
4. **For update the server**
	
	- Rebuild the image
		
			docker-compose build keystone.js 
	
	- Restart the docker container
	
			docker-compose up -d
			
	- Delete the old image
	
			docker rmi <IMAGE_ID>

You may now visit the port you expose and see the service running. In production environment, the code is copied into and run a local ```npm install``` inside the container to make the deployment slimmer and quicker.


##Deploy directly on Linux Machine (Not recommand)

1. Make sure you installed all required softwares.
	
2. Pull the latest code to your local folder. ***Caution**: pull just  mainline code if you develop on bare metal*		

3. **For first time Deployment**
	- Set up server-dependent environment. 

		- If you don't have the HTTPS Key and Certification generate before, please do the following.
		 
			1. Create a server side private key
			
					openssl genrsa -des3 -out server.key 1024
			
			2. Create the certificate signing request
	
					openssl req -new -key server.key -out server.csr
			
			3. Sign the certificate by yourself
	
					openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
			
			4. Remove the required password when using certificate
	
					cp server.key server.key.orig
					openssl rsa -in server.key.orig -out server.key
		- Edit ```env.sample``` and save it as ```.env```. 
		
4. Run dependent the service(redis and mongo)
	
	- Run Redis
		
			redis-server
	
	- Run Mongo
	
			mongod --config <MONGO_CONFIG_FILE>
			
5. Install the node modules

		npm install
	
		
6. Run Keystone Application
	
		node keystone

You may now visit the port you expose and see the service running. 

