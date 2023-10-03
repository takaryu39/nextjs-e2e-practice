import React from 'react'

const Spinner = ({
  color = 'border-blue-500',
  width = 'w-8',
  height = 'w-8',
}: {
  color?: string
  width?: string
  height?: string
}) => {
  return (
    <div className="m-2 flex justify-center">
      <div
        className={`${height} ${width} animate-spin rounded-full border-2 ${color} border-t-transparent`}
      ></div>
    </div>
  )
}

export default Spinner
