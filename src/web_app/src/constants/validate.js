export const validatePhone = (phone) => {
    let errPhone = '';
    const regexPhone = /^\d{10,11}$/;
    if (regexPhone.exec(phone) !== null) {
       errPhone = ''
    }
    else {
        errPhone = 'Số điện thoại phải có 10 hoặc 11 số'
    }

    return errPhone;

}

export const validateEmail = (email) => {
    let errEmail = '';
    const regexpEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (regexpEmail.exec(email) !== null) {
          errEmail = ''
    }
    else {
        errEmail = 'Email không hợp lệ'
    }
    return errEmail;
}

export const validatePassword = (password) => {
    let errPassword = '';
    if(password) {
      if (password.length >= 6) {
                errPassword = ''
            }
            else {
                errPassword = 'Mật khẩu phải có ít nhất từ 6 ký tự'
            }
    }
    return errPassword;
}

export const validateConfirmPassword = (password, confirmPassword) => {
  let errConfirmPassword = '';
  if (password === confirmPassword) {
      errConfirmPassword = ''
  }
  else {
      errConfirmPassword = 'Hai mật khẩu không khớp'
  }
  return errConfirmPassword;
}

export const validateSalary = (salaryFirst, salarySecond) => {
    console.log('salarySecond: ', salarySecond);
    let errSalary = '';
    if (salaryFirst >= salarySecond) {
        errSalary = ''
    }
    else {
        errSalary = 'Lương tối thiểu phải từ ' + salarySecond.toString() + ' vnđ trở lên';
    }
    return errSalary;
  }

 export const checkSalary = (level, noDay, noHour) => {
    switch (level) {
        case "Sinh viên":
            return 50000 * noDay * noHour * 4;
        case "Giáo viên":
            return 150000 * noDay * noHour * 4;
        case "Cử nhân":
            return 100000 * noDay * noHour * 4;
        case "Thạc sĩ":
            return 200000 * noDay * noHour * 4;
        case "Không yêu cầu":
            return 50000 * noDay * noHour * 4;
        default:
            return 50000 * noDay * noHour * 4;
    }
}

