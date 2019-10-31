var dateformat = require('dateformat');

const https = require('https');
var http = require('http');
var fs = require('fs');
var FormData = require('form-data'); 
var faye = require('faye');
var deasync = require('deasync');
const sql = require('mssql');

var odbc_url = process.env.ODBC_URL;
var odbc_port = process.env.ODBC_PORT;

var lxp_url = process.env.LXP_URL;
var lxp_port = process.env.LXP_PORT;

var lxp_url = process.env.LXP_URL;
var lxp_port = process.env.LXP_PORT;

var scheduler_url = process.env.SCHEDULER_URL;
var scheduler_port = process.env.SCHEDULER_PORT;

var camera_ip_1 = process.env.CPS_CAMERA_IP1;
var camera_port_1 = process.env.CPS_CAMERA_PORT1;

var camera_ip_2 = process.env.CPS_CAMERA_IP2;
var camera_port_2 = process.env.CPS_CAMERA_PORT2;

var cylinder_ip_1 = process.env.CPS_CYLINDER_IP1;
var cylinder_port_1 = process.env.CPS_CYLINDER_PORT1;

var cylinder_ip_2 = process.env.CPS_CYLINDER_IP2;
var cylinder_port_2 = process.env.CPS_CYLINDER_PORT2;

var cps_url = process.env.CPS_URL;
var cps_port = process.env.CPS_PORT;

var CPScontrole;
var finalProduct = [];
var done;

const default_user = 'Test_3';
const default_password = 'aqwzsxedc';
const default_server = 'localhost';
const default_database = 'Lxp';

var config = 
{
 user: default_user, // update me
 password: default_password, // update me
 server: default_server, // update me
 database:default_database
};

function lxpConnector(request, callback){
  try {
    var pool = new sql.ConnectionPool(config);
    pool.connect().then(result => {
     var aResult = pool.request().query(request);
     var res = Promise.resolve(aResult);
     res.then(function(data){callback(data.recordset)});

   });
  }
  catch (err){
    callback(err);
  }
}

exports.displayPage = function(req, res) {
  try{
    var page = req.params.page;
    console.log(page);
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile('./View/'+page, function(err, html){
      if(err){  
        throw err;
      }
      res.write(html);
      res.end();
    })
  } catch(err){
    console.log(err)
    res.send(err)
  }
}

exports.redirecting = function(req, res) {  
  res.redirect('/Vapp5/Accueil.html');
}

