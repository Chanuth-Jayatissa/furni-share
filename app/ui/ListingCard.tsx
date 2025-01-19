interface ListingCardProps {
    title: string;
    description: string;
    location: string;
    pickupType: string;
    imageUrl?: string;
  }
  
  export default function ListingCard({
    title,
    description,
    location,
    pickupType,
    imageUrl,
  }: ListingCardProps) {
    return (
      <div className="flex items-center bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
        {/* Text Content */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-gray-300 mb-2">{description}</p>
          <p className="text-gray-400 text-sm mb-4">Location: {location}</p>
          <p className="text-gray-400 text-sm mb-4">Pickup Type: {pickupType}</p>
        </div>
        {/* Image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-48 h-48 object-cover rounded-lg ml-6"
          />
        )}
      </div>
    );
  }
  