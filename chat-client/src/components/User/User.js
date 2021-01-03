import './User.css';

export default function User({ user }) {
    return (
        <div className="message-w">
            <div className="message-avatar">
                <img src="./images/tribe.jpg" alt={user.name}></img> {user.name}
            </div>
            {user.opacity > 0 && user.message && 
                <div 
                    className="message-body"
                    style={{ opacity: user.opacity }}
                >{user.message.body}</div>
            }
        </div>
    );
}