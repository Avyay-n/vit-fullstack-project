// /api/bfhl.js

export default function handler(req, res) {
  try {
    // 1. Method Validation: Ensure the request method is POST
    if (req.method !== 'POST') {
      return res.status(405).json({ is_success: false, message: 'Method Not Allowed. Please use POST.' });
    }

    // 2. Input Validation: Check for the presence and type of the 'data' array
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input: 'data' must be an array." });
    }

    // --- Static User Information ---
    // In a real app, this would come from a database or environment variables
    const user_id = "aditya_guntupalli_29082025";
    const email = "ag2204@vitbhopal.ac.in";
    const roll_number = "21BCE10271";

    // --- Data Processing ---
    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let alpha_string_builder = "";

    // Loop through each item in the input data array
    data.forEach(item => {
      // Check if the item is a number (as a string)
      if (!isNaN(parseFloat(item)) && isFinite(item)) {
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item); // Keep it as a string
        } else {
          odd_numbers.push(item); // Keep it as a string
        }
      }
      // Check if the item is composed of only alphabetic characters
      else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        alpha_string_builder += item;
      }
      // Otherwise, it's a special character
      else {
        special_characters.push(item);
      }
    });

    // --- Post-Loop Logic for Alternating Caps String ---
    // 1. Reverse the concatenated alphabet string
    const reversed_alpha_string = alpha_string_builder.split('').reverse().join('');
    
    // 2. Apply alternating caps
    let concat_string = "";
    for (let i = 0; i < reversed_alpha_string.length; i++) {
        if (i % 2 === 0) {
            concat_string += reversed_alpha_string[i].toUpperCase();
        } else {
            concat_string += reversed_alpha_string[i].toLowerCase();
        }
    }


    // --- Construct the Final Response ---
    const response = {
      is_success: true,
      user_id: user_id,
      email: email,
      roll_number: roll_number,
      odd_numbers: odd_numbers,
      even_numbers: even_numbers,
      alphabets: alphabets,
      special_characters: special_characters,
      sum: sum.toString(), // Return sum as a string
      concat_string: concat_string,
    };

    // Send the successful response
    return res.status(200).json(response);

  } catch (error) {
    // Graceful error handling for any unexpected issues
    console.error("An error occurred:", error);
    return res.status(500).json({ is_success: false, message: "Internal Server Error." });
  }
}