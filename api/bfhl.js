    // api/bfhl.js
module.exports = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ is_success: false, message: "Use POST" });
  }

  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "'data' must be an array" });
    }

    const FULL_NAME = (process.env.FULL_NAME || "john_doe").toLowerCase();
    const DOB = process.env.DOB || "17091999";
    const EMAIL = process.env.EMAIL || "john@xyz.com";
    const ROLL = process.env.ROLL_NUMBER || "ABCD123";

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach(raw => {
      const item = String(raw);

      if (/^-?\d+$/.test(item)) {
        const n = parseInt(item, 10);
        sum += n;
        if (n % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    const concatRaw = alphabets.join("").split("").reverse().join("");
    const concat_string = concatRaw
      .split("")
      .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string,
    });
  } catch (err) {
    return res.status(500).json({ is_success: false, message: err.message });
  }
};
