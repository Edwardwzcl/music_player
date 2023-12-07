import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../Components/UserProvider';
import { useNavigate, useParams } from 'react-router-dom';
import InputSubmit from "../Components/InputSubmit";
import RadialSelector from '../Components/RadialSelector';
import RateeCard from '../Components/RateeCard';
import CommentCard from '../Components/CommentCard'; // Import the new component
import useAuthRedirect from "../Hooks/useAuthRedirect";
import '../StyleSheets/Ratee.css';

function RateePage() {
    const ratingLvl = [ '0', '1', '2', '3', '4', '5'];
    const { user } = useContext(UserContext);


    let { id } = useParams();
    const navigate = useNavigate();
    const [ratee, setRatee] = useState({
        Country: '',
        Discipline: '',
        Name: '',
        Rating: 0,
        Type: ''
    });
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(2);

    useAuthRedirect();
    
    React.useEffect(() => {
        fetchRatee();
    }, [id]); // Added id as a dependency

    const fetchRatee = async () => {
        const baseUrl = 'http://localhost:8080/api/ratee';
        const url = `${baseUrl}?rateeid=${id}`;
        console.log('Fetching ratee from:', url);
        try {
            const response = await axios.get(url);
            console.log('Server Response:', response.data);
            const data = response.data.data; // Accessing the 'data' property from the response
            setRatee({
                Country: data.Country,
                Discipline: data.Discipline,
                Name: data.Name || `${data.Country} ${data.Discipline} Team`,
                Rating: data.Rating,
                Type: data.Type
            });
            setReviews(data.Comments); // Assuming 'Comments' contains the array of reviews
        } catch (error) {
            console.error('Search Error:', error);
        }
    };

    const handleCommentSubmit = async (comment) => {
        const commentData = {
            email: user.email,
            content: comment,
            target: id
        };
        try {
            const response = await axios.post('http://localhost:8080/api/comment', commentData);
            console.log(response.data);
            // Alert the user
            alert('Comment posted successfully');
            // Call fetchRatee to update the data
            fetchRatee();
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            // Implement the logic to delete the comment
            console.log('Deleting comment with id:', commentId);
    
            // Send a DELETE request to the API with the commentId
            const response = await axios.delete(`http://localhost:8080/api/comment/${commentId}`);
    

            if (response.status === 200)  {
                alert('Comment deleted successfully');
                fetchRatee();
            }
            
    
        } catch (error) {
            // Handle errors here, such as network issues or server errors
            console.error('Error deleting comment:', error.message);
        }
    };
    
    const handleRating = async (rating) => {
        const ratingData = {
            rate_by: user.email,
            rating_value: rating,
            target: id
        };
      
        try {
            console.log(ratingData.rating_value);
            console.log(ratingData);
            const response = await axios.post('http://localhost:8080/api/rates', ratingData);
            console.log(response.data);
            // Alert the user
            // alert('Rating posted successfully');
            alert(response.data.message)
            // Call fetchRatee to update the data
            fetchRatee();
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    return (
        <div className='rateeDiv'>
            {/* button, go back to homepage */}
            <button onClick={() => navigate('/')}>Back to Home</button>
            <header>
                <h1>Discission Board</h1>
            </header>
            <section>
                <h2>{ratee.Name}</h2>
                <p><strong>Country:</strong> {ratee.Country}</p>
                <p><strong>Discipline:</strong> {ratee.Discipline}</p>
                <p><strong>Rating:</strong> {ratee.Rating.toFixed(1)}</p>
                <p><strong>Type:</strong> {ratee.Type}</p>
            </section>
            <section className='UserInteraction'>
                <h2>Rate This Participant</h2>
                <RadialSelector options={ratingLvl} onOptionSelected={handleRating} />
                <h2>Leave Your Comment</h2>
                <InputSubmit onSubmit={handleCommentSubmit}/>
            </section>
            <section>
                <h2>Reviews</h2>
                <ul>
                    {reviews.map((review) => (
                        <CommentCard key={review.CommentId} review={review} onClick={handleDeleteComment}/>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default RateePage;