exports.displayLoginPage = function(req, res) {
  try{
    var page = req.params.page;
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile('./View/login.html', function(err, html){
      if(err){
        throw err;
      }
      res.write(html);
      res.end();
    })}
    catch(err){
      res.send(err);
    }
  }

  exports.favicon = function(req, res){
    try{
      res.writeHead(200, {"Content-Type": "image/png"});
      fs.readFile('./images/favicon.png', function(err, image){
        if(err){
          throw err;
        }
        res.write(image);
        res.end();
      })
    } catch(err) {
      res.send(err)
    }
  }

  exports.createUserPage = function(req, res) {
    try{
      var page = req.params.page;
      res.writeHead(200, {"Content-Type": "text/html"});
      fs.readFile('./View/CreateUser.html', function(err, html){
        if(err){
          throw err;
        }
        res.write(html);
        res.end();
      })
    } catch(err){
      res.send(err)
    }
  }

  exports.get3DScript = function(req, res) {
    try{
      var script = req.params.script;
      res.writeHead(200, {"Content-Type": "text/plain"});
      fs.readFile('./js/'+script, function(err, js){
        if(err){
          throw err;
        }
        res.write(js);
        res.end();
      })
    } catch(err){
      res.send(err)
    }
  }

  exports.getFayeComponentOne = function(req, res){
    try{
      var script = req.params.script;
      var path1 = req.params.pathOne;
      var path2 = req.params.pathTwo;
      console.log(script)
      res.writeHead(200, {"Content-Type": "text/plain"});
      fs.readFile('./faye/components/'+path1+'/'+path2+'/'+script, function(err, js){
        if(err){
          throw err;
        }
        res.write(js);
        res.end();
      })
    } catch(err){
      res.send(err)
    }
  }

  exports.getFayeComponentTwo = function(req, res){
    try{
      var script = req.params.script;
      var path1 = req.params.pathOne;
      console.log(script)
      res.writeHead(200, {"Content-Type": "text/plain"});
      fs.readFile('./faye/components/'+path1+'/'+script, function(err, js){
        if(err){
          throw err;
        }
        res.write(js);
        res.end();
      })
    } catch(err){
      res.send(err)
    }
  }

  exports.getFaye = function(req, res){
    try{
      var script = req.params.script;
      res.writeHead(200, {"Content-Type": "text/plain"});
      fs.readFile('./faye/faye/browser/'+script, function(err, js){
        if(err){
          throw err;
        }
        res.write(js);
        res.end();
      })
    } catch(err){
      res.send(err)
    }
  }

  exports.getController = function(req, res) {
    try{
      var script = req.params.script;
      res.writeHead(200, {"Content-Type": "text/plain"});
      if (script == 'Project.js'){
        fs.readFile('./Server/app/'+script, function(err, js){
          if(err){
            throw err;
          }
          res.write(js);
          res.end();
        })
      }
      else {
        fs.readFile('./Server/app/controller/'+script, function(err, js){
          if(err){
            throw err;
          }
          res.write(js);
          res.end();
        })
      }
    } catch(err){
      res.send(err)
    }
  }

  exports.displayImages = function(req, res) {
    try{
      var image = req.params.image;
      res.writeHead(200, {"Content-Type": "image/jpg"});
      fs.readFile('./images/'+image, function(err, image){
        if(err){
          throw err;
        }
        res.write(image);
        res.end();
      })
    } catch(err){
      res.send(err)
    }
  } 

  exports.getCssFiles = function(req, res){
    var file = req.params.file;
    res.writeHead(200, {"Content-Type": "text/css"});
    fs.readFile('./View/css/'+file, function(err, css){
      if(err){  
       throw err;
     }
     res.write(css);
     res.end();   
   })
  }

  exports.getUserCompany = function(req, res){
    try{
      var user = req.user.id;
      var query = "SELECT company from users U join customer C on U.customer=C.customer_id where user_id="+user;
      odbcConnector(query, function(result){
        console.log(result);
        res.send(result);
      });
    } catch(err){
      console.log(err);
    }
  }

  exports.getUserInformation = function(req, res){
    try{
      var user = req.user.id;
      var query = "SELECT login from users U where user_id="+user;
      odbcConnector(query, function(result){
        console.log(result);
        res.send(result);
      });
    } catch(err){
      console.log(err);
    }
  }  

  exports.getCompanyInformation = function(req, res){
    try{
      var user = req.user.id;
      var query = "SELECT contact,email,phone_number from users U join customer C on U.customer=C.customer_id where user_id="+user;
      odbcConnector(query, function(result){
        console.log(result);
        res.send(result);
      });
    } catch(err){
      console.log(err);
    } 
  }   

  /*exports.updateUser =function(req, res){
    var company = req.user.customer;
    var user = req.body;
    var query = 'UPDATE customer SET company ="'+user.company+'",email="'+user.email+'",contact="'+user.contact+'",phone_number="'+user.phone_number+'" WHERE customer_id = ' + company;
    odbcConnector(query,function(result){
      if(user.password==undefined){
        var loginquery = 'UPDATE users SET login = "'+user.email+'",password = "'+user.password+'" WHERE customer = '+ company
      } else {
        var loginquery = 'UPDATE users SET login = "'+user.login+'" WHERE customer = '+ company
      }
      odbcConnector(loginquery, function(){
        res.send('user updated')
      })
    })
  }*/

  exports.getAllMO = function(req, res){
    try{
      var query = 'select numofs, C.datdem, qtepre, A.libar1 from ofsgen O join ofscde OC on O.ideofs=OC.ideofs join cdelig CL on OC.idelig=CL.idelig join cdeent C on CL.idedoc=C.idedoc join artgen A on O.ideart=A.ideart where C.datdem is not null order by numofs desc'
      console.log(query)
      lxpConnector(query, function(result){
        res.send(result);
      })
    } catch(err){
      res.send(err)
    }
  }

  exports.getFileAdress = function(req, res){
    try{
      var document_name = req.params.document_name;
      var query = 'select id_dcme from documents where document_name =' +document_name
      odbcConnector(query, function(result){
        res.send(result);
      })
    } catch (err){
      res.send(err)
    }
  }

