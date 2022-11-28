const Notification = ({message, type}) => {

    if(message === null) {
        return null
    }

    const typeMsj = type || false

    
    const notificationStyle = {
        color: typeMsj ? 'red' : 'cadetblue',
        fontWeight: 'bolder',
        backgroundColor: '#dacece',
        fontSize: '3em'
    }
    

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification