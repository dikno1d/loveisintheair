import { TimelineEvent, Reason, FavoriteThing, DatePlace, Restaurant, PlaceToVisit, BucketItem, MapPin, GalleryImage, MusicTrack } from '@/types';

export const SITE_CONFIG = {
  coupleNames: "My Forever",
  subtitle: "Every beautiful moment starts with you.",
  startDate: "2024-01-15",
  quote: "No matter where life takes us, my heart will always find you.",
};

export const timelineEvents: TimelineEvent[] = [
  { id: "1", date: "January 15, 2024", title: "First Meeting", description: "The day our eyes met and everything changed. I knew right then that you were someone special.", location: "The Coffee House, Downtown", image: "/images/timeline-1.jpg" },
  { id: "2", date: "February 14, 2024", title: "First Valentine's Day", description: "Our first Valentine's together. Dinner under the stars, laughter that echoed through the night.", location: "Rooftop Restaurant", image: "/images/timeline-2.jpg" },
  { id: "3", date: "March 21, 2024", title: "First Trip Together", description: "Mountains, sunsets, and the feeling that the world was ours to explore.", location: "Mountain View Resort", image: "/images/timeline-3.jpg" },
  { id: "4", date: "May 1, 2024", title: "Our Song", description: "The night we found our song. It still gives me chills every time I hear it.", location: "By the Lake", image: "/images/timeline-4.jpg" },
  { id: "5", date: "July 4, 2024", title: "Fireworks & Promises", description: "Watching fireworks light up the sky while making promises I'll keep forever.", location: "City Rooftop", image: "/images/timeline-5.jpg" },
  { id: "6", date: "September 15, 2024", title: "Autumn Walk", description: "Walking through golden leaves, hand in hand, creating memories that will last a lifetime.", location: "Central Park", image: "/images/timeline-6.jpg" },
  { id: "7", date: "December 25, 2024", title: "Christmas Together", description: "Our first Christmas. The warmth of your love made it the most magical holiday ever.", location: "Our Home", image: "/images/timeline-7.jpg" },
  { id: "8", date: "January 15, 2025", title: "One Year Anniversary", description: "365 days of love, laughter, and growing together. Here's to forever.", location: "Same Coffee House", image: "/images/timeline-8.jpg" },
];

