## yo-ripe-chat

Here I have showing you that how to create Yo Ripe Chat application using socket io, Node JS, VueJS, Laravel.

---

##### System Requirements

The following are required to function properly.

- **Node v8.4.0+**
- **Socket io v2.0**
- **Vue.js v2.4.0**
- **Laravel 5.4+**

##### Chat application features

1. Private chatting
2. File send and receive
3. Online Offline status
4. Typing indicator
5. Messages stored in database(MongoDB)

##### Getting Started

**_Step : 1_**

```
git clone https://github.com/radyatamaa/yo-ripe-chat.git
```

**_Step : 2_**

Go to project directory using **Terminal / CMD**

```
composer install
```

**_Step : 3_**

In project directory find **_.env.example_** and rename to **_.env_**

Generate laravel application key

```
php artisan key:generate
```

Also change **DB_DATABASE, DB_USERNAME, DB_PASSWORD** in .env

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your db name
DB_USERNAME=your db username
DB_PASSWORD=your db password
```

Also add below line in your .env

```
WS_URL=http://localhost:3000/
```

**_Step : 4_**

Run Migration & Seeder

```
php artisan migrate

php artisan db:seed --class=UserTableSeeder
```

**_Step : 5_**

Go to project directory using **Terminal / CMD**

Open **nestjs** folder

install node dependencies

```
npm install
```

**_Step : 6_**

In **nestjs** directory find **_.env.example_** and rename to **_.env_**

change **database** mysql

below database configuration is same as above.

```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=laravel_chat
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_CHARSET=utf8mb4
```

change **database** mongoDB

```
CLEAN_NEST_MONGO_CONNECTION_STRING
```

**_Step : 7_**

**Start Nest JS Chat Server**

Go to project directory using **Terminal / CMD** Open **nestjs** folder

```
export NODE_ENV=dev
npm start
```

**Start Laravel Server**

Open Second **Terminal / CMD** Go to project directory

```
php artisan serve
```

Open http://127.0.0.1:8000 url in multipal browser


**Login with below Users**

| No  | Username | Password |
| ------------- | ------------- | ------------- |
| 1  | user1@gmail.com  | 123456 |
| 2  | user2@gmail.com  | 123456 |
| 3  | user3@gmail.com  | 123456 |

**Login at least 2 user in different browser.**

### Result
## welcome
https://github.com/radyatamaa/yo-ripe-chat/blob/dev/Screenshot%202023-08-24%20073150.png
## Login
https://github.com/radyatamaa/yo-ripe-chat/blob/dev/Screenshot%202023-08-24%20073144.png
## Register 
https://github.com/radyatamaa/yo-ripe-chat/blob/dev/Screenshot%202023-08-24%20073134.png
## Conversation Chat
https://github.com/radyatamaa/yo-ripe-chat/blob/dev/Screenshot%202023-08-24%20073001.png

### Thats it.
Feel free to contact me if you have any query. (^_^)
