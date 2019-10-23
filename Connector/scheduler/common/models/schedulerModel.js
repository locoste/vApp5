const sql = require('mssql');
let mysql = require('mysql');
var dateformat = require('dateformat');
let userPrompts = require("../../userPrompts");


const default_user = userPrompts.userAPR;
const default_password = userPrompts.passwordAPR;
const default_server = userPrompts.hostAPR;
const default_database = userPrompts.databaseSchemaAPR;

var query = "select CC.refcde as cdecli, C.idelig, C.datdem, A.ideart, A.codart, A.libar1, CE.refcde, CE.codcpt ,O.ideofs, O.numofs, min(OP.datdebpre) as datdeb, max(OP.datfinpre) as datfin, O.qtepre, OS.idemvt as pere"
query+=" from artgen A join ofsgen O on A.ideart=O.ideart left join cdelig C on A.ideart=C.ideart left join ofssof OS on O.ideofs=OS.ideofs left join cdalig CA on CA.ideart=A.ideart left join cdaent CE on CA.idedoc=CE.idedoc join ofsope OP on O.ideofs=OP.ideofs left join cdeent CC on C.idedoc=CC.idedoc"
query+=" group by CC.refcde, C.idelig, C.datdem, A.ideart, A.codart, A.libar1, CE.refcde, CE.codcpt ,O.ideofs, O.numofs, O.qtepre, OS.idemvt "

var queryTardy = "select * from tardydata;"

var querypurachase = "select * from tardypurchase;"

var res="";
var con;

var config = 
{
 user: default_user, // update me
 password: default_password, // update me
 server: default_server, // update me
 database:default_database
};

if (con == undefined){
  con = mysql.createConnection({
    host: userPrompts.hostTARDY,
    user: userPrompts.userTARDY,
    password: userPrompts.passwordTARDY,
    database: userPrompts.databaseSchemaTARDY
  });
}


function getDataAPR(request, callback){
  try {
    console.log(request)
    var pool = new sql.ConnectionPool(config);
    pool.connect().then(result => {
     var aResult = pool.request().query(request);
     var res = Promise.resolve(aResult);
     res.then(function(data){callback(data.recordset)});

   });
  }
  catch (err){
    callback(returnData(err));
  }
}

function getDataTARDY(request, callback){
  try{
    console.log(request)
    con.query(request, function (err, result, moreResultSets) {
      if (err) 
      {
        console.log(err);
        result = err;
      }
      callback(result);
    });
  } catch(err){
    console.log(err)
  }
}

