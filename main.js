const win = window;
const doc = document;
const battyWrap = doc.querySelector('.batty-wrap');

function fixWinHeight () {
  battyWrap.style.height = window.innerHeight;
};

fixWinHeight();

win.onresize = fixWinHeight;

navigator.getBattery().then(function (battery) {
  const batty = doc.getElementById('batty');
  const power = doc.getElementById('power');
  const battyLevel = doc.getElementById('level');
  const chargingData = doc.querySelector('.charging-data');
  const dischargingData = doc.querySelector('.discharging-data');
  const chargeSeconds = chargingData.querySelector('.seconds');
  const chargeMinutes = chargingData.querySelector('.minutes');
  const chargeHours = chargingData.querySelector('.hours');
  const dischargeSeconds = dischargingData.querySelector('.seconds');
  const dischargeMinutes = dischargingData.querySelector('.minutes');
  const dischargeHours = dischargingData.querySelector('.hours');
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
    batty.parentElement.classList.add('charging');
    batty.parentElement.classList.remove('discharging');
    countCharge();
  }
  // DISCHARGING
  function updateDischargingInfo() {
    batty.parentElement.classList.add('discharging');
    batty.parentElement.classList.remove('charging');
    countDisCharge();
  }
  // COUNT CHARGE
  function countCharge() {
    chargingCounter ++;
    renderTime(chargingCounter, chargeSeconds, chargeMinutes, chargeHours);
  }
  // COUNT DISCHARGE
  function countDisCharge() {
    dischargingCounter ++;
    renderTime(dischargingCounter, dischargeSeconds, dischargeMinutes, dischargeHours);
  }
  // RENDER TIME
  function renderTime(time, seconds, minutes, hours) {
    let s = time;
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);
    h %= 24;
    m %= 60;
    s %= 60;
    seconds.textContent = lessTen(s);
    minutes.textContent = lessTen(m);
    hours.textContent = lessTen(h);
  }
  function lessTen(num) {
    if(num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  setInterval(() => {
    updateChargeInfo();
    updateLevelInfo();
  }, 1000);
});