// select OG.numofs, O.qtepre, min(O.qtefai) as qtefai, S.datdebpre, S.datdebree, SS.datfinpre, SS.datfinree from ofsope O join (  select ideope, datdebpre, datdebree from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where codope=(select min(codope) from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where numofs like '"+tab[0].of+"' group by OP.ideofs) and numofs like '"+tab[0].of+"') as S on O.ideope=S.ideope join (select OP.ideofs, datfinpre, datfinree from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where codope=(select max(codope) from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where numofs like '"+tab[0].of+"' group by OP.ideofs) and numofs like '"+tab[0].of+"') as SS on O.ideofs=SS.ideofs join ofsgen OG on O.ideofs=OG.ideofs where OG.numofs like '"+tab[0].of+"'  group by OG.numofs, O.qtepre, S.datdebpre, S.datdebree, SS.datfinpre, SS.datfinree;

exports.startCPSControl = function(req, res){
  // pub/sub
  var mo = req.params.mo;
  try{
    CPSControleFunction(mo)
    res.send({message:'control begin'})
  } catch(err){
    console.log(err)
  }
}

exports.stopCPSControl = function(req, res){
  try{
    clearInterval(CPScontrole);
    res.send({message:'control stopped'});
  } catch(err){
    console.log(err)
    res.send(err);
  }
}

function CPSControleFunction(mo){
  try{
      var controlSize = 0;
      var min = 0;
      var max = 6;
      var queryControl = "select qtepre from ofsgen where numofs='"+mo+"'"
      lxpConnector(queryControl, function(resultControl){
          controlSize = Math.round(Number(resultControl[0].qtepre)/10);
          console.log('size total: '+controlSize)
          // beginning of the control
          CPScontrole = setInterval(function(){
            // get the current number of piece
            var queryCurSize = "select count(mo) as size from control where mo = '"+mo+"'"
            odbcConnector(queryCurSize, function(resultCurSize){
              console.log(resultCurSize)
              // if the number of control is equal of the control size we stop the control
              if(Number(resultCurSize[0].size)>=controlSize){
                clearInterval(CPScontrole);
              } else {
                var nbBlob = Math.floor(Math.random() * Math.floor(8));
                var query = 'INSERT INTO control(min, max, control, mo) VALUES ('+min+','+max+','+nbBlob+','+mo+');';
                console.log(query);
                odbcConnector(query, function(result){
                  if(nbBlob>max){
                    var ok = 'NOK'
                  } else {
                    var ok = 'OK'
                  }
                  bayeux.getClient().publish('/control', {measure:'Apperance', min:min, max:max, control:nbBlob, status:ok});
                  console.log(nbBlob);
                })
              }
            })
          }, 4000);
        })
  } catch(err){
    console.log(err)
  }
}

