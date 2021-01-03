import './Message.css';

export default function Message({ userName, messageBody }) {
    return (
        <div className="message-w">
            <div className="message-avatar">
                <img src="./images/tribe.jpg" alt={userName}></img> {userName}
            </div>
            <div className="message-body">{messageBody}</div>
        </div>
    );
}