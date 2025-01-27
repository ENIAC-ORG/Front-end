// numberConverter.js

export const convertToPersianNumbers = (value) => {
    const persianNumbersMap = {
      '0': '۰',
      '1': '۱',
      '2': '۲',
      '3': '۳',
      '4': '۴',
      '5': '۵',
      '6': '۶',
      '7': '۷',
      '8': '۸',
      '9': '۹',
    };
  
    return value.replace(/[0-9]/g, (char) => persianNumbersMap[char] || char);
  };
  
  export const convertToEnglishNumbers = (value) => {
    const englishNumbersMap = {
      '۰': '0',
      '۱': '1',
      '۲': '2',
      '۳': '3',
      '۴': '4',
      '۵': '5',
      '۶': '6',
      '۷': '7',
      '۸': '8',
      '۹': '9',
    };
  
    return value.replace(/[۰-۹]/g, (char) => englishNumbersMap[char] || char);
  };

  export const isPersianString = (str) => {
    const persianRegex = /^[\u0600-\u06FF\s]+$/;
    return persianRegex.test(str);
  }