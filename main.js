navigator.getBattery().then(function (battery) {

  const doc = document;
  const batty = doc.getElementById('batty');
  const power = doc.getElementById('power');
  const battyLevel = doc.getElementById('level');
  const chargingData = doc.querySelector('.charging-data');
  const seconds = chargingData.querySelector('.seconds');
  const minutes = chargingData.querySelector('.minutes');
  let chargingCounter = 0;
  let dischargingCounter = 0;

  function updateChargeInfo() {
    if (battery.charging) {
      updateChargingInfo();
      battery.removeEventListener('dischargingtimechange', updateDischargingInfo);
    } else {
      updateDischargingInfo();
      battery.removeEventListener('chargingtimechange', updateChargingInfo);
    }
  }


  function updateLevelInfo() {
    let level = battery.level;
    let text = doc.createTextNode(`LEVEL: ${level * 100}%`);
    power.style.height = `${Math.floor(level * 260)}px`;
    battyLevel.innerHTML = `${Math.floor(level * 100)}%`;
    console.log("level: ", level);
    if (level < 0.7 && level > 0.4) {
      power.style.backgroundColor = '#ffcd00'
    } else if (level < 0.4) {
      power.style.backgroundColor = 'darkred';
    }
  }

  // CHARGING
  function updateChargingInfo() {
    batty.parentElement.classList.add('charging');
    countCharge();
  }
  // DISCHARGING
  function updateDischargingInfo() {
    batty.parentElement.classList.remove('charging');
  }
  // COUNT CHARGE
  function countCharge() {
    chargingCounter ++;
    renderTime(chargingCounter);
  }
  // COUNT DISCHARGE
  // RENDER TIME
  function renderTime(time) {
    console.log("TIME: ", time);
    if(time < 10) {
      seconds.textContent = `0${time}`;
    } else if(time > 9) {
      seconds.textContent = time;
    } else if(time > 59) {
      if(minutes > 10) {
        minutes.textContent = `0${time % 60}`;
      } else {
        minutes.textContent = time % 60;
      }
    }
  }
  setInterval(() => {
    updateChargeInfo();
    updateLevelInfo();
    console.log("UpdateInfo");
  }, 1000);
});