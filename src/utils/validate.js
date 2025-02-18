export const checkValidateData = (email, password) => {
    const isEmailVaild = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
    const isPasswordValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[^\s]{6,}$/.test(password);

    if (!isEmailVaild) return "Email ID is not valid";
    if (!isPasswordValid) return "Password is not valid";

    return null;
}