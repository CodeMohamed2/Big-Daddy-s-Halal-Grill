// ── BIG DADDY'S HALAL GRILL — Menu Data ──────────────
const MENU_CATEGORIES = [
  { id: "burgers",  label: "🍔 Burgers & Sandwiches" },
  { id: "rice",     label: "🍛 Rice & Fries Platters" },
  { id: "salads",   label: "🥗 Salads & Poutine" },
  { id: "wings",    label: "🍗 Wings & Fish" },
  { id: "sides",    label: "🍟 Sides" },
  { id: "student",  label: "🎓 Student Specials" },
];

// Using Unsplash CDN for placeholder food images (always available, no hosting needed)
const IMG = {
  burger:       "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
  doubleBurger: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80",
  chickenBurger:"https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80",
  beefGyro:     "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&q=80",
  chickenGyro:  "https://images.unsplash.com/photo-1619881589316-ea41841d9ecc?w=600&q=80",
  beefPhilly:   "https://images.unsplash.com/photo-1631400693968-e4dce2c04a68?w=600&q=80",
  chickenPhilly:"https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80",
  friedChicken: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&q=80",
  chickenRice:  "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
  lambRice:     "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&q=80",
  fishRice:     "https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=600&q=80",
  steakFries:   "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&q=80",
  chickenFries: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&q=80",
  fishFries:    "https://images.unsplash.com/photo-1536510233921-8e00c3a27c7e?w=600&q=80",
  salad:        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
  chickenSalad: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  poutine:      "https://images.unsplash.com/photo-1624811533744-f85d5325b0f6?w=600&q=80",
  wings:        "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&q=80",
  wingsPlate:   "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&q=80",
  fries:        "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=80",
  fish:         "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=600&q=80",
};

