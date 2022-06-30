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

/**
 * @param input {string}
 */
function convertToRead(input) {
  input = input.replace(/[^\d.+-]/g, "");

  let values = input.split(".");
  let result = "";

  if (values.length > 2) {
    console.log("Error");
    return null;
  }

  const integral = values[0];
  let fraction = values[1];

  const matches = integral.match(/^([+-]*)(\d*)$/);

  if (!matches) {
    console.log("Integral Format Error");
    return null;
  }
  const signs = matches[1];
  const numeric = matches[2];

  let isNegative = signs.split("").filter((c) => c === "-").length % 2 !== 0;

  let decimal = 0;

  let integer = Number(numeric);
  let unitsLength = integer.toString().length;

  if (fraction !== undefined) {
    //แปลง float ให้เป็น number (ถ้ามี)
    fraction = "0." + fraction;
    decimal = Number(fraction);
  }

  if (isNaN(decimal)) {
    //มีอักขระ +- คั่นระหว่างตัวเลขทศนิยม
    // --1200
    console.log("Fraction Format Incorrect");
    return null;
  }

  for (let counter = unitsLength; counter > 0; counter--) {
    let place = counter % 6;
    let isOnes = place == 1;
    let isTens = place == 2;
    let unitValue = 10 ** (counter - 1);
    let num = Math.floor(integer / unitValue);

    integer -= num * unitValue;

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
      continue;
    }

    if (counter > 7) {
      result += isOnes ? "ล้าน" : units[place];
    } else {
      result += units[counter];
    }

    continue;
  }

  if (decimal != 0) {
    result += result == "" ? "ศูนย์จุด" : "จุด";

    decimalConvert = decimal.toString();
    decimalConvert = decimalConvert.replace("0.", "");

    for (const ch of decimalConvert) {
      result += digits[Number(ch)];
    }
  }

  if (isNegative && result != "ศูนย์") {
    //เป็นจำนวนติดลบ และไม่ได้มีค่าเป็น 0
    result = "ลบ" + result;
  }

  return result;
}

/**
 * @param input {string}
 */

function convertToBaht(input) {
  let values = Number(input);

  if (isNaN(values)) {
    console.log("Format Error");
    return null;
  }
  let roundNumbers = values.toFixed(2).toString();
  let money = roundNumbers.split(".");

  let baht = convertToRead(money[0]) + "บาท";
  let stang = "ศูนย์";

  if (money[1] != undefined) {
    stang = convertToRead(money[1]);
  }

  //   let result = [baht , stang].join('บาท')
  return baht + (stang == "ศูนย์" ? "ถ้วน" : stang + "สตางค์");
}

let userInput = "1111,0$0  0.5  0  ";

console.log(convertToRead("-1234"));
console.log(convertToBaht("--1234.006"));
