# Coell : Mean & Angular

MEAN Stack with Angular 2 

MEAN Stack with Angular 2 
////https://github.com/jeanalexandre/CoellMeaninstall Docker 
git clone https://github.com/jeanalexandre/CoellMean
install Docker compose
install Node.js
install postgresql
#after that 
download the complete project Coell from github 
open your terminal by typing
$cd CoellMean/server
$git pull
$docker-compose -f docker/postgresql.yml up -d
$yarn install
$yarn start
$cd client/
$yarn install
$yarn start
 after that 
 open a web browser by typing
 //this is for api 
http://localhost:3001/docs/#/User_management/get_user 
//this is for the website 
http://localhost:3000/mygroups

en cas de problème de "bcryept":
1) npm install node-gyp -g

2) npm install bcrypt -g

3) npm install bcrypt -save
