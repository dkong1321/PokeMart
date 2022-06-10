import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const SingleUserDisplay = () => {
    const userId = useParams().userId
    return (
        <div>hello this is userId {userId} </div>
    )

}

export default SingleUserDisplay