export const reasons: Reason[] = [
  { id: 1, text: "Your smile lights up my entire world", emoji: "😊" },
  { id: 2, text: "The way you laugh at my terrible jokes", emoji: "😂" },
  { id: 3, text: "Your kindness touches everyone around you", emoji: "🥰" },
  { id: 4, text: "You make the ordinary feel extraordinary", emoji: "✨" },
  { id: 5, text: "The way you look at me with those eyes", emoji: "😍" },
  { id: 6, text: "You believe in me when I can't believe in myself", emoji: "💪" },
  { id: 7, text: "Your strength inspires me every single day", emoji: "🌟" },
  { id: 8, text: "The way you care for everyone so deeply", emoji: "💕" },
  { id: 9, text: "You make every moment feel like a movie scene", emoji: "🎬" },
  { id: 10, text: "Your voice is my favorite sound in the world", emoji: "🎵" },
  { id: 11, text: "The way you dance when you think no one is watching", emoji: "💃" },
  { id: 12, text: "You turn my worst days into my best memories", emoji: "🌈" },
  { id: 13, text: "Your passion for life is contagious", emoji: "🔥" },
  { id: 14, text: "The way you hold my hand feels like home", emoji: "🤝" },
  { id: 15, text: "You make me want to be a better person", emoji: "🌟" },
  { id: 16, text: "Your cooking is absolutely amazing", emoji: "👨‍🍳" },
  { id: 17, text: "The way you sing in the shower", emoji: "🎤" },
  { id: 18, text: "You remember the little things that matter", emoji: "💝" },
  { id: 19, text: "Your patience with me is a true gift", emoji: "🙏" },
  { id: 20, text: "The way you light up a room when you walk in", emoji: "💡" },
  { id: 21, text: "You are my best friend and my soulmate", emoji: "👫" },
  { id: 22, text: "The way you support my dreams unconditionally", emoji: "🚀" },
  { id: 23, text: "Your sense of humor always makes me smile", emoji: "😄" },
  { id: 24, text: "The way you cuddle up next to me on cold nights", emoji: "🤗" },
  { id: 25, text: "You make me feel like the luckiest person alive", emoji: "🍀" },
  { id: 26, text: "Your creativity blows my mind every day", emoji: "🎨" },
  { id: 27, text: "The way you smell when I hold you close", emoji: "💐" },
  { id: 28, text: "You always know how to make me feel better", emoji: "💙" },
  { id: 29, text: "Your love has transformed my entire life", emoji: "🦋" },
  { id: 30, text: "The way you get excited about the things you love", emoji: "🎉" },
  { id: 31, text: "You are beautiful inside and out, always", emoji: "🌹" },
  { id: 32, text: "The way you challenge me to grow", emoji: "🌱" },
  { id: 33, text: "Your hugs can fix anything in the world", emoji: "🫂" },
  { id: 34, text: "The way you look in the morning sunlight", emoji: "☀️" },
  { id: 35, text: "You make our house feel like a home", emoji: "🏠" },
  { id: 36, text: "The way you take care of everyone around you", emoji: "💕" },
  { id: 37, text: "Your determination is incredibly attractive", emoji: "💎" },
  { id: 38, text: "The way you look when you're concentrating", emoji: "🧐" },
  { id: 39, text: "You are the reason I believe in forever", emoji: "♾️" },
  { id: 40, text: "The way you always find a way to surprise me", emoji: "🎁" },
  { id: 41, text: "Your laughter is my favorite melody", emoji: "🎶" },
  { id: 42, text: "The way you make time for the people you love", emoji: "⏰" },
  { id: 43, text: "You are my calm in every storm", emoji: "🌊" },
  { id: 44, text: "The way you make even the simplest moments special", emoji: "⭐" },
  { id: 45, text: "Your dreams are as beautiful as you are", emoji: "🌙" },
  { id: 46, text: "The way you motivate me to chase my goals", emoji: "🏆" },
  { id: 47, text: "You are the best thing that ever happened to me", emoji: "💖" },
  { id: 48, text: "The way you make every day an adventure", emoji: "🗺️" },
  { id: 49, text: "Your love is the greatest gift I've ever received", emoji: "🎀" },
  { id: 50, text: "I choose you, today and every day, forever", emoji: "💎" },
];

export const favoriteThings: FavoriteThing[] = [
  { id: "1", category: "Food", name: "Sushi & Pasta", description: "The way your eyes light up when you take the first bite of your favorite meal", icon: "🍣" },
  { id: "2", category: "Drink", name: "Caramel Latte", description: "Sweet, warm, and comforting - just like you", icon: "☕" },
  { id: "3", category: "Movie", name: "The Notebook", description: "Our go-to movie for those cozy nights in together", icon: "🎬" },
  { id: "4", category: "Song", name: "Perfect - Ed Sheeran", description: "Our song. Every word reminds me of you", icon: "🎵" },
  { id: "5", category: "Color", name: "Lavender & Rose Gold", description: "Soft, elegant, and breathtakingly beautiful - just like you", icon: "🎨" },
  { id: "6", category: "Season", name: "Autumn", description: "Golden leaves, cozy sweaters, and warm evenings together", icon: "🍂" },
  { id: "7", category: "Memory", name: "Our First Dance", description: "The world disappeared and it was just you and me", icon: "💃" },
  { id: "8", category: "Flower", name: "Peonies", description: "Delicate, beautiful, and full of love", icon: "🌸" },
];

export const datePlaces: DatePlace[] = [
  { id: "1", name: "The Golden Fork", description: "An intimate fine dining experience with candlelit tables and live piano music. Perfect for celebrating our love.", time: "6:00 PM - 11:00 PM", budget: "$$$$", image: "/images/restaurant.jpg", type: "restaurant" },
  { id: "2", name: "Bean & Bloom Café", description: "A cozy artisan café with the most beautiful flower arrangements. Their lavender lattes are divine.", time: "8:00 AM - 8:00 PM", budget: "$$", image: "/images/cafe.jpg", type: "cafe" },
  { id: "3", name: "Riverside Gardens", description: "A picturesque park with cherry blossom trees, winding paths, and a beautiful lake.", time: "Dawn to Dusk", budget: "Free", image: "/images/park.jpg", type: "park" },
  { id: "4", name: "Starlight Cinema", description: "Private screening rooms with plush velvet seats and gourmet popcorn.", time: "5:00 PM - 12:00 AM", budget: "$$$", image: "/images/cinema.jpg", type: "cinema" },
  { id: "5", name: "Moonlit Lake", description: "A serene lake that reflects the moonlight like a mirror. Pure magic at sunset.", time: "24/7", budget: "Free", image: "/images/lake.jpg", type: "lake" },
  { id: "6", name: "Sunset Point", description: "The highest viewpoint in the city with panoramic views of the golden horizon.", time: "4:00 PM - 9:00 PM", budget: "$", image: "/images/sunset.jpg", type: "viewpoint" },
  { id: "7", name: "Sweet Dreams Patisserie", description: "Award-winning desserts that look like works of art. Their rose petal cake is heavenly.", time: "10:00 AM - 10:00 PM", budget: "$$", image: "/images/dessert.jpg", type: "dessert" },
];