module.exports = function(schedulerModel)
{

  schedulerModel.getProductPlanning = function(art, datedem, qteDem, mo, company, callback)
  {
    var tabLink=[];
    var tabNode=[];
    var res;
    try {
      console.log('---------------------------------')
      console.log('art: '+art);
      console.log('datedem: '+datedem);
      console.log('qteDem: '+qteDem);
      console.log('mo: '+mo)
      getDataAPR(query, function(resultAPR){
        getDataTARDY(queryTardy, function(resultTardy){
          getDataTARDY(querypurachase, function(resultTardyPurchase){
            if(company=="APR"){
              for(i=0; i<resultAPR.length; i++){
                if(resultAPR[i].ideart==art && dateformat(resultAPR[i].datdem, 'isoDate')==datedem && resultAPR[i].qtepre==qteDem && resultAPR[i].ideofs==mo){
                  tabLink.push([art, mo, false, [], [], [resultAPR[i].ideart,resultAPR[i].libar1,resultAPR[i].datdeb,resultAPR[i].qtepre,resultAPR[i].numofs,resultAPR[i].datdem, "APR", resultAPR[i].datfin],"APR"]);
                  tabNode.push([art, [], [resultAPR[i].ideart,resultAPR[i].libar1,resultAPR[i].datdeb,resultAPR[i].qtepre,resultAPR[i].numofs,resultAPR[i].datdem, "APR", resultAPR[i].datfin]]);
                  getAllNodes(resultAPR, resultTardy, tabLink, resultTardyPurchase);
                  getNodeAdress(tabLink, tabNode);
                  generateJson(tabNode, function(response){
                    callback(null, response);
                  });
                  break;
                }
              }
              console.log('end')
            } else if(company=="TARDY"){
              console.log(resultTardy.length);
              for(i=0; i<resultTardy.length;i++){
                if(resultTardy[i].id_article==art && resultTardy[i].Date_dem==datedem && resultTardy[i].qte_prepare==qteDem && resultTardy[i].id_of==mo){
                  tabLink.push([art, mo, false, [], [], [resultTardy[i].id_article,resultTardy[i].lib_article,resultTardy[i].date_creation_of,resultTardy[i].qte_prepare,resultTardy[i].ref_of,resultTardy[i].Date_dem,"TARDY",resultTardy[i].Date_dem, resultTardy[i].ref_commande_du_client],"TARDY"]);
                  tabNode.push([art, [], [resultTardy[i].id_article,resultTardy[i].lib_article,resultTardy[i].date_creation_of,resultTardy[i].qte_prepare,resultTardy[i].ref_of,resultTardy[i].Date_dem,"TARDY",resultTardy[i].Date_dem, resultTardy[i].ref_commande_du_client]])
                  getAllNodes(resultAPR, resultTardy, tabLink, resultTardyPurchase);
                  getNodeAdress(tabLink, tabNode);
                  generateJson(tabNode, function(response){
                    callback(null, response);
                  });
                  break;
                }
              }
              console.log('end')
            }
          })
        })
      })
    } catch(err) {
      console.log(err)
    }
  }

  function getAllNodes(resultAPR, resultTARDY, tab, resultTardyPurchase){
    console.log('getAllNodes')
    var j=0;
    var mo;
    while(j<tab.length){
      if(tab[j][2]==false){
        mo=tab[j][1];
        if(tab[j][6]=='APR'){
      // check if there are some children in the parter company
      if(tab[j][5][2]!=null){
        for(k=0; k<resultTARDY.length; k++){
          if (resultTARDY[k].ref_commande_du_client==tab[j][5][2] && tab[j][3].includes(resultTARDY[k].of_pere) == false && resultTARDY[k].of_pere==resultTARDY[k].id_of){
            tab[j][3].push(resultTARDY[k].id_article)
            tab.push([resultTARDY[k].id_article, resultTARDY[k].id_of, false, [],[], [resultTARDY[k].id_article, resultTARDY[k].lib_article, resultTARDY[k].ref_commande, resultTARDY[k].date_creation_of, resultTARDY[k].qte_prepare, resultTARDY[k].ref_of, resultTARDY[k].Date_dem, "TARDY"], "TARDY"])
          }
        }
      }
      // check if there are some father of
      for(i=0; i<resultAPR.length; i++){
        if(resultAPR[i].pere==mo){
          tab[j][3].push(resultAPR[i].ideart);
          tab.push([resultAPR[i].ideart, resultAPR[i].ideofs, false, [], [], [resultAPR[i].ideart,resultAPR[i].libar1,resultAPR[i].refcde,resultAPR[i].datdeb,resultAPR[i].qtepre,resultAPR[i].numofs,resultAPR[i].datdem, "APR", resultAPR[i].datfin], "APR"])
        }
      }
      tab[j][2]=true;
    }

    else if (tab[j][6]=='TARDY'){
      if(j==0){
        for(z=0;z<resultTARDY.length;z++){
          if(resultTARDY[z].ref_of==tab[j][5][4]){
            for(y=0; y<resultTardyPurchase.length;y++){
              if(resultTARDY[z].Commande==resultTardyPurchase[y].ty && resultTardyPurchase[y].fournisseur=='APR'){
                console.log('numero de commande: '+resultTardyPurchase[y].numero_commande)
                for(k=0;k<resultAPR.length;k++){
                  if(resultAPR[k].cdecli==resultTardyPurchase[y].numero_commande && tab[j][3].includes(resultAPR[k].pere)==false && resultAPR[k].pere==null){
                    tab[j][3].push(resultAPR[k].ideart);
                    tab.push([resultAPR[k].ideart, resultAPR[k].ideofs, false, [], [], [resultAPR[k].ideart,resultAPR[k].libar1,resultAPR[k].refcde,resultAPR[k].datdeb,resultAPR[k].qtepre,resultAPR[k].numofs,resultAPR[k].datdem, "APR", resultAPR[k].datfin], "APR"])
                    break;
                  }
                }
                break;
              }
            }
          }
        }
      }
    
    for(h=0; h<resultTARDY.length; h++){
      if(resultTARDY[h].of_pere==mo && resultTARDY[h].id_of!=resultTARDY[h].of_pere){
        tab[j][3].push(resultTARDY[h].id_article);
        tab.push([resultTARDY[h].id_article, resultTARDY[h].id_of, false, [],[], [resultTARDY[h].id_article, resultTARDY[h].lib_article, resultTARDY[h].ref_commande, resultTARDY[h].date_creation_of, resultTARDY[h].qte_prepare, resultTARDY[h].ref_of, resultTARDY[h].Date_dem, "TARDY", resultTARDY[h].Date_dem], "TARDY"])
      }
    }
    tab[j][2]=true;
  }
}
j++;
}
}

function getNodeAdress(tabLink, tabNode){
  for(i=0; i<tabLink.length; i++){
    if(tabLink[i][3].length>0){
      for(j=0; j<tabNode.length; j++){
        if(tabLink[i][0]==tabNode[j][0]){
          for(k=0; k<tabLink[i][3].length; k++){
            var adress = tabNode[j][1].slice()
            adress.push(k)
            tabNode.push([tabLink[i][3][k], adress]);
          }
          break;
        }
      }
    }
  }
  for(m=1; m<tabNode.length; m++){
    for(l=0; l<tabLink.length; l++){
      if(tabLink[l][0]==tabNode[m][0]){
        tabNode[m].push(tabLink[l][5])
        break;
      }
    }
  }
}

function generateJson(tabNode, callback){
  var curRes;
  var json;
  for(i=0; i<tabNode.length; i++){
    switch(tabNode[i][1].length){
      case 0:
      json=JSON.parse('{"id":"'+tabNode[i][2][0]+'","product":"'+tabNode[i][2][1]+'","manufacturer":"'+tabNode[i][2][6]+'","beginDate":"'+tabNode[i][2][2]+'","endDate":"'+tabNode[i][2][7]+'","quantity":'+tabNode[i][2][3]+', "of":"'+tabNode[i][2][4]+'","deliveryDate":"'+tabNode[i][2][5]+'", "subProduct":[]}')
      break;
      case 1:
      var str = '{"id":"'+tabNode[i][2][0]+'","product":"'+tabNode[i][2][1]+'","manufacturer":"'+tabNode[i][2][7]+'","beginDate":"'+tabNode[i][2][3]+'","endDate":"'+tabNode[i][2][8]+'","quantity":'+tabNode[i][2][4]+', "of":"'+tabNode[i][2][5]+'","deliveryDate":"'+tabNode[i][2][6]+'", "subProduct":[]}'
      json['subProduct'].push(JSON.parse(str))
      curRes=json;
      break;
      default:
      curRes = json
      for(j=0; j<tabNode[i][1].length-1; j++){
        curRes = curRes['subProduct'][tabNode[i][1][j]];
      }
      curRes['subProduct'].push(JSON.parse('{"id":"'+tabNode[i][2][0]+'","product":"'+tabNode[i][2][1]+'","manufacturer":"'+tabNode[i][2][7]+'","beginDate":"'+tabNode[i][2][3]+'","endDate":"'+tabNode[i][2][8]+'","quantity":'+tabNode[i][2][4]+', "of":"'+tabNode[i][2][5]+'","deliveryDate":"'+tabNode[i][2][6]+'", "subProduct":[]}'))
    }
  }
  console.log(json)
  callback(json);
}

schedulerModel.remoteMethod('getProductPlanning',
  { isStatic: true,
    accepts: [{ arg: 'art',
    type: 'string',
    description: 'the product that we want the OF organisation',
    required: true,
    http: { source: 'query' } },
    { arg: 'datedem',
    type: 'string',
    description: 'the date when the product should be delivery',
    required: true,
    http: { source: 'query' } },
    { arg: 'qteDem',
    type: 'string',
    description: 'the quantity asked by the customer',
    required: true,
    http: { source: 'query' } },
    { arg: 'mo',
    type: 'string',
    description: 'the Manufacturing Order of the OF organisation',
    required: true,
    http: { source: 'query' } },
    { arg: 'company',
    type: 'string',
    description: 'the company that will dellivered the final product',
    required: true,
    http: { source: 'query' } }
    ],
    returns: {arg: 'schema', type: 'application/json'},
    http: { verb: 'get', path: '/getProductPlanning' },
    description: 'get the production sequence organisation with both ERP data' }
    );

}

// TODO: the developer will write here the private methods necessary for the connector