export const getReplaceUTF8 = (str: any) => {
  str = str.replace(/[ăâáàảạãắẳẵằặấầẩẫậ]/gi, 'a');
  str = str.replace(/[éèẻẽẹêếềểễệ]/gi, 'e');
  str = str.replace(/đ/gi, 'd');
  str = str.replace(/[íìỉĩị]/gi, 'i');
  str = str.replace(/[óòỏõọôốồổỗộơớờởỡợ]/gi, 'o');
  str = str.replace(/[úùủũụưứừữửự]/gi, 'u');
  str = str.replace(/ýỳỷỹỵ/gi, 'y');
  return str;
};
