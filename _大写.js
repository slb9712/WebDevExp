function capitalizeWordsWithQuestionMark(input) {
    let result = '';
    let capitalizeNext = input[0] !== '?' && input[0];
    let gap = false;
    for (let i = 0; i < input.length; i++) {
      const currentChar = input[i];
  
      if (currentChar.trim()) {
        console.log(currentChar.length);
        if (currentChar === '?') {
          capitalizeNext = true;
        } else {
          if (capitalizeNext) {
            result += currentChar.toUpperCase();
  
            capitalizeNext = false;
          } else {
            result += currentChar;
          }
          gap = false;
        }
      } else if (!gap) {
        gap = true;
        result += ' ';
      }
    }
    return result;
  }
  
  const input = 'i?? love???      ? word';
  console.log(capitalizeWordsWithQuestionMark(input));