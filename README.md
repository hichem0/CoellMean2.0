# Coell : Mean & Angular

MEAN Stack with Angular 2 

MEAN Stack with Angular 2 
////https://github.com/jeanalexandre/CoellMeaninstall Docker <br />
git clone https://github.com/jeanalexandre/CoellMean <br />
install Docker compose<br />
install Node.js<br />
install postgresql<br />
#after that 
download the complete project Coell from github <br />
open your terminal by typing<br />
$cd CoellMean/server<br />
$git pull
$docker-compose -f docker/postgresql.yml up -d<br />
$yarn install<br />
$yarn start<br />
$cd client/<br />
$yarn install<br />
$yarn start<br />
 after that <br />
 open a web browser by typing<br />
 //this is for api <br />
http://localhost:3001/docs/#/User_management/get_user <br />
//this is for the website <br />
http://localhost:3000/mygroups<br />

en cas de problème de "bcryept":
1) npm install node-gyp -g

2) npm install bcrypt -g

3) npm install bcrypt -save
