// Each item can have an `img` URL for display in the menu & cart
const MENU = {
  burgers: {
    note: "All sandwiches served fresh off the grill.",
    items: [
      { name: "Cheeseburger", price: 12.99, combo: null, desc: "A beef burger grilled to perfection topped with lettuce, tomatoes, onions, pickles, ketchup and mayo.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", tag: "Popular" },
      { name: "Double Cheeseburger", price: 15.99, combo: null, desc: "Juicy double beef patties layered with melted cheese.", img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80" },
      { name: "Grilled Chicken Sandwich Combo", price: 16.99, combo: null, desc: "Juicy grilled chicken with melted cheese, lettuce, tomato, and onions on a soft bun.", img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80" },
      { name: "Beef Gyro", price: 11.99, combo: null, desc: "Juicy beef wrapped in a warm pita bread with fresh veggies and garlic sauce.", img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80" },
      { name: "Chicken Gyro", price: 12.99, combo: null, desc: "Juicy chicken wrapped in a warm pita bread with fresh veggies and garlic sauce.", img: "https://images.unsplash.com/photo-1619881589316-ea41841d9ecc?w=400&q=80" },
      { name: "Beef Philly Cheese Steak", price: 17.25, combo: null, desc: "Thinly sliced beef and melted cheese in a classic 10 inch Philly-style hero bun.", img: "https://images.unsplash.com/photo-1631400693968-e4dce2c04a68?w=400&q=80", tag: "🔥 Most Loved" },
      { name: "Chicken Philly Cheese Steak", price: 17.99, combo: null, desc: "Chopped chicken and melted cheese with sautéed onions and green peppers on a soft hero bun.", img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80" },
      { name: "Fried Chicken Sandwich", price: 13.99, combo: null, desc: "Crispy fried chicken patty in a bun, with a perfect crunch and juicy flavor.", img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80" }
    ]
  },
  rice: {
    note: "Hearty platters served with signature sauces. Includes a side of pop.",
    items: [
      { name: "Chicken on Rice", price: 11.99, priceLabel: "$11.99 / $15.25", combo: null, desc: "Tender juicy grilled chicken on a bed of flavourful rice, topped with homemade sauces.", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80", tag: "#1 Most Liked" },
      { name: "Lamb on Rice", price: 11.99, priceLabel: "$11.99 / $15.99", combo: null, desc: "Seasoned halal lamb served over fragrant rice with signature sauce.", img: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&q=80" },
      { name: "Fish on Rice", price: 11.99, priceLabel: "$11.99 / $15.99", combo: null, desc: "Golden fried fish served over seasoned rice with fresh salad.", img: "https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=400&q=80" },
      { name: "Wings (5) on Rice", price: 15.25, combo: null, desc: "5 crispy wings served over seasoned rice, with a pop.", img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80" },
      { name: "Big Daddy's Steak on Fries", price: 11.25, priceLabel: "$11.25 / $16.25", combo: null, desc: "Juicy steak served on top of crispy fries with a side of pop.", img: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&q=80", tag: "#2 Most Liked" },
      { name: "Big Daddy's Chicken on Fries", price: 11.25, priceLabel: "$11.25 / $15.25", combo: null, desc: "Crispy fries topped with juicy chicken and a refreshing pop.", img: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&q=80" },
      { name: "Big Daddy's Fish on Fries", price: 12.99, priceLabel: "$12.99 / $16.25", combo: null, desc: "Golden fried fish over crispy fries, topped with our signature sauce.", img: "https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=400&q=80" },
      { name: "Big Daddy's Lamb on Fries", price: 11.25, priceLabel: "$11.25 / $16.25", combo: null, desc: "Seasoned halal lamb over golden crispy fries with signature sauce.", img: "https://images.unsplash.com/photo-574894709920-11b28e7367e3?w=400&q=80" },
      { name: "Poutine", price: 9.99, combo: null, desc: "French fries topped with cheese curds and rich gravy.", img: "https://images.unsplash.com/photo-1624811533744-f85d5325b0f6?w=400&q=80" },
      { name: "Large Steak Poutine", price: 21.99, combo: null, desc: "Juicy steak served over crispy fries, topped with cheese curds.", img: "https://images.unsplash.com/photo-1624811533744-f85d5325b0f6?w=400&q=80", tag: "🔥 Fan Fave" }
    ]
  },
  salads: {
    note: "Fresh salads made to order with your choice of protein.",
    items: [
      { name: "Garden Salad", price: 5.99, priceLabel: "$5.99 / $8.99", combo: null, desc: "Crisp fresh garden salad — available small or large.", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
      { name: "Gyro on Salad", price: 7.99, priceLabel: "$7.99 / $12.99", combo: null, desc: "Seasoned gyro meat over a fresh bed of greens.", img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80" },
      { name: "Chicken on Salad", price: 8.99, priceLabel: "$8.99 / $12.99", combo: null, desc: "Grilled chicken over a crisp garden salad.", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" },
      { name: "Fish on Salad", price: 13.99, combo: null, desc: "A mouthwatering large piece of fried fish prepared to perfection, with a refreshing salad.", img: "https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=400&q=80", tag: "#3 Most Liked" },
      { name: "Steak Poutine", price: 11.99, priceLabel: "$11.99 / $15.99", combo: null, desc: "Crispy fries loaded with juicy steak and classic poutine toppings.", img: "https://images.unsplash.com/photo-1624811533744-f85d5325b0f6?w=400&q=80" },
      { name: "Chicken Poutine", price: 11.99, priceLabel: "$11.99 / $15.99", combo: null, desc: "Fries, cheese curds, gravy, and grilled chicken.", img: "https://images.unsplash.com/photo-1624811533744-f85d5325b0f6?w=400&q=80" }
    ]
  },
  wings: {
    note: "Wings available Buffalo or Fried. Crispy halal fried fish made fresh daily.",
    items: [
      { name: "Chicken Wings (6 pcs)", price: 10.25, combo: null, desc: "6 crispy halal wings — Buffalo or Fried.", img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80", tag: "Popular" },
      { name: "Chicken Wings (12 pcs)", price: 18.25, combo: null, desc: "12 crispy halal wings — Buffalo or Fried.", img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80" },
      { name: "Chicken Wings (18 pcs)", price: 24.25, combo: null, desc: "18 crispy halal wings — great for sharing.", img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80" },
      { name: "Chicken Wings (24 pcs)", price: 27.25, combo: null, desc: "24 wings — the party pack. Buffalo or Fried.", img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80" },
      { name: "Fried Chicken Combo (2 pcs)", price: 9.99, combo: null, desc: "2 pieces of crispy fried chicken served with fries.", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80" },
      { name: "Fried Fish (2 pcs)", price: 8.99, combo: null, desc: "2 golden fried whiting fillets.", img: "https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=400&q=80" },
      { name: "Fried Fish (4 pcs)", price: 16.99, combo: null, desc: "4 golden fried whiting fillets — great value.", img: "https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=400&q=80" }
    ]
  },
  student: {
    note: "Available 11:30 AM – 1:30 PM. Student ID may be required.",
    items: [
      { name: "Small Chicken on Fries", price: 5.99, combo: null, desc: "Crispy fries topped with juicy chicken — student deal!", img: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&q=80" },
      { name: "2 pcs Chicken Combo", price: 5.99, combo: null, desc: "2 pieces of crispy fried chicken combo — student price.", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80" },
      { name: "Poutine Combo", price: 5.99, combo: null, desc: "Classic poutine combo — student exclusive deal.", img: "https://images.unsplash.com/photo-1624811533744-f85d5325b0f6?w=400&q=80" },
      { name: "Hamburger", price: 4.99, combo: null, desc: "Classic halal hamburger — affordable student favourite.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
      { name: "Fried Chicken Sandwich", price: 4.99, combo: null, desc: "Crispy fried chicken sandwich — student price.", img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80" }
    ]
  }
};
