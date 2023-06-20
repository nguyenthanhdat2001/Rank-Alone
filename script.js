import { ranks } from "./ranks.js";

let date = document.getElementById("dateInput");
let output = document.getElementById("text-output");
let btn = document.getElementById("btn");
let listRank = document.getElementById("ranks");
let sidebar = document.querySelector(".sidebar");
let show = document.querySelector(".properties");

show.onclick = function () {
  sidebar.classList.add("active");
};

sidebar.onclick = function () {
  sidebar.classList.remove("active");
};

let trListRank = "";
for (let rank of ranks) {
  trListRank += `<tr><td>${rank.name}</td><td>${rank.point}</td></tr>`;
}
listRank.innerHTML = trListRank;

function validate(num) {
  if (!isNaN(num) && num < 10) {
    num = "0" + num;
  }
  return num;
}

btn.onclick = function (e) {
  const getDate = new Date(date.value).getTime();
  const currenttime = Date.now();
  const remainTime = currenttime - getDate; // milisecond
  if (remainTime < 0) {
    alert("Chia tay trong tương lai à :v");
    output.innerHTML = "Nhập lại";
  } else {
    const curRank = document.querySelector(".now-rank");
    const nextRank = document.querySelector(".next-rank");
    const process = document.getElementById("process");
    const title = document.querySelector(".title-rank");
    const day = Math.floor(remainTime / (1000 * 60 * 60 * 24));
    if (!isNaN(day) && validate(day) > 0) {
      const count = parseInt(validate(day)); // day
      output.innerHTML = `Bạn đã chia tay ${count} ngày`;
      if (count >= ranks[ranks.length - 1].point) {
        const name = ranks[ranks.length - 1].name.toString();
        curRank.textContent = name;
        nextRank.textContent = name;
        process.value = 100;
        title.innerHTML = `Trình độ hiện tại: <b>${name} | ${Math.floor(
          process.value
        )}%</b>`;
      } else {
        for (let i = 0; i < ranks.length; i++) {
          if (count >= ranks[i].point && count < ranks[i + 1].point) {
            curRank.textContent = ranks[i].name.toString();
            nextRank.textContent = ranks[i + 1].name.toString();
            const valueProcess =
              ((count - ranks[i].point) /
                (ranks[i + 1].point - ranks[i].point)) *
              100;
            process.value = valueProcess;
            title.innerHTML = `Trình độ hiện tại: <b>${
              ranks[i].name
            } | ${Math.floor(valueProcess)}%</b>`;
            break;
          }
        }
      }
    } else {
      output.innerHTML = "Chia tay hôm nay luôn à :((";
      curRank.textContent = "Không biết";
      nextRank.textContent = "Không biết";
      title.textContent = "Unrank";
      process.value = 0;
    }
  }
};
