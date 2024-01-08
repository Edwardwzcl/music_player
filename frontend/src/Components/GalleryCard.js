
import { useNavigate } from 'react-router-dom';
import '../StyleSheets/ArtistCard.css'


function GalleryCard({ type, id, name, image}) {
    const navigate = useNavigate();
    const handleClick = () => {
        // Perform action on click
        console.log(` ${name} clicked`);
        navigate(`/${type}/${id}`);
    };

    return (
        <button className="ArtistCard" onClick={handleClick}>
            {/* <img className="ArtistImage" src={image} alt={name} /> */}
            {image && <img className="ArtistImage" src={image} alt={name} />}
            <p>{name}</p>
        </button>
    );
}

export default GalleryCard;
