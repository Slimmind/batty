const doc = document;
const batty = doc.getElementById('batty');
const power = doc.getElementById('power');
const battyLevel = doc.getElementById('level');


navigator.getBattery().then(function (battery) {
  (function updateAllBatteryInfo() {
    updateChargeInfo();
    updateLevelInfo();
  })();

  battery.addEventListener('chargingchange', () => updateChargeInfo());

  function updateChargeInfo() {
    if (battery.charging) {
      battery.addEventListener('chargingtimechange', () => updateChargingInfo());
      updateChargingInfo();
      battery.removeEventListener('dischargingtimechange', updateDischargingInfo);
    } else {
      battery.addEventListener('dischargingtimechange', () => updateDischargingInfo());
      updateDischargingInfo();
      battery.removeEventListener('chargingtimechange', updateChargingInfo);
    }
  }
  // LEVEL
  battery.addEventListener('levelchange', () => updateLevelInfo());

  function updateLevelInfo() {
    let level = battery.level;
    let text = doc.createTextNode(`LEVEL: ${level * 100}%`);
    power.style.height = `${Math.floor(level * 260)}px`;
    battyLevel.innerHTML = `${Math.floor(level * 100)}%`;
    if (level < 0.7 && level > 0.4) {
      power.style.backgroundColor = 'gold'
    } else if (level < 0.4) {
      power.style.backgroundColor = 'darkred';
    }
  }
  // // CHARGING
  function updateChargingInfo() {
    // const chargingTime = doc.getElementById('chargingTime');
    // let time = battery.chargingTime;
    batty.classList.add('charging');
    // setTime(time, 'charging', chargingTime);
  }
  // // DISCHARGING
  function updateDischargingInfo() {
    // const disCharge = doc.getElementById('disCharge');
    // let time = battery.dischargingTime;
    batty.classList.remove('charging');
    // setTime(time, 'discharging', disCharge);
  }
  // // SET TIME 
  // function setTime(timeVal, title, elem) {
  //   let data = doc.createTextNode(timeVal);
  //   let dataWrap = doc.createElement('mark');
  //   dataWrap.appendChild(data);
  //   doc.querySelector('main').appendChild(dataWrap);
  //   if(timeVal < 60) {
  //     elem.innerHTML = `${title.toUpperCase()}: ${timeVal}s`;
  //   } else if(timeVal >= 60 && timeVal < 3600) {
  //     elem.innerHTML = `${title.toUpperCase()}: ${Math.floor(timeVal / 60)}m`;
  //   } else if(timeVal > 3600) {
  //     elem.innerHTML = `${title.toUpperCase()}: ${Math.floor(timeVal / 3600)}h and ${Math.floor(timeVal % 3600 / 60)}m`;
  //   } else {
  //     elem.innerHTML = 'updating info...';
  //   }
  // }
});