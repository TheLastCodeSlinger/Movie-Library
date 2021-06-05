import './Css/CastItem.css'



const CastItem = (cast) => {
    return (
        // Here could be a Link to the Persons-Profile
        <div>
            {cast.cast.profile_path ? <img className="profile-img" src={`https://image.tmdb.org/t/p/w185${cast.cast.profile_path}`}  /> : <h2>No</h2>}
        </div>
    )
}

export default CastItem