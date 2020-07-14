## Running Project

1) Make shure you have docker and docker-compose installed on your computer
2) Run:
 $ sudo docker run --rm -v $(pwd):/app composer install
3) Run:
 $ sudo docker-compose up -d
4) Create a copy of .env.example in the root directory and rename it to .env
5) Run:
 $ sudo docker-compose exec app php artisan migrate
6) Run:
 $ sudo docker-compose exec app php artisan key:generate
7) Project will run on localhost.