/* nb blob of corecontrol.py
  their will be 2 tables: 1 for current control and another for previous control
  At the end of a control we clean the current control table and put it on the previous control table
  the attributes will be: id, cps, mo, ope, nbblob1, nbblob2, mini, max, moy 
  */

  exports.configureCamera = function(req, res){
    try{
      var body = req.body;
    //{"ip":"192.168.0.100","port":"5002"}/{"ip":"192.168.0.101","port":"5003"}
    var camera1 = {ip:body.ip1, port:body.port1};
    var camera2 = {ip:body.ip2, port:body.port2};
    /*const id = {
        host : cps_url,
        path: '/configureCamera/'+camera1+'/'+camera2,
        port: cps_port,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };  

      const idCallback = function(response) {
        let str = '';
        response.on('data', function(chunk) {
          str += chunk;
        });

        response.on('end', function(){
          console.log(str);
          var result = JSON.parse(str);
          callback(result.request);
        })
      }

      const idReq = http.request(id, idCallback);
      idReq.end();*/
      console.log(cps_url+':'+cps_port+'/configureCamera/'+camera1+'/'+camera2);
    } catch(err){
      res.send(err)
    }
  }

  exports.configureCylindre = function(req, res){
    try{
      var body = req.body;
      //{"ip":"192.168.0.102","port":"5003","time":"200"}/{"ip":"192.168.0.103","port":"5002","time":"200"}
      var verrin1 = {ip:body.ip1, port:body.port1, time:body.time1};
      var verrin2 = {ip:body.ip2, port:body.port2, time:body.time2};

      /*const id = {
        host : cps_url,
        path: '/configureActuator/'+verrin1+'/'+verrin2,
        port: cps_port,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };  

      const idCallback = function(response) {
        let str = '';
        response.on('data', function(chunk) {
          str += chunk;
        });

        response.on('end', function(){
          console.log(str);
          var result = JSON.parse(str);
          callback(result.request);
        })
      }

      const idReq = http.request(id, idCallback);
      idReq.end();*/
      console.log(cps_url+':'+cps_port+'/configureActuator/'+verrin1+'/'+verrin2);
    } catch(err){
      res.send(err);
    }
  }

  exports.getFileAdress = function(req, res){
    try{
      var document_name = req.params.document_name;
      var query = 'select id_dcme from documents where document_name =' +document_name
      odbcConnector(query, function(result){
        res.send(result);
      })
    } catch (err){
      res.send(err)
    }
  }

  exports.getProductionTracking = function(req, res){
    var mo = req.params.mo;
    var queryMO = "select * from mo where mo='"+mo+"'";
    odbcConnector(queryMO, function(moResult){
      var clientProdQuery = "select O.numofs, A.libar1, CE.codcpt, min(OP.datdebpre) as datdebpre, CE.datdem, O.qtepre from ofscde OC join cdelig CL on OC.idelig=CL.idelig join cdeent CE on CL.idedoc=CE.idedoc join ofsgen O on O.ideofs=OC.ideofs join artgen A on O.ideart=A.ideart join ofsope OP on O.ideofs=OP.ideofs where numofs like '"+mo+"' group by O.numofs, A.libar1, CE.codcpt, CE.datdem, O.qtepre;"
      lxpConnector(clientProdQuery, function(result){
        if(moResult.length>0){
          var queryMO = "INSERT INTO mo (mo, client, product, date_debut_prevu, date_demandee, qte_prevu, status, quantite_produit) VALUES ('"+mo+"','"+result[0].libar1+"','"+result[0].codcpt+"', '"+result[0].datdebpre+"', '"+result[0].datdem+"', "+result[0].qtpre+", 'Planned', 0)"
        } else {
          var queryMO = "select * from mo"
        }
        odbcConnector(queryMO, function(resultMO){         
          var query = "select OG.numofs, O.qtepre, min(O.qtefai) as qtefai, S.datdebpre, S.datdebree, SS.datfinpre, SS.datfinree from ofsope O join (  select ideope, datdebpre, datdebree from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where codope=(select min(codope) from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where numofs like '"+mo+"' group by OP.ideofs) and numofs like '"+mo+"') as S on O.ideope=S.ideope join (select OP.ideofs, datfinpre, datfinree from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where codope=(select max(codope) from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where numofs like '"+mo+"' group by OP.ideofs) and numofs like '"+mo+"') as SS on O.ideofs=SS.ideofs join ofsgen OG on O.ideofs=OG.ideofs where OG.numofs like '"+mo+"'  group by OG.numofs, O.qtepre, S.datdebpre, S.datdebree, SS.datfinpre, SS.datfinree;"
          lxpConnector(query, function(globalResult){
            console.log(globalResult);
            var quantityDayQuery = "select sum(qtefai) as qtefai, datfinree from ofsgen O join ofsope OP on O.ideofs=OP.ideofs where numofs like '"+mo+"' group by datfinree order by datfinree"
            lxpConnector(quantityDayQuery, function(QuantityDayResult){
              console.log(QuantityDayResult);
              var objectiveQuantityQuery = "select sum(OP.qtepre) as qtepre from ofsgen O join ofsope OP on O.ideofs=OP.ideofs where numofs like '"+mo+"';"
              lxpConnector(objectiveQuantityQuery, function(ObjectiveResult){
                console.log(ObjectiveResult);
                var targetQuantityQuery = "select sum(OP.qtepre) as qtepre, datfinpre from ofsgen O join ofsope OP on O.ideofs=OP.ideofs where numofs like '"+mo+"' group by datfinpre order by datfinpre;"
                lxpConnector(targetQuantityQuery, function(targetResult){
                  console.log(targetResult);
                  var issueQuery = "select * from issue where mo='"+mo+"'";
                  odbcConnector(issueQuery, function(issueResult){
                    var cpsQuery="select * from control where mo='"+mo+"'"
                    odbcConnector(cpsQuery, function(cpsResult){
                      var finalJson = {globalInformation:[globalResult], dailyQuantity:[QuantityDayResult], finalQuantity:[ObjectiveResult], dailyTargetQuantity:[targetResult], issue:[issueResult],cps:[cpsResult]};
                      res.send(finalJson);
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  }

  exports.getOperations = function(req,res){
    var mo = req.params.mo;
    var query = "SELECT OP.codope, OP.libope, OP.datdebree, OP.datfinree, OP.qtefai FROM ofsope OP JOIN ofsgen O ON O.ideofs=OP.ideofs WHERE O.numofs="+mo;
    lxpConnector(query, function(result){
      res.send(result);
    })    
  }

  exports.getWatchList = function(req, res){
    var ope = req.params.ope;
    var mo = req.params.mo;
    var query = "select distinct O.numofs, A.libar1, datdebpre,min(OP.datdebree) as datdebree, datfinpre, max(OP.datfinree) as datfinree, OP.qtepre, OP.qtefai     from ofsope OP   join ofsgen O on OP.ideofs=O.ideofs left join ofscom OC on OP.ideope=OC.ideope left join ofsres R on OP.ideope=R.ideope join artgen A on O.ideart=A.ideart where datdebpre > (select max(OP.datfinree) from ofsope OP join ofsgen O on OP.ideofs=O.ideofs where O.numofs like '"+mo+"') and (R.ideres in (select ideres from ofsope OP join ofsgen O on OP.ideofs=O.ideofs left join ofsres R on OP.ideope=R.ideope where OP.codope like '"+ope+"') or OC.ideart in (select distinct OC.ideart from ofsope OP join ofsgen O on OP.ideofs=O.ideofs left join ofscom OC on OP.ideope=OC.ideope where OP.codope like '"+ope+"')) group by O.numofs, datdebpre, R.ideres, OC.ideart, A.libar1, datfinpre, OP.qtepre, OP.qtefai having min(OP.datdebree) is null order by datdebpre;"
    lxpConnector(query, function(result){
      res.send(result);
    })
  }

  exports.newIssue = function(req, res){
    var body = req.body;
    var mo = req.params.mo;
    var ope = req.params.ope;
    for(i=0;i<body.occurence;i++){
      done=false
      var query = "INSERT INTO issue (type, description, occurence, mo, ope) VALUES ('"+body.type+"','"+body.description+"','"+body.occurence+"','"+mo+"', '"+ope+"')";
      odbcConnector(query, function(result){
        done=true
      })
      require('deasync').loopWhile(function(){return !done;});
    }
    res.send({message:'issue added'});
  }

  exports.getProductSequence = function(req, res){
    try{
      var delquery = 'delete from product_sequence'
      odbcConnector(delquery, function(){
        var mo = req.params.mo;
        var query = 'select * from product_sequence where of="'+mo+'"'
        odbcConnector(query, function(result){
          if(result.length==0){
            getFinalProduct(mo, function(cb){
              setProductionSequence(function(){
                var groupQuery = 'select groupe from product_sequence where of="'+mo+'"'
                odbcConnector(groupQuery, function(groupResult){
                  getJSONTree(groupResult[0].groupe, function(jsonTree){
                    console.log(jsonTree);
                    res.send(jsonTree);
                  })
                })
              })
            })
          } else {
            var groupQuery = 'select groupe from product_sequence where of="'+mo+'"'
            odbcConnector(groupQuery, function(groupResult){
              getJSONTree(groupResult[0].groupe, function(jsonTree){
                console.log(jsonTree);
                res.send(jsonTree);
              })
            })
          }
        })
      })
    } catch(err){
      console.log(err);
      res.send(err)
    }
  }

  function getFinalProduct(mo, callback){
    var tab = [];
    var query = "select distinct C.idelig, C.datdem, A.ideart, A.codart, A.libar1, CE.refcde, CE.codcpt , CE.idedoc, O.ideofs, O.numofs, O.datcre, O.qtepre, OS.idemvt as pere"
    query+=" from artgen A join ofsgen O on A.ideart=O.ideart left join cdelig C on A.ideart=C.ideart left join ofssof OS on O.ideofs=OS.ideofs left join cdalig CA on CA.ideart=A.ideart left join cdaent CE on CA.idedoc=CE.idedoc"
    query+=" where O.numofs like '"+mo+"'"
    console.log(query)
    lxpConnector(query, function(result){
      //console.log(result)
      var query2 = "select C.idelig, C.datdem, A.ideart, A.codart, A.libar1, CE.refcde, CE.codcpt , CE.idedoc, O.ideofs, O.numofs, O.datcre, O.qtepre, OS.idemvt as pere"
      query2+=" from artgen A join ofsgen O on A.ideart=O.ideart left join cdelig C on A.ideart=C.ideart left join ofssof OS on O.ideofs=OS.ideofs left join cdalig CA on CA.ideart=A.ideart left join cdaent CE on CA.idedoc=CE.idedoc"
      lxpConnector(query2, function(globalResult){
        for(i=0; i<result.length; i++){
          var j=0;
          var pere=result[i].pere;
          var product = result[i].ideart;
          var mo=result[i].ideofs;
          var date = result[i].datdem;
          var quantity = result[i].qtepre;
          var idcmde = result[i].idedoc;
          if(pere!=null){
            //console.log(pere)
            while(j<globalResult.length){
              if(pere==globalResult[j].ideofs){
                //console.log(globalResult[j].ideart)
                product = globalResult[j].ideart
                mo=globalResult[j].ideofs;
                date=globalResult[j].datdem;
                quantity=globalResult[j].qtepre;
                if(globalResult[j].pere==null){
                  break;
                } else {
                  pere = globalResult[j].pere;
                  j=-1;
                }
              }
              j++;
            }
            tab.push([product, dateformat(date,'isoDate'), quantity, mo, 'APR', idcmde]);
          } else {
            tab.push([product, dateformat(date,'isoDate'), quantity, mo, 'APR', idcmde]);
          }
        }
        finalProduct.push(tab);
        console.log(finalProduct);
        callback();
      })
    })
  }

  function setProductionSequence(callback){
    var res=[];
    for(i=0;i<finalProduct.length;i++){
      if(finalProduct[i].length>0){
        for(j=0; j<finalProduct[i].length;j++){
          done=false;
          //console.log(finalProduct[i][j]);
          schedulerConnector(finalProduct[i][j][0],finalProduct[i][j][1],finalProduct[i][j][2],finalProduct[i][j][3],finalProduct[i][j][4], function(result){
            res.push(result);
            done=true;
          })
          require('deasync').loopWhile(function(){console.log(done);return !done;});
        }
      }
    }
    console.log(res)
    for(k=0; k<res.length; k++){
      var doneProduct = false;
      var transfert = 0;
      seller = res[k].manufacturer
      var query = 'SELECT max(groupe) as max FROM product_sequence;'
      odbcConnector(query, function(resultMax){
        var groupe = resultMax[0].max+1;
        setScheduleLineInDatabase(res[k],null,groupe, function(){
          doneProduct = true;
        })
      })
      require('deasync').loopWhile(function(){return !doneProduct;});
    }
    callback();
  }

  function setScheduleLineInDatabase(line, pere, groupe,callback){
    console.log('line')
    console.log(line)
    var done = false;
    var query = 'INSERT INTO product_sequence(product_id, product, manufacturer, begin_date, end_date, quantity, `of`, delivery_date, pere, groupe) VALUES '
    query += '('+line.id+', "'+line.product+'","'+line.manufacturer+'","'+line.beginDate+'","'+line.endDate+'",'+line.quantity+',"'+line.of+'","'+line.deliveryDate+'",'+pere+','+groupe+')'
    odbcConnector(query, function(result){
      var query2 = 'SELECT max(id) as id FROM product_sequence'
      odbcConnector(query2, function(resultId){
        if(line['subProduct'].length > 0){
          for(i=0;i<line['subProduct'].length;i++){
            done = false;
            setScheduleLineInDatabase(line['subProduct'][i],resultId[0].id,groupe, function(time){
              done = true;
            });
            require('deasync').loopWhile(function(){return !done;});
          }
        }
        callback();
      })
    })
  }

  function getJSONTree (groupe, callback){
    var query = 'select * from product_sequence where groupe = '+groupe+' order by pere';
    odbcConnector(query, function(tab){
      var querylxp ="select O.qtepre, min(O.qtefai) as qtefai, S.datdebpre, S.datdebree, SS.datfinpre, SS.datfinree from ofsope O join (  select ideope, datdebpre, datdebree from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where codope=(select min(codope) from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where numofs like '"+tab[0].of+"' group by OP.ideofs) and numofs like '"+tab[0].of+"') as S on O.ideope=S.ideope join (select OP.ideofs, datfinpre, datfinree from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where codope=(select max(codope) from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where numofs like '"+tab[0].of+"' group by OP.ideofs) and numofs like '"+tab[0].of+"') as SS on O.ideofs=SS.ideofs join ofsgen OG on O.ideofs=OG.ideofs where OG.numofs like '"+tab[0].of+"'  group by O.qtepre, S.datdebpre, S.datdebree, SS.datfinpre, SS.datfinree;"
      lxpConnector(querylxp, function(resultAPR){
        if(tab[0].manufacturer=='APR'){
          var json = {prod:tab[0].id,HTMLclass: "product-bot",text:{name:tab[0].product, numofs:tab[0].of, datdebpre:'Beg:'+dateformat(new Date(resultAPR[0].datdebpre),"dd/mm/yyyy"),datdebree:'Real:'+dateformat(new Date(resultAPR[0].datdebree),"dd/mm/yyyy"), datfinpre:'End:'+dateformat(new Date(resultAPR[0].datfinpre),"dd/mm/yyyy"), datfinree:'Real:'+dateformat(new Date(resultAPR[0].datfinree),"dd/mm/yyyy"), qty:'Quantity:'+resultAPR[0].qtepre+'/'+resultAPR[0].qtefai}, children:[]};
        } else {
          var json = {prod:tab[0].id,HTMLclass: "product-bot",text:{name:tab[0].product, numofs:tab[0].of, datdebpre:'Beg:N/A',datdebree:'Real:'+ tab[0].begin_date, datfinpre:'End:N/A', datfinree:'Real:'+tab[0].end_date, qty:'Quantity:'+tab[0].quantity}, children:[]}
        }
        curpere = tab[0].id;
        var curjson=json;
        var done = false;
        for(i=1;i<tab.length;i++){
          done = false;
          var querylxp ="select O.qtepre, min(O.qtefai) as qtefai, S.datdebpre, S.datdebree, SS.datfinpre, SS.datfinree from ofsope O join (  select ideope, datdebpre, datdebree from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where codope=(select min(codope) from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where numofs like '"+tab[i].of+"' group by OP.ideofs) and numofs like '"+tab[i].of+"') as S on O.ideope=S.ideope join (select OP.ideofs, datfinpre, datfinree from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where codope=(select max(codope) from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where numofs like '"+tab[i].of+"' group by OP.ideofs) and numofs like '"+tab[i].of+"') as SS on O.ideofs=SS.ideofs join ofsgen OG on O.ideofs=OG.ideofs where OG.numofs like '"+tab[i].of+"'  group by O.qtepre, S.datdebpre, S.datdebree, SS.datfinpre, SS.datfinree;"
          lxpConnector(querylxp, function(result){
            if(tab[i].pere==curpere){
              if(tab[i].manufacturer=='APR'){
                curjson['children'].push({prod:tab[i].id,HTMLclass: "product-bot",text:{name:tab[i].product, numofs:tab[i].of, datdebpre:'Beg:'+dateformat(new Date(result[0].datdebpre),"dd/mm/yyyy"),datdebree:'Real:'+dateformat(new Date(result[0].datdebree),"dd/mm/yyyy"), datfinpre:'End:'+dateformat(new Date(result[0].datfinpre),"dd/mm/yyyy"), datfinree:'Real:'+dateformat(new Date(result[0].datfinree),"dd/mm/yyyy"), qty:'Quantity:'+result[0].qtepre+'/'+result[0].qtefai}, children:[]})
                done = true
              } else {
                curjson['children'].push({prod:tab[i].id,HTMLclass: "product-bot",text:{name:tab[i].product, numofs:tab[i].of, datdebpre:'Beg:N/A',datdebree:'Real:'+tab[i].begin_date, datfinpre:'End:N/A', datfinree:'Real:'+tab[i].end_date, qty:'Quantity:'+tab[i].quantity}, children:[]})
                done = true
              }
            } else {
              curpere = tab[i].pere
              for(j=0;j<curjson['children'].length;j++){
                if(curjson['children'][j].prod==curpere){
                  curjson = curjson['children'][j];
                  if(tab[i].manufacturer=='APR'){
                    curjson['children'].push({prod:tab[i].id,HTMLclass: "product-bot",text:{name:tab[i].product, numofs:tab[i].of, datdebpre:'Beg:'+result[0].datdebpre,datdebree:'Real:'+result[0].datdebree, datfinpre:'End:'+result[0].datfinpre, datfinree:'Real:'+result[0].datfinree, qty:'Quantity:'+result[0].qtepre+'/'+result[0].qtefai}, children:[]})
                    done = true;
                  } else {
                    curjson['children'].push({prod:tab[i].id,HTMLclass: "product-bot",text:{name:tab[i].product, numofs:tab[i].of, datdebpre:'Beg:N/A',datdebree:'Real:'+tab[i].begin_date, datfinpre:'End:N/A', datfinree:'Real:'+tab[i].end_date, qty:'Quantity:'+tab[i].quantity}, children:[]})
                    done = true;
                  }
                }
              }
            }
          })
          require('deasync').loopWhile(function(){return !done;});
        }
        console.log(JSON.stringify(json))
        //var result = '{"chart": {container: "#example-graph",levelSeparation: 45,rootOrientation: "WEST",nodeAlign: "BOTTOM",connectors: {type: "step",style: { "stroke-width": 2}},node: {HTMLclass: "big-commpany"},callback: {onClick: function (nodeId, node, event) {ctrl.selectEvent(nodeId, node, event);}.bind(this),onTreeLoaded: function () {console.log("Graph loaded!!");}}},"nodeStructure": '+JSON.stringify(json)+'}';
        callback(json)
      })
})
}

function odbcConnector(request, callback){
  try{
    const id = {
      host : odbc_url,
      path: '/odbcvApp5/v1/api/odbcModels/requestdb?request='+escape(request),
      port: odbc_port,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'rejectUnauthorized':false
      }
    };  

    const idCallback = function(response) {
      let str = '';
      response.on('data', function(chunk) {
        str += chunk;
      });

      response.on('end', function(){
        var result = JSON.parse(str);
        callback(result.request);
      })
    }

    const idReq = https.request(id, idCallback);
    idReq.end();
  } catch(err){
    res.send(err)
  }
}

function lxpConnector(request, callback){
  try{
    const id = {
      host : lxp_url,
      path: '/lxpConnector/v1/api/lxpModels/getData?query='+escape(request),
      port: lxp_port,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };  

    const idCallback = function(response) {
      let str = '';
      response.on('data', function(chunk) {
        str += chunk;
      });

      response.on('end', function(){
        //console.log(str);
        var result = JSON.parse(str);
        //console.log(result)
        callback(result.data);
      })
    }

    const idReq = https.request(id, idCallback);
    idReq.end();
  } catch(err){
    console.log(err)
  }
}

function schedulerConnector(art, datedem, qteDem, mo, company, callback){
  const id = {
    host : scheduler_url,
    path: '/scheduler_connector/v1/api/schedulerModels/getProductPlanning?art='+art+'&datedem='+datedem+'&qteDem='+qteDem+'&mo='+mo+'&company='+company,
    port: scheduler_port,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };  

  const idSchedulerCallback = function(response) {
    let str = '';
    response.on('data', function(chunk) {
      str += chunk;
    });

    response.on('end', function(){
      var result = JSON.parse(str)
      callback(result.schema);
    })
  }

  const idReq = https.request(id, idSchedulerCallback);
  idReq.end();
}

exports.getTreantFile = function(req, res){
  var page = req.params.page;
  var path = '';
  switch(page){
    case 'app.js':
    path = page;
    res.writeHead(200, {"Content-Type": "text/plain"});
    break;
    case 'Treant.css':
    path = 'treant-js/'+page;
    res.writeHead(200, {"Content-Type": "text/css"});
    break;
    case 'conn.css':
    path = page;
    res.writeHead(200, {"Content-Type": "text/css"});
    break;
    case 'controller.js':
    path = page;
    res.writeHead(200, {"Content-Type": "text/plain"});
    break;
    case 'jquery.min.js':
    path = 'treant-js/vendor/'+page;
    res.writeHead(200, {"Content-Type": "text/plain"});
    break;
    case 'jquery.easing.js':
    path = 'treant-js/vendor/'+page;
    res.writeHead(200, {"Content-Type": "text/plain"});
    break;
    case 'raphael.js':
    path = 'treant-js/vendor/'+page;
    res.writeHead(200, {"Content-Type": "text/plain"});
    break;
    case 'Treant.js':
    path = 'treant-js/'+page;
    res.writeHead(200, {"Content-Type": "text/plain"});
    break;
  }
  fs.readFile('./Server/app/tree/'+path, function(err, js){
    if(err){
      throw err;
    }
    res.write(js);
    res.end();
  })
}

exports.getTreantVendorFile = function(req, res){
  var page = req.params.page;
  res.writeHead(200, {"Content-Type": "text/plain"});
  fs.readFile('./Server/app/treant-js-master/vendor/'+page, function(err, js){
    if(err){
      throw err;
    }
    res.write(js);
    res.end();
  })
}

exports.getTreantCssFile = function(req, res){
  var page = req.params.page;
  res.writeHead(200, {"Content-Type": "text/css"});
  fs.readFile('./Server/app/treant-js-master/'+page, function(err, js){
    if(err){
      throw err;
    }
    res.write(js);
    res.end();
  })
}