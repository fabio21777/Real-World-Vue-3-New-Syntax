const required = value => {
  const requiredMessage = 'This field is required'
  if (value === undefined || value === null) return requiredMessage
  if (!String(value).length) return requiredMessage

  return true
}

const minLength = (number, value) => {
  if (String(value).length < number) return 'Please type at least ' + number + ' characters'

  return true
}

const anything = () => {
  return true
}

export {
  required,
  minLength,
  anything
}
