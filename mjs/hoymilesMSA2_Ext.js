let state = { lastpower: 0, einspeisen_minute: 0 };

let app = {};

app.everyMinute = function (e) {
  
    let now = new Date();
    print(now.getHours() )
  if (e) {
    state.lastpower = e.total_act_power | 0;
  } else {
    state.lastpower = 0;
    state.einspeisen_minute = 0;
  }

  if (state.lastpower < -50) {
    state.einspeisen_minute++;
  }

  if (state.lastpower >= -10) {
    state.einspeisen_minute = 0;
  }

  app.applyLevel(state.einspeisen_minute);
  print(JSON.stringify(state));
};

app.applyLevel = function (level) {
    let now = new Date();
  if (level > 5 && now.getHours() < 17) { 
    Shelly.call("http.get", {
      url: "http://192.168.178.243/relay/0?turn=on"
    });
  }
};

print(JSON.stringify(state))

app.preEveryMinute = function () {
  Shelly.call("em.getstatus", { id: 0 }, app.everyMinute);
};

Timer.set(10 * 1000, true, app.preEveryMinute);
app.preEveryMinute();
