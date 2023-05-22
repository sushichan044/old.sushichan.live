import 'client-only'

import { useState } from 'react'

const useLocalStorage = (
  key: string,
  initialValue: string
): [
  value: string,
  setValue: (value: string | ((value: string) => string)) => void
] => {
  const [state, setState] = useState(() => {
    // Initialize the state
    try {
      const value = window.localStorage.getItem(key)
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      console.log(error)
    }
  })

  const setValue = (value: string | ((value: string) => string) | null) => {
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      const valueToStore = typeof value === 'function' ? value(state) : value

      // save value
      if (valueToStore === null) {
        window.localStorage.removeItem(key)
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
      setState(value)
    } catch (error) {
      console.log(error)
    }
  }

  return [state, setValue]
}

export default useLocalStorage
