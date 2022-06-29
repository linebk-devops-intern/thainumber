// const num = new Map([
//   ["0", "๐"],
//   ["1", "๑"],
//   ["2", "๒"],
//   ["3", "๓"],
//   ["4", "๔"],
//   ["5", "๕"],
//   ["6", "๖"],
//   ["7", "๗"],
//   ["8", "๘"],
//   ["9", "๙"],
// ]); //ทำเป็น array เทียบช่องเลยก็ได้มั้ง

const thaiNumbers = new Array("๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙");

function convertNum(numInput) {
  let result = "";

  for (const i of numInput) {
    if (i == ".") {
      result += ".";
      continue;
    }

    result += thaiNumbers[parseInt(i)];
  }

  return result;
}

console.log(convertNum("123.45"));

// ถ้ามากกว่า 7 %6 เอา //9 = ร้อย, 10 = พัน, 11 = หมื่น %6 = 5
const units = new Array(
  "แสน",
  "",
  "สิบ",
  "ร้อย",
  "พัน",
  "หมื่น",
  "แสน",
  "ล้าน"
);

const digits = new Array(
  "ศูนย์",
  "หนึ่ง",
  "สอง",
  "สาม",
  "สี่",
  "ห้า",
  "หก",
  "เจ็ด",
  "แปด",
  "เก้า"
);

function convertRead(input) {
  input = input.replace(/[^\d.-]/g, "");

  let result = "";
  let counter = 0;

  for (const i of input) {
    if (i == ".") {
      break;
    }

    counter++;
  }

  for (const ch of input) {
    let place = counter % 6;
    let isOnes = place == 1;
    let isTens = place == 2;

    if (counter == 0 && result == "") {
      result += "ศูนย์";
    }

    if (ch == ".") {
      result += "จุด";
      continue;
    }

    if (counter > 0) {
      //เลขจำนวนเต็ม
      let num = parseInt(ch);

      if (result != "" && isOnes && num == 1) {
        //เติมคำลงท้ายว่าเอ็ด
        result += "เอ็ด";
      } else if (isTens && (num == 2 || num == 1)) {
        if (num == 2) {
          result += "ยี่";
        }
      } else if (num != 0) {
        result += digits[num];
      } else {
        if (counter >= 7 && isOnes && result != "") {
          result += "ล้าน";
        }

        if (counter == 1 && result == "") {
          result += "ศูนย์";
        }

        counter--;
        continue;
      }

      if (counter > 7) {
        result += isOnes ? "ล้าน" : units[place];
      } else {
        result += units[counter];
      }

      counter--;
      continue;
    }

    // ทศนิยม
    result += digits[parseInt(ch)];
  }

  return result;
}

let userInput = "1111,0$0  0.5  0  ";

console.log(convertRead("   .90 "));
