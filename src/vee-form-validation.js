// Validate values with rules

class VeeFormValidation {
  constructor (values, rules, errors) {
    this.values = {}
    this.reset(values, rules, errors)
  }

  check (values, rules, errors, force = false) {
    let isValid = true
    for (const key in values) {
      // console.log('check', this.values, values)

      if (!force && values[key] === this.values[key]) {
        // console.log('skip', key, values[key], this.values[key])
        continue
      }

      this.values[key] = values[key]

      if (rules[key] instanceof Array) {
        errors[key] = ''
        for (const rule of rules[key]) {
          if (rule.required && values[key] === '') {
            errors[key] = rule.message
            isValid = false
            break
          }

          if (typeof rule.minLength === 'number' && values[key].length < rule.minLength) {
            errors[key] = rule.message
            isValid = false
            break
          }

          if (typeof rule.maxLength === 'number' && values[key].length > rule.maxLength) {
            errors[key] = rule.message
            isValid = false
            break
          }

          if (rule.regExp instanceof String) {
            rule.regExp = new RegExp(rule.regExp)
          }

          if (rule.regExp instanceof RegExp && rule.regExp.test(values[key])) {
            errors[key] = rule.message
            isValid = false
            break
          }

          if (rule.fun instanceof Function && rule.fun(values[key])) {
            errors[key] = rule.message
            isValid = false
            // break
          }
        }
      }
    }
    return isValid
  }

  reset (values, rules, errors) {
    for (const key in values) {
      if (rules[key] instanceof Array) {
        this.values[key] = values[key]
      }
      errors[key] = ''
    }
  }
}

export default VeeFormValidation // expose the VeeFormValidation class to other modules
