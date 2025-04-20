import { useReviewsContext } from '../BentoContext';

const OtherPage = () => {
  const { reviews } = useReviewsContext();

  return (
    <div className="w-full max-w-9xl mx-auto p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-16">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white p-6 h-48 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-410 hover:bg-gray-200 hover:shadow-lg"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold">{review.name}</span>
              <span className="text-gray-500 text-sm">{review.date}</span>
            </div>
            <div className="text-yellow-500">
              {'⭐'.repeat(review.rating)}
            </div>
            <p className="mt-2">{review.reviewText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherPage;
