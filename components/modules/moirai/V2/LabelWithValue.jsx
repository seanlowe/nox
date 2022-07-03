import React from 'react'
import { PropTypes } from 'prop-types'

const LabelWithValue = ({ label, name, value, valueStyle }) => {
  return (
    <div className='status-v2-key-value-pair'>
      <label title={label} htmlFor={name} >
        {label}:
      </label>
      <div name={name} className={valueStyle} >
        {value}
      </div>
    </div>
  )
}

LabelWithValue.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
}

export default LabelWithValue
