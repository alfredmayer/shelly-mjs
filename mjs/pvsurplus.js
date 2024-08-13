let state = {lastpower:0,powerlevel:0}
let app = {}
app.everyMinute = function(e){
  if(e){
     state.lastpower=e.total_act_power|0;
  } else{
    state.lastpower=0;
    state.powerlevel =0;    
  }
  
  if(state.lastpower<-100){
    state.powerlevel++;    
  }
  if(state.lastpower>=0){
    state.powerlevel-=1;
  }
  state.powerlevel =Math.max(-1,state.powerlevel)
  state.powerlevel =Math.min(10,state.powerlevel)
  app.applyLevel(state.powerlevel)
  print( JSON.stringify(state))
};

app.applyLevel = function(level){
  app.steckdose1(level>=1?"on":'off')
  app.steckdose2(level>=2?"on":'off')
  app.auto1(level-2);
}

app.steckdose1 = function(on){
   Shelly.call("http.get",{url:"http://192.168.1.166/relay/0?turn="+on})
}
app.steckdose2 = function(on){
   Shelly.call("http.get",{url:"http://192.168.1.169/relay/0?turn="+on})
}
app.auto1 = function(ampere){
  let a1  = Math.max(Math.min(ampere*2,16),0);
  print("auto 1:http://192.168.0.75/api/set?amp=" +a1+  "")
  // Shelly.call("http.get",{url:"http://192.168.1.166/relay/0?turn="+on})
}

app.preEveryMinute = function(){Shelly.call("em.getstatus", {id:0},app.everyMinute);}
Timer.set(60*1000,true,app.preEveryMinute);
app.preEveryMinute();