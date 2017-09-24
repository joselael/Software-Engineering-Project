# README #

## Group 5 SWE Project ##

### Team Members ###
Gina DiCarlo  
Yong Su Lee  
Yuan Zhou  
Jose Laël Louis - jlouis000@citymail.cuny.edu - 929-235-4380  

### Communication ###
https://gitter.im/322-Software-Engineering-Project/Lobby  

### Contributing ###
- We'll be using git for all code contributions, please learn how to use its 
essential features, especially branching and merging.  
- To clone the github repo do:  
```
$ git clone https://github.com/jllouis/Software-Engineering-Project.git
```  

### Tools ###
Recent version of Python 3.x  
HTML CSS JavaScript (?) for Front End  
MariaDB for DB  
Git for SVM  
Google Cloud Platform for Hosting the App  

### Resources ###
#### Repo ####
https://github.com/jllouis/Software-Engineering-Project.git  
#### Cloud Server ####
https://console.cloud.google.com/home/dashboard?project=dllz-swep  
###### Specs ######
0.6 GB of RAM
0.2 of a Virtual CPU - that's a 20% time slice on a single core :( 
Server IP: 35.196.192.80  
The server is Container Linux (CoreOS), a lightweight GNU/Linux OS intended for hosting Docker or Rocket containers  
Container Linux is _lightweight_ (it is ~150mb large, and runs on ~20mb of RAM), and keeps itself updated. This is useful since we're running on meager server.  
##### Logging into the Server:######
You can use the shell provided on the [GCP Console Dashboard](console.cloud.google.com) or:  
1. Download and install the [gcloud](https://cloud.google.com/sdk/docs/) CLI tool for your platform.
2. After setting it up with your account do:
`gcloud compute --project "dllz-swep" ssh --zone "us-east1-b" "instance-1"`
gcloud will create a RSA ID file under your ssh directory (~/.ssh/ if you're on Linux, or the Linux Subsystem for Windows). You can use that if you're connecting to the database from a GUI like DataGrip.  
3. Continue using the gcloud command for future logins, or regular ssh using the server's IP and the RSA ID file.  
##### Logging into the MariaDB Docker Container:#####
1. After successfully logging into the server do:
`$ docker exec -it mariadbs1 bash`  
Please beware, you have root shell access by default, so please be careful  
2. Log into the database as root and create a user account for yourself:
`# mysql -u root -p`  
Then enter the password.
3. Enter the following commands to create your personal credentials on the dabatase:  
```
mysql> CREATE USER '<your-user-name'@'%' IDENTIFIED BY '<your-secret-password';
mysql> GRANT ALL PRIVILEGES ON *.* TO '<your-user-name>'@'%'
    ->     WITH GRANT OPTION;
```
4. When creating a user for a function or app, consider limiting its access and permissions, so that a bug or logical error doesn't damage the database. Also consider creating a temporary database for development and testing.  
*Please beware, although your user isn't root, you have persmission to do anything, please don't delete the database on the day before we present* :)  

#### Docker Tutorial ####
https://docs.docker.com/get-started/  

#### MySQL Tutorial ####
https://dev.mysql.com/doc/refman/5.7/en/tutorial.html  

#### Git Tutorial ####
Basic: https://try.github.io/, or better yet  http://rogerdudler.github.io/git-guide/  
In depth: http://gitimmersion.com/  
Comprehensive: https://git-scm.com/doc  

#### Implementation Document ####
The spec sheet can be found [here](docs/project_spec_draft.docx).  
And the [link to the implementation Google Doc](https://docs.google.com/document/d/1kPIsCRGtcGwA_biV4v_ITblgwC11_RS1i6Y_EiVBpNs/edit?usp=sharing).   
