/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  const errors = {};

  // formData must be a non-null object
  if (
    typeof formData !== "object" ||
    formData === null ||
    Array.isArray(formData)
  ) {
    return { isValid: false, errors: { form: "Invalid form data" } };
  }

  // 1. Validate name
  const name = formData.name;
  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.trim().length > 50
  ) {
    errors.name = "Name must be 2-50 characters";
  }

  // 2. Validate email (exactly one "@", at least one "." after "@")
  const email = formData.email;
  let emailInvalid = false;

  if (typeof email !== "string") {
    emailInvalid = true;
  } else {
    const atIndex = email.indexOf("@");
    const lastAtIndex = email.lastIndexOf("@");

    if (atIndex === -1 || atIndex !== lastAtIndex) {
      emailInvalid = true;
    } else {
      const dotAfterAt = email.indexOf(".", atIndex + 1) !== -1;
      if (!dotAfterAt) {
        emailInvalid = true;
      }
    }
  }

  if (emailInvalid) {
    errors.email = "Invalid email format";
  }

  // 3. Validate phone (exactly 10 digits, starts with 6/7/8/9)
  const phone = formData.phone;
  if (typeof phone !== "string" || phone.length !== 10) {
    errors.phone = "Invalid Indian phone number";
  } else {
    if (!["6", "7", "8", "9"].includes(phone[0])) {
      errors.phone = "Invalid Indian phone number";
    } else {
      for (let i = 0; i < phone.length; i++) {
        const ch = phone[i];
        if (ch < "0" || ch > "9") {
          errors.phone = "Invalid Indian phone number";
          break;
        }
      }
    }
  }

  // 4. Validate age (number or numeric string, integer 16–100)
  let age = formData.age;

  if (typeof age === "string") {
    if (age.trim() === "") {
      errors.age = "Age must be an integer between 16 and 100";
    } else {
      const parsed = Number(age);
      if (
        Number.isNaN(parsed) ||
        !Number.isInteger(parsed) ||
        parsed < 16 ||
        parsed > 100
      ) {
        errors.age = "Age must be an integer between 16 and 100";
      } else {
        age = parsed; 
      }
    }
  } else if (typeof age === "number") {
    if (!Number.isInteger(age) || age < 16 || age > 100) {
      errors.age = "Age must be an integer between 16 and 100";
    }
  } else {
    errors.age = "Age must be an integer between 16 and 100";
  }

  // 5. Validate pincode (exactly 6 digits, not starting with 0)
  const pincode = formData.pincode;
  if (
    typeof pincode !== "string" ||
    pincode.length !== 6 ||
    pincode.startsWith("0")
  ) {
    errors.pincode = "Invalid Indian pincode";
  } else {
    for (let i = 0; i < pincode.length; i++) {
      const ch = pincode[i];
      if (ch < "0" || ch > "9") {
        errors.pincode = "Invalid Indian pincode";
        break;
      }
    }
  }

  // 6. Validate state
  const state = formData?.state ?? "";
  if (typeof state !== "string" || state.trim() === "") {
    errors.state = "State is required";
  }

  // 7. Validate agreeTerms (truthy)
  if (!Boolean(formData.agreeTerms)) {
    errors.agreeTerms = "Must agree to terms";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
