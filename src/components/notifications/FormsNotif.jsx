const FormsNotif = (props) => {
    return (
        <div className={`forms-notif forms-notif--${props.type}`}>
            {props.messages.map((m, i) => {
                return <h3 className={`forms-notif__message--${props.type}`} key={i}>{m}</h3>
            })}
            {props.errors[0].map((e,i) => {
                return <h3 className={`forms-notif__message--${props.type}`} key={i}>{e.msg}</h3>
            })}
        </div>
    )
}

export default FormsNotif
