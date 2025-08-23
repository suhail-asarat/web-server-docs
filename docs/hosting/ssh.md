# SSH Configuration

Once you have your account *(username/password)*, you can SSH into server by following these steps:

### Step 1: Creating SSH Key Pairs

#### On Windows

* Open `Terminal` or `PowerShell`
* Create a key pairs
  ```pwsh
  ssh-keygen -t rsa -b 4096
  ```
!!! info
    `ssh-keygen` is used for creating key pair <br>
    `-t` denotes the type of key, here we have used `rsa` as key type <br>
    `-b` denotes the key length in bits, here we have used `4096` bits as key length <br>

> If you have not created any key pair before then just proceed without altering anything.

### Step 2: Adding SSH Private Key to Own Open SSH Server

!!! info
    For next step you may need to open `Terminal` or `PowerShell` as *Administrator*.

* Run `ssh-agent`
  ```pwsh
  Get-Service ssh-agent | Set-Service -StartupType Automatic
  ```
  ```pwsh
  Start-Service ssh-agent
  ```

* Add SSH Private key to the `ssh-agent`
  ```pwsh
  ssh-add C:\Users\username\.ssh\id_rsa
  ```

### Step 3: Adding SSH Public key to the Server

* Copy the SSH Public key from `C:\Users\username\.ssh\id_rsa.pub`, and

* Put it in the `/home/username/.ssh/authorized_keys` file

### Step 4: Testing Connection

If everything goes right, you should be able to `SSH` into the server by using this command in your `Terminal` or `PowerShell`.
```pwsh
ssh username@server_url
```
