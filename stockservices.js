
function dump(obj){
  Logger.log('--------------dump obj--------------------');
  _.each(obj,function(value, key){ 
    Logger.log(key + ":" + value);
    
  });
}


var requestHandler = {
  getstockinfo: ["checkGetInfoParam","getStockInfo"],
  gethistory: ["checkHistoryParam","getHistory"],
  //getchart: "getChart",
  //gettechchart: "getTechChart",
};

function produceOutput(request,output){
   return ContentService.createTextOutput(request.parameters.callback+"("+JSON.stringify(output)+");" ).setMimeType(ContentService.MimeType.JSON);
}

function doGet(request) {
  var func = request.parameters.func;
  var result;
  
  var handle = requestHandler[func];
  Logger.log('doGet args=' + request.parameters.func);
  if(handle){
    var args = this[handle[0]](request);
    if(args){
      result = this[handle[1]](args);
      result["status"] = "succ";
    }
    else
      result = {status:"invaild arguments"};
  }
  else{
    result = {status:"invaild function name"};
  }
  dump(result);
  
  var output = {result:result};
  return produceOutput(request,output);
}

function checkGetInfoParam(request){
  var endDate,interval,stockSymbol;
  if(request.parameters.stock)
    stockSymbol = request.parameters.stock;
  else
    stockSymbol="000001";
  return {stock:stockSymbol};
}

function getStockInfo(args){
  return FinanceApp.getStockInfo(args.stock);
}


function checkHistoryParam(request){
  var startDate=new Date((+request.parameters.c),(+request.parameters.a)-1,(+request.parameters.b));
  var endDate,interval,stockSymbol;
  if(request.parameters.d)
    endDate=new Date((+request.parameters.f),(+request.parameters.d)-1,(+request.parameters.e));
  else
    endDate = new Date();
  if( request.parameters.i)
    interval=request.parameters.i;
  else
    interval=1;
  if(request.parameters.stock)
    stockSymbol = request.parameters.stock;
  else
    stockSymbol="000001";
  return {stock:stockSymbol,start:startDate,end: endDate,interval:interval};
}

function getHistory(args){
  return FinanceApp.getHistoricalStockInfo(args.stock, args.start, args.end, args.interval);
}

function testGetInfo(stock) {
  var request={};
  request["parameters"]={func:"getstockinfo", stock:stock};
  doGet(request);
}

function testGetHistory(stock,a,b,c,d,e,f) {
  var request={};
  if(d)
    request["parameters"]={func:"gethistory", stock:stock,a:a,b:b,c:c,d:d,e:e,f:f};
  else
    request["parameters"]={func:"gethistory", stock:stock,a:a,b:b,c:c};
  doGet(request);
}

function testGetStockInfoSuit(){
  testGetInfo("002142");
  testGetInfo("000001");
  testGetInfo("600028");
  testGetInfo("600001");
 
}

function testGetHistorySuit(){
  
  testGetHistory("002142",9,1,2012,9,30,2012);
  testGetHistory("002142",9,1,2012);
  testGetHistory("000001",10,1,2012,10,30,2012);
  testGetHistory("000001",9,1,2012);
  testGetHistory("600028",9,1,2012,9,30,2012);
}

function testAllSuit(){
  testGetStockInfoSuit();
  testGetHistorySuit();
}