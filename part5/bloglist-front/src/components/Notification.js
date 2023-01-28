const Notification = ({ message, colorStyle }) => {
  let myStyles = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  if (colorStyle) {
    myStyles.color = colorStyle
    console.log(colorStyle)
  }
  if (message === null) {
    return null
  }

  return (
    // <div className="error">
    <div id="notification" style={myStyles}>
      {message}
    </div>
  )
}

export default Notification