export const restaurants: Restaurant[] = [
  { id: "1", name: "The Golden Fork", cuisine: "Italian Fine Dining", distance: "2.3 km", budget: "₹2,500 - ₹4,000", rating: 4.9, dressCode: "Smart Casual", bestDishes: ["Truffle Risotto", "Osso Buco", "Tiramisu"], description: "An enchanting Italian restaurant with candlelit tables, vaulted ceilings, and a wine cellar that rivals the finest in the city.", image: "/images/restaurant-1.jpg" },
  { id: "2", name: "Sakura Garden", cuisine: "Japanese", distance: "3.1 km", budget: "₹1,800 - ₹3,000", rating: 4.8, dressCode: "Casual Elegant", bestDishes: ["Omakase Sushi", "Wagyu Tataki", "Matcha Tiramisu"], description: "Traditional Japanese aesthetics meet modern culinary artistry. Every dish is a masterpiece.", image: "/images/restaurant-2.jpg" },
  { id: "3", name: "Le Petit Bistro", cuisine: "French", distance: "1.8 km", budget: "₹2,000 - ₹3,500", rating: 4.7, dressCode: "Smart Casual", bestDishes: ["Coq au Vin", "Crème Brûlée", "Duck Confit"], description: "A charming Parisian-style bistro with outdoor seating under twinkling string lights.", image: "/images/restaurant-3.jpg" },
  { id: "4", name: "Ember & Oak", cuisine: "Modern European", distance: "4.2 km", budget: "₹3,000 - ₹5,000", rating: 4.9, dressCode: "Formal", bestDishes: ["Smoked Wagyu", "Lobster Thermidor", "Chocolate Fondant"], description: "A luxurious dining experience with open-fire cooking and the most stunning rooftop views.", image: "/images/restaurant-4.jpg" },
];

export const placesToVisit: PlaceToVisit[] = [
  { id: "1", name: "Mountain Serenity", type: "Mountains", description: "Majestic peaks that touch the clouds. A place where time stands still and love grows stronger.", image: "/images/mountain.jpg", travelTime: "3 hours", bestSeason: "Winter" },
  { id: "2", name: "Crystal Lake", type: "Lake", description: "Waters so clear they mirror the sky. Perfect for quiet moments and whispered promises.", image: "/images/lake-travel.jpg", travelTime: "1.5 hours", bestSeason: "Summer" },
  { id: "3", name: "Cascade Falls", type: "Waterfall", description: "Nature's most beautiful symphony. Feel the mist on your face and love in your heart.", image: "/images/waterfall.jpg", travelTime: "2 hours", bestSeason: "Monsoon" },
  { id: "4", name: "Velvet Brew", type: "Cafe", description: "A hidden gem with the most aromatic coffee and pastries that melt in your mouth.", image: "/images/cafe-travel.jpg", travelTime: "20 minutes", bestSeason: "All Year" },
  { id: "5", name: "Temple of Tranquility", type: "Temple", description: "Ancient architecture and serene gardens. A place to find peace and gratitude together.", image: "/images/temple.jpg", travelTime: "45 minutes", bestSeason: "All Year" },
  { id: "6", name: "City of Lights", type: "City Lights", description: "A million lights below us, a universe of love above. Our own little city adventure.", image: "/images/citylights.jpg", travelTime: "30 minutes", bestSeason: "Winter" },
  { id: "7", name: "Open Road", type: "Road Trip", description: "Windows down, music up, and nowhere to be but together. The journey IS the destination.", image: "/images/roadtrip.jpg", travelTime: "Flexible", bestSeason: "Autumn" },
  { id: "8", name: "Stargazer's Hill", type: "Night Viewpoint", description: "Where we lay on our backs and count the stars, making wishes on every single one.", image: "/images/stargazer.jpg", travelTime: "40 minutes", bestSeason: "Summer" },
];

