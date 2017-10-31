
 const userData = [
  {
    firstName: "Mitch",
    lastName: "Hedburg",
    email: "mitch@thing.com",
    password: "whatever"
  },
  {
    firstName: "Choi",
    lastName: "MackingAllTheTime",
    email: "choi@thing.com",
    password: "whatever"
  },
  {
    firstName: "Danny",
    lastName: "Crocodolistic",
    email: "danny@thing.com",
    password: "whatever"
  },
  {
    firstName: "Dan",
    lastName: "GlassesInYourFace",
    email: "dan@thing.com",
    password: "whatever"
  },
  {
    firstName: "Cat",
    lastName: "Meow",
    email: "cat@thing.com",
    password: "whatever"
  },
  {
    firstName: "Dog",
    lastName: "Woof",
    email: "dog@thing.com",
    password: "whatever"
  },
  {
    firstName: "Lizard",
    lastName: "Swissly",
    email: "lizard@thing.com",
    password: "whatever"
  },
  {
    firstName: "Elephant",
    lastName: "BigMan",
    email: "elephant@thing.com",
    password: "otherwhatever"
  },
  {
    firstName: "Crocodolistic",
    lastName: "thegymntistic",
    email: "crocodile@thing.com",
    password: "othernotwhatever"
  },
  {
    firstName: "Mexico",
    lastName: "Hola",
    email: "mexico@thing.com",
    password: "notwhatever"
  }
];

 const candyData = [
  {
    name: "Cavendish Drops",
    price: 3,
    description: "Classy, tart, make your heart drop",
    image: "./images/cavendishcandy.jpg",
    quantity: 20,
    categoryId: 1
  },
  {
    name: "Chewy Candy Mix",
    price: 3,
    description:
      "A mix of sweet, tart, little colored things of absolute taste perfection",
    image: "./images/chewycandymix.jpg",
    quantity: 20,
    categoryId: 10
  },
  {
    name: "Chocolate Abundance",
    price: 10,
    description: "Countless varieties of the treat of the Gods",
    image: "./images/chocoloateabundance.jpg",
    quantity: 20,
    categoryId: 10
  },
  {
    name: "Confiserie Chocolate",
    price: 12,
    description: "Decadence, heaven, my oh my flavor everywhere",
    image: "./images/confiseriechocolate.jpg",
    quantity: 15,
    categoryId: 1
  },
  {
    name: "Almond Chocolate Coconut Magic",
    price: 12,
    description:
      "Put these three things in one and your heading straight to NIRVANA",
    image: "./images/confiseriechocolate.jpg",
    quantity: 59,
    categoryId: 1
  },
  {
    name: "Chocolate Covered... APPLE!",
    price: 7,
    description:
      "So, you want some healthy, some sweet, what comes? This, chocolate covered... APPLES!",
    image: "./images/fancyapples.jpg",
    quantity: 12,
    categoryId: 1
  },
  {
    name: "Super Fine Hard Candies",
    price: 3,
    description: "Old fashioned but with class. Grandma would approve.",
    image: "./images/fancyhardcandy.jpg",
    quantity: 11,
    categoryId: 1
  },
  {
    name: "Ecstatic Ginger Cookies",
    price: 6,
    description:
      "These little guys got the perfect blend of sweet with that ginger kick",
    image: "./images/gingercookies.jpg",
    quantity: 58,
    categoryId: 1
  },
  {
    name: "Floribunda Chocolate",
    price: 12,
    description:
      "Sometimes you need that real classy European chocolate fix, here it is.",
    image: "./images/floribundachocolate.jpg",
    quantity: 2,
    categoryId: 1
  },
  {
    name: "Unique Hard Candy Mix",
    price: 8,
    description:
      "No touching these hardies. They full of little bits of flavor, utterly new to your taste buds.",
    image: "./images/hardcandymix.jpg",
    quantity: 99,
    categoryId: 1
  },
  {
    name: "Handmade Heart Candies",
    price: 9,
    description:
      "Hot damn! It's loving season. And you gotta show your in it. Pop! Heart Candy!",
    image: "./images/heartcandy.jpg",
    quantity: 69,
    categoryId: 1
  },
  {
    name: "Jelly Beans",
    price: 5,
    description: "Eat a bean, sprout some happy!",
    image: "./images/jellybeans.jpg",
    quantity: 78,
    categoryId: 1
  },
  {
    name: "Cute as Hell Donuts",
    price: 10,
    description: "These guys are as big as top of your finger! Tiny donuts!",
    image: "./images/littledonuts.jpg",
    quantity: 6,
    categoryId: 1
  },
  {
    name: "Bright Macaroons",
    price: 7,
    description: "You like macaroons? You at least like the word? Get em!",
    image: "./images/macaroons.jpg",
    quantity: 43,
    categoryId: 1
  },
  {
    name: "Mozart Kugeln Chocolate",
    price: 20,
    description: "With a name this classy, how could you say no??",
    image: "./images/mozartkugelnchocolate.jpg",
    quantity: 23,
    categoryId: 1
  },
  {
    name: "Nutty Sweety Bread",
    price: 6,
    description: "Yes, it's as good as it looks. Hot damn!",
    image: "./images/nuttysweetybread.jpg",
    quantity: 12,
    categoryId: 1
  },
  {
    name: "Pink Meringue",
    price: 14,
    description: "Cute! Too cute to eat? Said no one ever",
    image: "./images/pinkmeringue.jpg",
    quantity: 48,
    categoryId: 19
  },
  {
    name: "Popular Candy Mix",
    price: 1,
    description: "Sometimes you gotta settle for what you can get.",
    image: "./images/popularcandymix.jpg",
    quantity: 79,
    categoryId: 10
  },
  {
    name: "Red and Green Lollies",
    price: 6,
    description: "Christmas you may think. We think... yeah, the same thing.",
    image: "./images/redgreenlolly.jpg",
    quantity: 48,
    categoryId: 1
  },
  {
    name: "Super Sour Candy",
    price: 7,
    description:
      "Nostalgia? If you had this in the young years, you sure can taste it right now...",
    image: "./images/sourcandy.jpg",
    quantity: 48,
    categoryId: 19
  },
  {
    name: "Truffles",
    price: 9,
    description:
      "Delicacy, Delicacy, Delicacy, appreciate your need for delicacy.",
    image: "./images/truffles1.jpg",
    quantity: 34,
    categoryId: 1
  },
  {
    name: "Turkish Delight",
    price: 6,
    description: "Handmade. Poetry in a creation. You will not forget them.",
    image: "./images/turkishdelight.jpg",
    quantity: 42,
    categoryId: 1
  },
  {
    name: "Valentines Day Choice 1",
    price: 17,
    description:
      "It's the loving season! Or perhaps the chocolate season? No judgement here.",
    image: "./images/valentinesday1.jpg",
    quantity: 4,
    categoryId: 1
  },
  {
    name: "Valentines Day Choice 2",
    price: 26,
    description:
      "What's in these things? Simply put, taste receptor tranquilizer.",
    image: "./images/valentinesday2.jpg",
    quantity: 47,
    categoryId: 1
  },
  {
    name: "Sour Sweet Lollies",
    price: 6,
    description: "Ahhhh.... ahhhh... ahhh.. ah.. the tart life.",
    image: "./images/soursweetlolly.jpg",
    quantity: 48,
    categoryId: 1
  },
  {
    name: "White Chocolate",
    price: 6,
    description:
      "They're as good as the picture makes it appear, I assure you.",
    image: "./images/whitechocolate.jpg",
    quantity: 15,
    categoryId: 1
  }
];

 const reviewsData = [
  {
    userId: 1,
    candyId: 1,
    review:
      "Oh my lord!!!!! These things drive me wild. I ate one, then two. Fell asleep. And they were gone! I thought... how??? But what'd I know, I was eating them while I was fast asleep @___@"
  }
];

 const categoriesData = [
  {
    name: "Hard Candy",
    description: "Yeaa baby!"
  }
];

 const ordersData = [
  {
    address: "112 Valhalla Drive, Zimbabwe",
    status: 'Created'

  }
];


module.exports = {
  userData,
  candyData,
  reviewsData,
  categoriesData,
  ordersData
}