const MENU = {
  burgers: {
    note: "All sandwiches served fresh off the grill.",
    items: [
      { id:"cheeseburger",        name:"Cheeseburger",                          price:12.99, img:IMG.burger,        tag:"Popular",       desc:"A beef burger grilled to perfection topped with lettuce, tomatoes, onions, pickles, ketchup and mayonnaise.", hasCombo:true,  comboPrice:19.99 },
      { id:"double-cheeseburger", name:"Double Cheeseburger",                   price:15.99, img:IMG.doubleBurger,  tag:null,            desc:"Juicy double beef patties layered with melted cheese.", hasCombo:true, comboPrice:19.99 },
      { id:"grilled-chicken",     name:"Grilled Chicken Sandwich Combo",        price:16.99, img:IMG.chickenBurger, tag:null,            desc:"Juicy grilled chicken with melted cheese, lettuce, tomato, and onions on a soft bun.", hasCombo:false },
      { id:"beef-gyro",           name:"Beef Gyro",                             price:11.99, img:IMG.beefGyro,      tag:null,            desc:"Juicy beef wrapped in a warm pita bread with fresh veggies and garlic sauce.", hasCombo:true, comboPrice:15.49 },
      { id:"chicken-gyro",        name:"Chicken Gyro",                          price:12.99, img:IMG.chickenGyro,   tag:null,            desc:"Juicy chicken wrapped in a warm pita bread with fresh veggies and garlic sauce.", hasCombo:true, comboPrice:15.49 },
      { id:"beef-philly",         name:"Beef Philly Cheese Steak",              price:17.25, img:IMG.beefPhilly,    tag:"🔥 Most Loved", desc:"Thinly sliced beef and melted cheese in a classic 10 inch Philly-style hero bun.", hasCombo:true, comboPrice:21.49 },
      { id:"chicken-philly",      name:"Chicken Philly Cheese Steak",           price:17.99, img:IMG.chickenPhilly, tag:null,            desc:"Chopped chicken and melted cheese with sautéed onions and green peppers on a soft hero bun.", hasCombo:true, comboPrice:21.49 },
      { id:"fried-chicken-sand",  name:"Fried Chicken Sandwich",                price:13.99, img:IMG.friedChicken,  tag:null,            desc:"Crispy fried chicken patty in a bun, with a perfect crunch and juicy flavor.", hasCombo:true, comboPrice:17.99 },
      { id:"cheese-beef-strips",  name:"Cheeseburger with Beef Strips",         price:13.99, img:IMG.burger,        tag:null,            desc:"Juicy beef strips paired with melted cheese in a classic burger.", hasCombo:false },
      { id:"whiting-fish-hero",   name:"Whiting Fish on Hero",                  price:15.99, img:IMG.fish,          tag:null,            desc:"Whiting fish served on a hero. Perfectly spiced and battered to perfection.", hasCombo:true, comboPrice:18.99 },
      { id:"grilled-chick-hero",  name:"Grilled Chicken on a Hero",             price:15.99, img:IMG.chickenBurger, tag:null,            desc:"Juicy chicken served on a hero sandwich.", hasCombo:true, comboPrice:21.49 },
      { id:"fish-sandwich",       name:"Fish Sandwich",                         price:13.99, img:IMG.fish,          tag:null,            desc:"A delectable piece of fried fish, lightly battered on a brioche bun topped with veggies and in-house sauces.", hasCombo:false },
      { id:"nuggets-fries",       name:"Nuggets with Fries",                    price:12.99, img:IMG.friedChicken,  tag:null,            desc:"5 pieces of crispy, succulent, tender nuggets carefully fried to perfection, served with French fries.", hasCombo:false },
      { id:"festival-philly",     name:'Festival Special 8" Beef Philly',       price:18.99, img:IMG.beefPhilly,    tag:null,            desc:"Tender beef slices with melted cheese on a soft 8 inch hero bun — a classic delight.", hasCombo:false },
    ]
  },
  rice: {
    note: "Hearty platters served with signature sauces. Includes a side of pop.",
    items: [
      { id:"chicken-rice",        name:"Beat the Chill ❄️ Chicken on Rice",     price:24.99, img:IMG.chickenRice,   tag:"#1 Most Liked", desc:"Tender juicy grilled chicken served on a bed of flavourful rice, topped with our signature homemade sauces.", hasCombo:false },
      { id:"lamb-rice",           name:"Lamb on Rice",                           price:23.99, img:IMG.lambRice,      tag:null,            desc:"Tender lamb served on a bed of rice, complemented by a refreshing pop.", hasCombo:false },
      { id:"fish-rice",           name:"Fish on Rice",                           price:24.99, img:IMG.fishRice,      tag:null,            desc:"Fish served on a bed of rice with a fizzy pop accompaniment.", hasCombo:false },
      { id:"autumn-fish-rice",    name:"Autumn Fried Fish on Rice with Salad",   price:21.99, img:IMG.fishRice,      tag:"#3 Most Liked", desc:"A mouthwatering large single piece of fish, fried and prepared to perfection, accompanied with flavourful rice and a refreshing salad.", hasCombo:false },
      { id:"wings-rice",          name:"Wings (5) on Rice with Pop",             price:22.99, img:IMG.wingsPlate,    tag:null,            desc:"5 chicken wings served on a bed of rice with a refreshing pop.", hasCombo:false },
      { id:"steak-fries",         name:"Big Daddy's Steak on Fries",             price:21.99, img:IMG.steakFries,    tag:"#2 Most Liked", desc:"Juicy steak served on top of crispy fries with a side of pop.", hasCombo:false },
      { id:"chicken-fries",       name:"Big Daddy's Chicken on Fries",           price:18.99, img:IMG.chickenFries,  tag:null,            desc:"Crispy fries topped with juicy chicken and a refreshing pop.", hasCombo:false },
      { id:"large-chicken-fries", name:"Big Daddy's Large Chicken on Fries",     price:24.99, img:IMG.chickenFries,  tag:null,            desc:"Juicy chicken served on top of crispy fries with a refreshing drink.", hasCombo:false },
      { id:"fish-fries",          name:"Big Daddy's Fish on Fries with Pop",     price:19.25, img:IMG.fishFries,     tag:null,            desc:"Fish on top of crispy fries, served with a side of pop.", hasCombo:false },
      { id:"lamb-fries",          name:"Big Daddy's Lamb on Fries with Pop",     price:16.99, img:IMG.steakFries,    tag:null,            desc:"Tender lamb served on top of crispy fries with a side of pop.", hasCombo:false },
      { id:"large-lamb-fries",    name:"Big Daddy's Large Lamb on Fries",        price:20.99, img:IMG.steakFries,    tag:null,            desc:"Grilled lamb marinated to perfection, served on fries with creamy tzatziki sauce and a refreshing pop.", hasCombo:false },
    ]
  },
  salads: {
    note: "Fresh salads and loaded poutines made to order.",
    items: [
      { id:"chicken-salad",       name:"Chicken on Salad",                       price:19.25, img:IMG.chickenSalad,  tag:"Popular",       desc:"Chicken pieces over crisp lettuce with tomatoes, cucumbers, and red onions, drizzled with creamy sauce.", hasCombo:false },
      { id:"garden-salad",        name:"Garden Salad",                           price:9.65,  img:IMG.salad,         tag:null,            desc:"Light, refreshing salad of mixed greens — a simple, healthy choice.", hasCombo:false },
      { id:"gyro-salad",          name:"Gyro on Salad",                          price:17.49, img:IMG.salad,         tag:"Popular",       desc:"Juicy gyro meat served on a bed of fresh greens.", hasCombo:false },
      { id:"fish-salad",          name:"Fish on Salad",                          price:19.25, img:IMG.fishRice,      tag:null,            desc:"Fish fillet served over salad greens — a simple, healthy choice.", hasCombo:false },
      { id:"poutine",             name:"Poutine",                                price:9.99,  img:IMG.poutine,       tag:null,            desc:"French fries topped with cheese curds.", hasCombo:false },
      { id:"large-steak-poutine", name:"Large Steak Poutine",                    price:21.99, img:IMG.poutine,       tag:null,            desc:"Juicy steak served over crispy fries, topped with cheese curds.", hasCombo:false },
      { id:"steak-poutine",       name:"Steak Poutine",                          price:15.50, img:IMG.poutine,       tag:null,            desc:"Tender steak served on top of crispy fries, smothered in rich gravy.", hasCombo:false },
      { id:"chicken-poutine",     name:"Chicken Poutine",                        price:14.50, img:IMG.poutine,       tag:null,            desc:"Crispy fries topped with chicken and cheese curds.", hasCombo:false },
      { id:"large-chick-poutine", name:"Large Chicken Poutine",                  price:19.99, img:IMG.poutine,       tag:"Popular",       desc:"Grilled chicken atop crispy fries, smothered in rich gravy and cheese curds for a hearty, satisfying meal.", hasCombo:false },
    ]
  },
  wings: {
    note: "Wings available Buffalo or Fried. Halal fried fish made fresh daily.",
    items: [
      { id:"buffalo-wings",       name:"Buffalo Chicken Wings",                  price:13.20, img:IMG.wings,         tag:"Popular",       desc:"Crispy chicken wings smothered in a tangy buffalo sauce.", hasCombo:false },
      { id:"wings-6",             name:"Chicken Wings (6 pcs)",                  price:10.25, img:IMG.wings,         tag:null,            desc:"6 crispy halal wings — Buffalo or Fried.", hasCombo:false },
      { id:"wings-12",            name:"Chicken Wings (12 pcs)",                 price:18.25, img:IMG.wingsPlate,    tag:null,            desc:"12 crispy halal wings — Buffalo or Fried.", hasCombo:false },
      { id:"wings-18",            name:"Chicken Wings (18 pcs)",                 price:24.25, img:IMG.wingsPlate,    tag:null,            desc:"18 crispy halal wings — great for sharing.", hasCombo:false },
      { id:"wings-24",            name:"Chicken Wings (24 pcs)",                 price:27.25, img:IMG.wingsPlate,    tag:null,            desc:"24 wings — the party pack.", hasCombo:false },
      { id:"naked-wings-20",      name:"20 Naked Wings with Small Fries",        price:28.99, img:IMG.wingsPlate,    tag:null,            desc:"Fresh, succulent and crispy wings made to order paired with small fries.", hasCombo:false },
      { id:"whiting-fish",        name:"Whiting Fish",                           price:10.99, img:IMG.fish,          tag:null,            desc:"Delicate white fish with a mild flavour.", hasCombo:false },
      { id:"fried-fish-2",        name:"Fried Fish (2 pcs)",                     price:8.99,  img:IMG.fish,          tag:null,            desc:"2 golden fried whiting fillets.", hasCombo:false },
      { id:"fried-fish-4",        name:"Fried Fish (4 pcs)",                     price:16.99, img:IMG.fish,          tag:null,            desc:"4 golden fried whiting fillets — great value.", hasCombo:false },
      { id:"fried-chick-combo-2", name:"Fried Chicken Combo (2 pcs)",            price:9.99,  img:IMG.friedChicken,  tag:null,            desc:"2 pieces of crispy fried chicken served with fries.", hasCombo:false },
      { id:"extra-chick-thigh",   name:"Side: Grilled Chicken (Thigh)",          price:9.99,  img:IMG.chickenRice,   tag:null,            desc:"Extra grilled chicken thigh meat on the side — protein boost for your meal.", hasCombo:false },
      { id:"extra-chick-breast",  name:"Side: Grilled Chicken (Breast)",         price:10.99, img:IMG.chickenRice,   tag:null,            desc:"Extra grilled chicken breast — juicy and perfect as a side.", hasCombo:false },
      { id:"extra-steak",         name:"Side: Extra Steak Meat",                 price:13.25, img:IMG.steakFries,    tag:null,            desc:"Our famous hearty and wholesome steak meat as an extra side portion.", hasCombo:false },
    ]
  },
  sides: {
    note: "Add something extra to your order.",
    items: [
      { id:"fries",               name:"Fries",                                  price:6.99,  img:IMG.fries,         tag:null,            desc:"Crispy potato sticks served hot.", hasCombo:false },
      { id:"rice-side",           name:"Rice",                                   price:6.99,  img:IMG.chickenRice,   tag:null,            desc:"Steaming hot serving of rice.", hasCombo:false },
      { id:"pop",                 name:"Pop",                                    price:2.99,  img:null,              tag:"Popular",       desc:"A refreshing carbonated soft drink.", hasCombo:false },
      { id:"gravy",               name:"Gravy",                                  price:3.25,  img:null,              tag:null,            desc:"A side order of gravy to add that special desired taste to your meal.", hasCombo:false },
      { id:"white-sauce",         name:"White Sauce",                            price:2.25,  img:null,              tag:"Popular",       desc:"Our signature handcrafted sauce — creamy, refreshing with a perfect addition of tanginess.", hasCombo:false },
      { id:"hot-sauce",           name:"Hot Sauce",                              price:2.25,  img:null,              tag:"Popular",       desc:"Our hot sauce adds that extra kick of heat that will level up any dish.", hasCombo:false },
      { id:"bbq-sauce",           name:"BBQ Sauce",                              price:2.25,  img:null,              tag:null,            desc:"Enjoy a smokey touch to your meal by adding our signature BBQ sauce.", hasCombo:false },
      { id:"chipotle-sauce",      name:"Chipotle Sauce",                         price:2.75,  img:null,              tag:null,            desc:"Handcrafted chipotle sauce — creamy with a touch of spicy flavour.", hasCombo:false },
      { id:"big-daddys-sauce",    name:"Big Daddy's Sauce",                      price:5.00,  img:null,              tag:null,            desc:"A trio of our most requested sauces. Will make your palate explode with flavour!", hasCombo:false },
      { id:"extra-cheese",        name:"Extra Cheese",                           price:3.00,  img:null,              tag:null,            desc:"Extra cheese on the side.", hasCombo:false },
      { id:"buffalo-sauce",       name:"Buffalo Sauce",                          price:2.50,  img:null,              tag:null,            desc:"Tangy and spicy sauce, perfect for adding a kick to your favorite dishes.", hasCombo:false },
    ]
  },
  student: {
    note: "Available 11:30 AM – 1:30 PM. Student ID may be required.",
    items: [
      { id:"s-chicken-fries",     name:"Small Chicken on Fries",                 price:5.99,  img:IMG.chickenFries,  tag:null,            desc:"Crispy fries topped with juicy chicken — student deal!", hasCombo:false },
      { id:"s-2pc-chicken",       name:"2 pcs Chicken Combo",                    price:5.99,  img:IMG.friedChicken,  tag:null,            desc:"2 pieces of crispy fried chicken combo — student price.", hasCombo:false },
      { id:"s-poutine",           name:"Poutine Combo",                          price:5.99,  img:IMG.poutine,       tag:null,            desc:"Classic poutine combo — student exclusive deal.", hasCombo:false },
      { id:"s-hamburger",         name:"Hamburger",                              price:4.99,  img:IMG.burger,        tag:null,            desc:"Classic halal hamburger — affordable student favourite.", hasCombo:false },
      { id:"s-fried-chick-sand",  name:"Fried Chicken Sandwich",                 price:4.99,  img:IMG.friedChicken,  tag:null,            desc:"Crispy fried chicken sandwich — student price.", hasCombo:false },
    ]
  }
};
