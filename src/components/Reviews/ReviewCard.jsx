import { Star } from "lucide-react";
import Button2 from "../Buttons/Button2"
import { Link } from "react-router";

const ReviewCard = ({ review }) => {
    return (

        <div className="w-80 rounded-2xl shadow-lg overflow-hidden bg-white border border-gray-200 p-4">
            <h3 className="font-bold text-lg text-[#2e2e2e]">{review.eventName}</h3>
            <div className="flex mt-2 justify-center">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-[#fcc300]' : 'text-gray-300'}`}
                    fill={i < review.rating ? 'currentColor' : 'none'} />
                ))}
            </div>
    
            <p className="text-gray-500 text-sm mt-2">{review.comment}</p>

            <div className="mt-8 flex justify-center">
                <Link to={ "/post-detail" }>
                    <Button2 text={"Vedi Post"} />
                </Link>
            </div>
        </div>
        );
    };
  
  export default ReviewCard;
  
