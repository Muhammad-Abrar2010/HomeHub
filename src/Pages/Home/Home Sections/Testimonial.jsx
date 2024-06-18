const testimonials = [
    {
      _id: "1",
      userName: "Mir Muhammad Abrar Tahseen",
      userProfilePicture: "https://lh3.googleusercontent.com/a/ACg8ocJZFSpV70sRz2TZAeldHb5A_WkvF8FQSNZ3L7kFieAX5b9FIKdp=s96-c",
      reviewText: "This property exceeded my expectations. The amenities were top-notch and the service was excellent.",
      propertyTitle: "Luxury Villa",
      date: "2024-06-18T10:59:28.222Z"
    },
    {
      _id: "2",
      userName: "Jane Doe",
      userProfilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
      reviewText: "A wonderful place to stay! The views were breathtaking and the location was perfect.",
      propertyTitle: "Oceanfront Condo",
      date: "2024-06-15T10:59:28.222Z"
    },
    {
      _id: "3",
      userName: "John Smith",
      userProfilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
      reviewText: "Highly recommend this property. It was clean, modern, and had everything we needed for a comfortable stay.",
      propertyTitle: "City Center Apartment",
      date: "2024-06-10T10:59:28.222Z"
    }
  ];
  
  const Testimonial = () => {
    return (
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <div className="flex flex-wrap justify-center space-x-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4 my-4"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.userProfilePicture}
                    alt={`${testimonial.userName}'s profile`}
                    className="w-16 h-16 rounded-full border-2 border-blue-500"
                  />
                  <div className="ml-4 text-left">
                    <h3 className="text-xl font-semibold">
                      {testimonial.userName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.propertyTitle}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 text-left">
                  "{testimonial.reviewText}"
                </p>
              
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Testimonial;
  