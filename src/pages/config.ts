enum themeEnum {
  BLACK = 'black',
  WHITE = 'white'
}

enum SizeEnum {
  DEFAULTSIZE = "default",
  FULLSIZE = "full",
}

enum FontSizeEnum {
  mini = '30',
  small = '40',
  normal = '60',
  large = '100'
}

const enumToArr = (enumName) => {
  const entries = Object.entries(enumName)
  return entries.map(([label, value]: [string, string]) => ({
    label,
    value
  }))
}

export { SizeEnum, FontSizeEnum, themeEnum, enumToArr }
