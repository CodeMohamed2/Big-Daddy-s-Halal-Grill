const MENU_CATEGORIES = [
  { id: "burgers",  label: "🍔 Burgers & Sandwiches" },
  { id: "rice",     label: "🍛 Rice & Fries Platters" },
  { id: "salads",   label: "🥗 Salads & Poutine" },
  { id: "wings",    label: "🍗 Wings & Fish" },
  { id: "sides",    label: "🍟 Sides" },
  { id: "student",  label: "🎓 Student Specials" },
];

const MENU = {
  burgers: {
    note: "All sandwiches served fresh off the grill.",
    items: [
      { id:"cheeseburger",        name:"Cheeseburger",                        price:12.99, img:"images/cheeseburger.png",            tag:"Popular",       desc:"A beef burger grilled to perfection topped with lettuce, tomatoes, onions, pickles, ketchup and mayonnaise.", hasCombo:true,  comboPrice:19.99 },
      { id:"double-cheeseburger", name:"Double Cheeseburger",                 price:15.99, img:"images/double-cheeseburger.png",     tag:null,            desc:"Juicy double beef patties layered with melted cheese.", hasCombo:true, comboPrice:19.99 },
      { id:"grilled-chicken",     name:"Grilled Chicken Sandwich Combo",      price:16.99, img:"images/grilled-chicken-sandwich.png",tag:null,            desc:"Juicy grilled chicken with melted cheese, lettuce, tomato, and onions on a soft bun.", hasCombo:false },
      { id:"beef-gyro",           name:"Beef Gyro",                           price:11.99, img:"images/beef-gyro.png",               tag:null,            desc:"Juicy beef wrapped in a warm pita bread with fresh veggies and garlic sauce.", hasCombo:true, comboPrice:15.49 },
      { id:"chicken-gyro",        name:"Chicken Gyro",                        price:12.99, img:"images/chicken-gyro.png",            tag:null,            desc:"Juicy chicken wrapped in a warm pita bread with fresh veggies and garlic sauce.", hasCombo:true, comboPrice:15.49 },
      { id:"beef-philly",         name:"Beef Philly Cheese Steak",            price:17.25, img:"images/beef-philly.png",             tag:"🔥 Most Loved", desc:"Thinly sliced beef and melted cheese in a classic 10 inch Philly-style hero bun.", hasCombo:true, comboPrice:21.49 },
      { id:"chicken-philly",      name:"Chicken Philly Cheese Steak",         price:17.99, img:"images/chicken-philly.png",          tag:null,            desc:"Chopped chicken and melted cheese with sautéed onions and green peppers on a soft hero bun.", hasCombo:true, comboPrice:21.49 },
      { id:"fried-chicken-sand",  name:"Fried Chicken Sandwich",              price:13.99, img:"images/fried-chicken-sandwich.png",  tag:null,            desc:"Crispy fried chicken patty in a bun, with a perfect crunch and juicy flavor.", hasCombo:true, comboPrice:17.99 },
      { id:"cheese-beef-strips",  name:"Cheeseburger with Beef Strips",       price:13.99, img:"images/cheeseburger.png",            tag:null,            desc:"Juicy beef strips paired with melted cheese in a classic burger.", hasCombo:false },
      { id:"whiting-fish-hero",   name:"Whiting Fish on Hero",                price:15.99, img:"images/fish-on-fries.png",           tag:null,            desc:"Whiting fish served on a hero. Perfectly spiced and battered to perfection.", hasCombo:true, comboPrice:18.99 },
      { id:"grilled-chick-hero",  name:"Grilled Chicken on a Hero",           price:15.99, img:"images/grilled-chicken-sandwich.png",tag:null,            desc:"Juicy chicken served on a hero sandwich.", hasCombo:true, comboPrice:21.49 },
      { id:"fish-sandwich",       name:"Fish Sandwich",                       price:13.99, img:"images/fish-on-fries.png",           tag:null,            desc:"A delectable piece of fried fish, lightly battered on a brioche bun topped with veggies and in-house sauces.", hasCombo:false },
      { id:"nuggets-fries",       name:"Nuggets with Fries",                  price:12.99, img:"images/fried-chicken-sandwich.png",  tag:null,            desc:"5 pieces of crispy, succulent, tender nuggets carefully fried to perfection, served with French fries.", hasCombo:false },
      { id:"festival-philly",     name:'Festival Special 8" Beef Philly',     price:18.99, img:"images/beef-philly.png",             tag:null,            desc:"Tender beef slices with melted cheese on a soft 8 inch hero bun.", hasCombo:false },
    ]
  },
  rice: {
    note: "Hearty platters served with signature sauces. Includes a side of pop.",
    items: [
      { id:"chicken-rice",        name:"Beat the Chill ❄️ Chicken on Rice",   price:24.99, img:"images/chicken-on-rice.png",        tag:"#1 Most Liked", desc:"Tender juicy grilled chicken served on a bed of flavourful rice, topped with our signature homemade sauces.", hasCombo:false },
      { id:"lamb-rice",           name:"Lamb on Rice",                         price:23.99, img:"images/lamb-on-rice.png",           tag:null,            desc:"Tender lamb served on a bed of rice, complemented by a refreshing pop.", hasCombo:false },
      { id:"fish-rice",           name:"Fish on Rice",                         price:24.99, img:"images/fish-on-rice.png",           tag:null,            desc:"Fish served on a bed of rice with a fizzy pop accompaniment.", hasCombo:false },
      { id:"autumn-fish-rice",    name:"Autumn Fried Fish on Rice with Salad", price:21.99, img:"images/autumn-fish-rice.png",       tag:"#3 Most Liked", desc:"A mouthwatering large single piece of fish, fried and prepared to perfection, accompanied with flavourful rice and a refreshing salad.", hasCombo:false },
      { id:"wings-rice",          name:"Wings (5) on Rice with Pop",           price:22.99, img:"images/chicken-on-rice.png",        tag:null,            desc:"5 chicken wings served on a bed of rice with a refreshing pop.", hasCombo:false },
      { id:"steak-fries",         name:"Big Daddy's Steak on Fries",           price:21.99, img:"images/steak-on-fries.png",         tag:"#2 Most Liked", desc:"Juicy steak served on top of crispy fries with a side of pop.", hasCombo:false },
      { id:"chicken-fries",       name:"Big Daddy's Chicken on Fries",         price:18.99, img:"images/chicken-on-fries.png",       tag:null,            desc:"Crispy fries topped with juicy chicken and a refreshing pop.", hasCombo:false },
      { id:"large-chicken-fries", name:"Big Daddy's Large Chicken on Fries",   price:24.99, img:"images/chicken-on-fries.png",       tag:null,            desc:"Juicy chicken served on top of crispy fries with a refreshing drink.", hasCombo:false },
      { id:"fish-fries",          name:"Big Daddy's Fish on Fries with Pop",   price:19.25, img:"images/fish-on-fries.png",          tag:null,            desc:"Fish on top of crispy fries, served with a side of pop.", hasCombo:false },
      { id:"lamb-fries",          name:"Big Daddy's Lamb on Fries with Pop",   price:16.99, img:"images/steak-on-fries.png",         tag:null,            desc:"Tender lamb served on top of crispy fries with a side of pop.", hasCombo:false },
      { id:"large-lamb-fries",    name:"Big Daddy's Large Lamb on Fries",      price:20.99, img:"images/steak-on-fries.png",         tag:null,            desc:"Grilled lamb marinated to perfection, served on fries with creamy tzatziki sauce and a refreshing pop.", hasCombo:false },
    ]
  },
  salads: {
    note: "Fresh salads and loaded poutines made to order.",
    items: [
      { id:"chicken-salad",       name:"Chicken on Salad",                     price:19.25, img:"images/chicken-on-salad.png",       tag:"Popular",       desc:"Chicken pieces over crisp lettuce with tomatoes, cucumbers, and red onions, drizzled with creamy sauce.", hasCombo:false },
      { id:"garden-salad",        name:"Garden Salad",                         price:9.65,  img:null,                                tag:null,            desc:"Light, refreshing salad of mixed greens — a simple, healthy choice.", hasCombo:false },
      { id:"gyro-salad",          name:"Gyro on Salad",                        price:17.49, img:null,                                tag:"Popular",       desc:"Juicy gyro meat served on a bed of fresh greens.", hasCombo:false },
      { id:"fish-salad",          name:"Fish on Salad",                        price:19.25, img:"images/fish-on-rice.png",           tag:null,            desc:"Fish fillet served over salad greens — a simple, healthy choice.", hasCombo:false },
      { id:"poutine",             name:"Poutine",                              price:9.99,  img:"images/poutine.png",                tag:null,            desc:"French fries topped with cheese curds.", hasCombo:false },
      { id:"large-steak-poutine", name:"Large Steak Poutine",                  price:21.99, img:"images/large-steak-poutine.png",    tag:null,            desc:"Juicy steak served over crispy fries, topped with cheese curds.", hasCombo:false },
      { id:"steak-poutine",       name:"Steak Poutine",                        price:15.50, img:"images/steak-poutine-loaded.png",   tag:null,            desc:"Tender steak served on top of crispy fries, smothered in rich gravy.", hasCombo:false },
      { id:"chicken-poutine",     name:"Chicken Poutine",                      price:14.50, img:null,                                tag:null,            desc:"Crispy fries topped with chicken and cheese curds.", hasCombo:false },
      { id:"large-chick-poutine", name:"Large Chicken Poutine",                price:19.99, img:null,                                tag:"Popular",       desc:"Grilled chicken atop crispy fries, smothered in rich gravy and cheese curds.", hasCombo:false },
    ]
  },
  wings: {
    note: "Wings available Buffalo or Fried. Halal fried fish made fresh daily.",
    items: [
      { id:"buffalo-wings",       name:"Buffalo Chicken Wings",                price:13.20, img:null,                                tag:"Popular",       desc:"Crispy chicken wings smothered in a tangy buffalo sauce.", hasCombo:false },
      { id:"wings-6",             name:"Chicken Wings (6 pcs)",                price:10.25, img:null,                                tag:null,            desc:"6 crispy halal wings — Buffalo or Fried.", hasCombo:false },
      { id:"wings-12",            name:"Chicken Wings (12 pcs)",               price:18.25, img:null,                                tag:null,            desc:"12 crispy halal wings — Buffalo or Fried.", hasCombo:false },
      { id:"wings-18",            name:"Chicken Wings (18 pcs)",               price:24.25, img:null,                                tag:null,            desc:"18 crispy halal wings — great for sharing.", hasCombo:false },
      { id:"wings-24",            name:"Chicken Wings (24 pcs)",               price:27.25, img:null,                                tag:null,            desc:"24 wings — the party pack.", hasCombo:false },
      { id:"naked-wings-20",      name:"20 Naked Wings with Small Fries",      price:28.99, img:null,                                tag:null,            desc:"Fresh, succulent and crispy wings made to order paired with small fries.", hasCombo:false },
      { id:"whiting-fish",        name:"Whiting Fish",                         price:10.99, img:null,                                tag:null,            desc:"Delicate white fish with a mild flavour.", hasCombo:false },
      { id:"fried-fish-2",        name:"Fried Fish (2 pcs)",                   price:8.99,  img:null,                                tag:null,            desc:"2 golden fried whiting fillets.", hasCombo:false },
      { id:"fried-fish-4",        name:"Fried Fish (4 pcs)",                   price:16.99, img:null,                                tag:null,            desc:"4 golden fried whiting fillets — great value.", hasCombo:false },
      { id:"fried-chick-combo-2", name:"Fried Chicken Combo (2 pcs)",          price:9.99,  img:null,                                tag:null,            desc:"2 pieces of crispy fried chicken served with fries.", hasCombo:false },
      { id:"extra-chick-thigh",   name:"Side: Grilled Chicken (Thigh)",        price:9.99,  img:null,                                tag:null,            desc:"Extra grilled chicken thigh meat on the side.", hasCombo:false },
      { id:"extra-chick-breast",  name:"Side: Grilled Chicken (Breast)",       price:10.99, img:null,                                tag:null,            desc:"Extra grilled chicken breast — juicy and perfect as a side.", hasCombo:false },
      { id:"extra-steak",         name:"Side: Extra Steak Meat",               price:13.25, img:null,                                tag:null,            desc:"Our famous hearty and wholesome steak meat as an extra side portion.", hasCombo:false },
    ]
  },
  sides: {
    note: "Add something extra to your order.",
    items: [
      { id:"fries",               name:"Fries",                                price:6.99,  img:"images/poutine-fries.png",          tag:null,            desc:"Crispy potato sticks served hot.", hasCombo:false },
      { id:"rice-side",           name:"Rice",                                 price:6.99,  img:null,                                tag:null,            desc:"Steaming hot serving of rice.", hasCombo:false },
      { id:"pop",                 name:"Pop",                                  price:2.99,  img:null,                                tag:"Popular",       desc:"A refreshing carbonated soft drink.", hasCombo:false },
      { id:"gravy",               name:"Gravy",                                price:3.25,  img:null,                                tag:null,            desc:"A side order of gravy to add that special desired taste to your meal.", hasCombo:false },
      { id:"white-sauce",         name:"White Sauce",                          price:2.25,  img:null,                                tag:"Popular",       desc:"Our signature handcrafted sauce — creamy, refreshing with a perfect addition of tanginess.", hasCombo:false },
      { id:"hot-sauce",           name:"Hot Sauce",                            price:2.25,  img:null,                                tag:"Popular",       desc:"Our hot sauce adds that extra kick of heat that will level up any dish.", hasCombo:false },
      { id:"bbq-sauce",           name:"BBQ Sauce",                            price:2.25,  img:null,                                tag:null,            desc:"Enjoy a smokey touch to your meal by adding our signature BBQ sauce.", hasCombo:false },
      { id:"chipotle-sauce",      name:"Chipotle Sauce",                       price:2.75,  img:null,                                tag:null,            desc:"Handcrafted chipotle sauce — creamy with a touch of spicy flavour.", hasCombo:false },
      { id:"big-daddys-sauce",    name:"Big Daddy's Sauce",                    price:5.00,  img:null,                                tag:null,            desc:"A trio of our most requested sauces. Will make your palate explode with flavour!", hasCombo:false },
      { id:"extra-cheese",        name:"Extra Cheese",                         price:3.00,  img:null,                                tag:null,            desc:"Extra cheese on the side.", hasCombo:false },
      { id:"buffalo-sauce",       name:"Buffalo Sauce",                        price:2.50,  img:null,                                tag:null,            desc:"Tangy and spicy sauce, perfect for adding a kick to your favorite dishes.", hasCombo:false },
    ]
  },
  student: {
    note: "Available 11:30 AM – 1:30 PM. Student ID may be required.",
    items: [
      { id:"s-chicken-fries",     name:"Small Chicken on Fries",               price:5.99,  img:"images/chicken-on-fries.png",       tag:null,            desc:"Crispy fries topped with juicy chicken — student deal!", hasCombo:false },
      { id:"s-2pc-chicken",       name:"2 pcs Chicken Combo",                  price:5.99,  img:null,                                tag:null,            desc:"2 pieces of crispy fried chicken combo — student price.", hasCombo:false },
      { id:"s-poutine",           name:"Poutine Combo",                        price:5.99,  img:"images/poutine.png",                tag:null,            desc:"Classic poutine combo — student exclusive deal.", hasCombo:false },
      { id:"s-hamburger",         name:"Hamburger",                            price:4.99,  img:"images/cheeseburger.png",           tag:null,            desc:"Classic halal hamburger — affordable student favourite.", hasCombo:false },
      { id:"s-fried-chick-sand",  name:"Fried Chicken Sandwich",               price:4.99,  img:"images/fried-chicken-sandwich.png", tag:null,            desc:"Crispy fried chicken sandwich — student price.", hasCombo:false },
    ]
  }
};
