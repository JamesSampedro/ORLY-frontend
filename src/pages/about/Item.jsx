const Item = (props) => {
    return (
        <div className="item">
            <h3 className="name">{props.name}</h3>
            <p className="position">{props.position}</p>
        </div>
    )
}

export default Item