export const bucketList: BucketItem[] = [
  { id: 1, text: "Watch sunrise together", completed: false, icon: "🌅" },
  { id: 2, text: "Travel abroad", completed: false, icon: "✈️" },
  { id: 3, text: "Cook a meal together", completed: false, icon: "👨‍🍳" },
  { id: 4, text: "Go camping under the stars", completed: false, icon: "⛺" },
  { id: 5, text: "Take professional photos", completed: false, icon: "📸" },
  { id: 6, text: "Watch the stars all night", completed: false, icon: "🌟" },
  { id: 7, text: "Ride a hot air balloon", completed: false, icon: "🎈" },
  { id: 8, text: "Plant a tree together", completed: false, icon: "🌳" },
  { id: 9, text: "Build a home together", completed: false, icon: "🏠" },
  { id: 10, text: "Learn to dance together", completed: false, icon: "💃" },
  { id: 11, text: "Write letters to our future selves", completed: false, icon: "✉️" },
  { id: 12, text: "Create a scrapbook of memories", completed: false, icon: "📖" },
  { id: 13, text: "Have a picnic by the lake", completed: false, icon: "🧺" },
  { id: 14, text: "Dance in the rain", completed: false, icon: "🌧️" },
  { id: 15, text: "Visit a vineyard", completed: false, icon: "🍇" },
];

export const mapPins: MapPin[] = [
  { id: "1", name: "The Golden Fork", type: "restaurant", x: 35, y: 25, description: "Our favorite fine dining spot", image: "/images/restaurant-1.jpg" },
  { id: "2", name: "Bean & Bloom", type: "cafe", x: 55, y: 35, description: "Where we have our morning coffees", image: "/images/cafe.jpg" },
  { id: "3", name: "Petal & Stem", type: "flowershop", x: 25, y: 50, description: "Beautiful flower shop", image: "/images/flowershop.jpg" },
  { id: "4", name: "Starlight Cinema", type: "cinema", x: 65, y: 55, description: "Our movie nights", image: "/images/cinema.jpg" },
  { id: "5", name: "Riverside Walk", type: "walking", x: 45, y: 65, description: "Our evening walking route", image: "/images/park.jpg" },
  { id: "6", name: "Sunset Viewpoint", type: "viewpoint", x: 75, y: 30, description: "Best sunset in town", image: "/images/sunset.jpg" },
  { id: "7", name: "Moonlit Lake", type: "lake", x: 50, y: 80, description: "Peaceful evenings by the water", image: "/images/lake.jpg" },
];

export const galleryImages: GalleryImage[] = [
  { id: "1", src: "/images/story-1.jpeg", alt: "Our Story Begins", caption: "Where our journey started" },
  { id: "2", src: "/images/story-2.avif", alt: "A Special Moment", caption: "A moment that changed everything" },
  { id: "3", src: "/images/story-3.jpg", alt: "Together", caption: "Side by side, always" },
  { id: "4", src: "/images/story-4.avif", alt: "Beautiful Memory", caption: "A memory I hold close to my heart" },
  { id: "5", src: "/images/story-5.jpg", alt: "Our Adventure", caption: "Every adventure is better with you" },
  { id: "6", src: "/images/story-6.jpg", alt: "Love Story", caption: "The most beautiful story ever told" },
  { id: "7", src: "/images/story-7.jpg", alt: "Forever", caption: "This is just the beginning of us" },
];

export const musicTracks: MusicTrack[] = [
  { id: "1", title: "Perfect", artist: "Ed Sheeran", src: "/music/perfect.mp3", cover: "/images/album-1.jpg" },
  { id: "2", title: "All of Me", artist: "John Legend", src: "/music/allofme.mp3", cover: "/images/album-2.jpg" },
  { id: "3", title: "A Thousand Years", artist: "Christina Perri", src: "/music/thousand.mp3", cover: "/images/album-3.jpg" },
  { id: "4", title: "At Last", artist: "Etta James", src: "/music/atlast.mp3", cover: "/images/album-4.jpg" },
  { id: "5", title: "Make You Feel My Love", artist: "Adele", src: "/music/makeyoufeel.mp3", cover: "/images/album-5.jpg" },
];
