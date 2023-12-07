import React, { useContext } from 'react';
import { UserContext } from '../Components/UserProvider';
import axios from 'axios';

function CommentCard({ review, onClick }) {
    const { user } = useContext(UserContext);
    const isCurrentUser = user.email === review.PostBy;
    // const isCurrentUser = true; 
    
    return (
        <li>
            <article>
                <p>{review.Content}</p>
                <footer>
                    <p>Posted by: {review.PostBy}</p>
                    {/* <p>Posted by: {user.username}</p> */}
                    {/* <time dateTime={review.Time}>{new Date(review.Time).toLocaleString()}</time> */}
                    <time dateTime={review.Time}>
                        {new Date(new Date(review.Time).setHours(new Date(review.Time).getHours() + 6)).toLocaleString('en-US', { timeZone: 'America/Chicago' })}
                    </time>

                    {isCurrentUser && <button onClick={() => onClick(review.CommentId)}>Delete</button>}
                    
                </footer>
            </article>
        </li>
    );
}

export default CommentCard;
