# LAMP Stack Hosting

In order to host a LAMP[^1] website an account is needed.

## Steps

### Step 1: Uploading files

#### Using Virtualmin GUI

1. Go to the [Webmin Panel](https://cse.pstu.ac.bd:10000)
2. Use credentials to log in and open the Dashboard
3. Navigate to **File Manager** from the menu on the left side, it should open the `/home/username/public_html` directory
4. Upload files from the `File` menu

#### Using SCP

For advanced users, files can be uploaded using `SCP`. But in order to use `SCP`, you will need the SSH key configured on your device.

### Step 2: Create MySQL database

#### Retrive Password

1. Go to `Dashboard` > `Edit Databases` > `Passwords`
2. Copy the *password* under *MariaDB database* or change it to as you want

#### Databases

A database in the name of the user is created in default e.g., `username_db`

!!! tip
    You can create database from `Edit Databases` menu

Go to `Create a new database` option and follow through the process

### Step 3: Configure Application

Information for connection variables or strings should be as follows:

```bash
host: localhost
port: 3306
database_name: username_db
username: your_username
password: your_password
```

You will get your *Database Password* from **Step 2**.

### Step 4: Access phpMyAdmin

Though database can some what be managed from Virtualmin GUI, it would be more easy to interact using `phpMyAdmin`.

1. Visit [phpMyAdmin Panel](https://cse.pstu.ac.bd/phpmyadmin)
2. Provide your `username` and `password` obtained from **Step 2**.



[^1]: LAMP *stands for* Linux, Apache, MySQL, and PHP