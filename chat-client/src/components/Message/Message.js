import './Message.css';

export default function Message({ message }) {
    return (
        <div className="message-w">
            <div className="message-avatar">
                <img src="./images/tribe.jpg" alt={message.userName}></img> {message.userName}
            </div>
            {message.opacity > 0 && 
                <div 
                    className="message-body"
                    style={{ opacity: message.opacity }}
                >{message.body}</div>
            }
        </div>
    );
}