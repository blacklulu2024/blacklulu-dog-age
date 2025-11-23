document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('ageForm');
  const birthdateInput = document.getElementById('birthdate');
  const dogAgeSpan = document.getElementById('dogAge');
  const humanAgeSpan = document.getElementById('humanAge');
  const historyList = document.getElementById('historyList');

  // 載入 localStorage 歷史
  let history = JSON.parse(localStorage.getItem('dogAgeHistory')) || [];
  renderHistory();

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const birthdateValue = birthdateInput.value;
    if (!birthdateValue) {
      alert('請選擇出生日期');
      return;
    }

    const birthDate = new Date(birthdateValue);
    const today = new Date();
    if (birthDate > today) {
      alert('出生日期不能在未來');
      return;
    }

    // 計算狗狗實歲
    const diffMs = today - birthDate;
    const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);
    const dogAge = Math.floor(diffYears * 100) / 100;
    dogAgeSpan.textContent = dogAge;

    // 換算成人年齡
    const humanAge = convertDogToHuman(dogAge);
    humanAgeSpan.textContent = humanAge;

    // 儲存歷史紀錄到 localStorage
    const record = `狗狗 ${birthdateValue} - 狗年齡: ${dogAge}歲，換算人類年齡: ${humanAge}歲`;
    history.unshift(record);
    if(history.length > 10) history.pop(); // 最多保留 10 筆
    localStorage.setItem('dogAgeHistory', JSON.stringify(history));
    renderHistory();
  });

  function convertDogToHuman(dogYears) {
    if (dogYears <= 0) return 0;
    let humanYears = 0;
    if (dogYears <= 1) {
      humanYears = dogYears * 15;
    } else if (dogYears <= 2) {
      humanYears = 15 + (dogYears - 1) * 9;
    } else {
      humanYears = 15 + 9 + (dogYears - 2) * 5;
    }
    return Math.round(humanYears);
  }

  function renderHistory() {
    historyList.innerHTML = '';
    history.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      historyList.appendChild(li);
    });
  }
});
