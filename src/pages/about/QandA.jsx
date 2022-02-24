const QandA = (props) => {
    return (
        <div className="item">
            <p className="question"><span className="letter">Q.</span>{props.question}</p>
            <p className="answer"><span className="letter">A.</span>{props.answer}</p>
        </div>
    )
}

export default QandA
