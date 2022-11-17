build :
	docker build -t ubuntu .
run :
	docker run --name ubuntu -d -p 8000:80 ubuntu
exec :
	docker exec -it ubuntu /bin/bash
ps : 
	docker ps -a
img :
	docker images
rm : 
	docker stop ubuntu
	docker rm ubuntu
rmi :
	docker rmi $$(docker images -q)
