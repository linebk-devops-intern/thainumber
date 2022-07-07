const thaiNumbers = new Array("๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙");

function convertToThaiNum(input: string) {
  if (input === undefined) {
    return null;
  }

  let result = "";
  const arabic = "0123456789";

  for (const i of input) {
    result += arabic.includes(i) ? thaiNumbers[Number(i)] : i;
  }

  return result;
}

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

function convertToRead(input: string) {
  if (input === undefined || input == "") {
    return;
  }

  input = input.replace(/[^\d.+-]/g, "");
  
  let values = input.split(".");
  let result = "";

  if (values.length > 2) {
    console.log("Error");
    return;
  }

  const integral = values[0];
  let fraction = values[1];

  const matches = integral.match(/^([+-]*)(\d*)$/);

  if (!matches) {
    console.log("Integral Format Error");
    return;
  }

  const signs = matches[1];
  const numeric = matches[2];

  let isNegative = signs.split("").filter((c) => c === "-").length % 2 !== 0;

  let decimal = 0;

  let unitsLength = numeric.length;

  if (fraction !== undefined) {
    //แปลง float ให้เป็น number (ถ้ามี)
    fraction = "0." + fraction;
    decimal = Number(fraction);
  }

  if (isNaN(decimal)) {
    //มีอักขระ +- คั่นระหว่างตัวเลขทศนิยม
    // --1200
    console.log("Fraction Format Incorrect");
    return;
  }

  for (let counter = unitsLength; counter > 0; counter--) {
    let place = counter % 6;
    let isOnes = place == 1;
    let isTens = place == 2;
    let index = unitsLength - counter;
    let num = Number(numeric[index]);

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

    const decimalConvert = decimal.toString().replace("0.", "");

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

function convertToBaht(input: string) {
  if (input === undefined) {
    return;
  }
  input = input.replace(/[^\d.+-]/g, "");

  const matches = input.match(/^([+-]*)(\d*.\d*)$/);

  if (!matches) {
    console.log("Format Error");
    return;
  }

  console.log(matches);

  let signs = matches[1];
  let vals = matches[2];
  let values = Number(vals);
  let isNegative = signs.split("").filter((c) => c === "-").length % 2 !== 0;

  // let roundNumbers = values.toFixed(2).toString();
  let money = matches[2].split(".");

  let bahtread = convertToRead(money[0]);
  if(bahtread === undefined && money[1] === undefined){
    return;
  }

  let baht = (bahtread ?? "ศูนย์") + "บาท";
  let stang: string | undefined = "ศูนย์";

  if (money[1] != undefined) {
    //สตางค์
    let decimal = Number("0." + money[1])
      .toFixed(2)
      .toString()
      .replace("0.", "");

    stang = convertToRead(decimal);
  }
  isNegative = isNegative && (baht !== "ศูนย์บาท" || stang !== "ศูนย์");

  //   let result = [baht , stang].join('บาท')
  return (
    (isNegative ? "ลบ" : "") +
    (baht !== "ศูนย์บาท" || (baht === "ศูนย์บาท" && stang === "ศูนย์")
      ? baht
      : "") +
    (stang === "ศูนย์" ? "ถ้วน" : stang + "สตางค์")
  );
}

export { convertToThaiNum, convertToBaht, convertToRead };
