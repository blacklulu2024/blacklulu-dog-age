document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('ageForm');
  const birthdateInput = document.getElementById('birthdate');
  const dogAgeSpan = document.getElementById('dogAge');
  const humanAgeSpan = document.getElementById('humanAge');

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

    // 計算狗狗實歲（年數，可取整數或一位小數）
    const diffMs = today - birthDate;
    const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);
    const dogAge = Math.floor(diffYears * 100) / 100;  // 取兩位小數
    dogAgeSpan.textContent = dogAge;

    // 換算成人年齡
    const humanAge = convertDogToHuman(dogAge);
    humanAgeSpan.textContent = humanAge;

  });

  function convertDogToHuman(dogYears) {
    if (dogYears <= 0) {
      return 0;
    }
    let humanYears = 0;
    if (dogYears <= 1) {
      humanYears = dogYears * 15;
    } else if (dogYears <= 2) {
      humanYears = 15 + (dogYears - 1) * 9;
    } else {
      humanYears = 15 + 9 + (dogYears - 2) * 5;
    }
    // 四捨五入至整數
    return Math.round(humanYears);
  }
});
