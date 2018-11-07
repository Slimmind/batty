navigator.getBattery().then(function (battery) {

  const doc = document;
  const batty = doc.getElementById('batty');
  const power = doc.getElementById('power');
  const battyLevel = doc.getElementById('level');
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
    if (level < 0.7 && level > 0.4) {
      power.style.backgroundColor = '#ffcd00'
    } else if (level < 0.4) {
      power.style.backgroundColor = 'darkred';
    }
  }

  // CHARGING
  function updateChargingInfo() {
    batty.classList.add('charging');
    countCharge();
  }
  // DISCHARGING
  function updateDischargingInfo() {
    batty.classList.remove('charging');
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
  }
  setInterval(() => {
    updateChargeInfo();
    updateLevelInfo();
    console.log("UpdateInfo");
  }, 1000);
});