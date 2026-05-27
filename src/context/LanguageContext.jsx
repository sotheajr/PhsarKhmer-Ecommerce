import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const translations = {
  en: {
    freeShipping: "Free on all orders over $50",
    faqs: "FAQs",
    needHelp: "Need help",
    searchPlaceholder: "Search here...",
    cart: "Cart",
    favorites: "Favorites",
    wishlist: "Wishlist",
    addToWishlist: "Add to Wishlist",
    removeFromWishlist: "Remove from Wishlist",
    addedToWishlist: "Added to Wishlist",
    removedFromWishlist: "Removed from Wishlist",
    account: "Account",
    logout: "Logout",
    login: "Login",
    register: "Register",
    allCategories: "All Categories",
    home: "Home",
    shop: "Shop",
    product: "Product",
    pages: "Pages",
    about: "About",
    contact: "Contact",

    recentSection: {
      title: "Recently Added",
    },
    categories: {
      chair: "Chair & Furniture",
      vegetable: "Fresh Vegetables",
      clothes: "Modern Clothes",
      beauty: "Beauty & Cosmetics",
      toys: "Baby Toys",
      bathroom: "Bathroom & Decor",
    },
    features: {
      title: "Featured Products",
      statusNew: "New",
      statusSales: "Sales",
      addToCart: "Add To Cart",
    },
    footer: {
      categories: "Categories",
      support: "Support",
      newsletter: "Newsletter",
      helpSupport: "Help & Support",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      faqs: "FAQs",
      subscribeText: "Subscribe to get latest updates and offers.",
      subscribe: "Subscribe",
      chairFurniture: "Chair & Furniture",
      freshVegetables: "Fresh Vegetables",
      modernClothes: "Modern Clothes",
      beautyCosmetics: "Beauty & Cosmetics",
      bankNote: "Bank Note",
      creditCard: "Credit Card",
      designedBy: "Designed & Developed by",
      categoriesTitle: "Categories",
      description:
        "Experience a rich, easy, fast, and highly trusted online shopping experience with products for all your needs.",
    },
    shopSidebar: {
      priceRange: "PRICE RANGE",
      reset: "RESET",
      rating: "PRODUCT RATING",
      colors: "PRODUCT COLORS",
      categories: "PRODUCT CATEGORIES",
      productRating: "PRODUCT RATING",
      productColors: "PRODUCT COLORS",
      productCategories: "PRODUCT CATEGORIES",
      clothing: "Clothing",
      blue: "Blue",
      gigas: "Gigas",
      gray: "Gray",
      green: "Green",
      horizon: "Horizon",
      red: "Red",
      wafer: "Wafer",
      yellow: "Yellow",
    },
    shopProducts: {
      monitor: "Baby Monitor VB605 Radio",
      chair: "Comfort Wooden Restaurant Chair",
    },
    productPage: {
      popularProducts: "Popular Products",
      popularDescription: "Explore our most popular furniture collection",
      saleBannerTitle: "Best Furniture Collection 2025",
      saleBannerDescription:
        "Discover modern and elegant furniture for your dream home.",
      shopNow: "Shop Now",
    },
    banner: {
      title: "Discover your dream furniture",
      subtitle: "New collection available now",
      button: "Shop Now",
    },
    homeSection: {
      topCategories: "Top Categories",
    },
    features: {
      title: "Featured Products",
      statusNew: "New",
      statusSales: "Sales",
      addToCart: "Add To Cart",
    },
    categoriesSection: {
      title: "Top Categories",
      products: "{count} Products",
    },
    productInfo: {
      selectSize: "Select Size:",
      seeChart: "See Chart",
      wishlist: "Wishlist",
      addToCart: "Add to Cart",
      productDetails: "Product Details",
      materialCare: "Material & Care",
      soldBy: "Sold By",
      addedToCart: "Product Added To Cart",
    },
    review: {
      title: "Detail Review Discussions",
      rating: "Rating:",
      placeholder: "Write your review...",
      submit: "Submit Review",
    },
    cartPage: {
      title: "Cart",
      product: "Product",
      qty: "Qty",
      price: "Price",
      total: "Total",
      stock: "Stock: {stock}",
      off: "{discount}% off",
      checkout: "Checkout",
      name: "Name",
      email: "Email",
      phone: "Phone",
      address: "Address",
      coupon: "Coupon",
      apply: "Apply",
      couponApplied: "Coupon applied!",
      invalidCoupon: "Invalid coupon",
      shipping: "Shipping",
      cartEmpty: "Cart is empty",
      requiredField: "{field} is required",
    },
    checkout: {
      title: "Checkout",
      shippingDetailsTitle: "Shipping details & coupon",
      shippingInfo: "Shipping information",
      nameLabel: "Name",
      emailLabel: "Email",
      couponLabel: "Coupon",
      noCoupon: "None",
      paymentMethod: "Payment method",
      payScript: "Script",
      payABA: "ABA",
      payWing: "Wing",
      useVisaSample:
        "Use the sample Visa details below to complete the payment.",
      cardholderName: "Cardholder Name",
      cardNumber: "Card number",
      expiration: "Expiration",
      cvv: "CVV",
      scanQr:
        "Scan this QR code using your payment app to complete the order with {method}.",
      wingInfo: "Wing payment: scan code or enter your Wing account details.",
      abaInfo:
        "ABA payment: scan code or use ABA Pay to complete your purchase.",
      orderNow: "Order now",
      orderingNow: "Ordering now...",
      orderSummary: "Order Summary",
      itemsCount: "{count} item{plural}",
      qty: "Qty",
      subtotal: "Subtotal",
      discount: "Discount",
      deliveryFee: "Delivery fee",
      tax: "Tax (10%)",
      total: "Total",
    },
    orderSuccess: {
      title: "Order Successful",
      message:
        "Your order has been placed successfully. Thank you for shopping with us.",
      orderNumber: "Order number",
      name: "Name",
      total: "Total",
      continueShopping: "Continue shopping",
    },
    navbar: {
      home: "Home",
      shop: "Shop",
      about: "About Us",
      product: "Product",
    },
    auth: {
      loginTitle: "Login",
      registerTitle: "Register",
      emailPlaceholder: "Your Email...",
      passwordPlaceholder: "Your Password...",
      namePlaceholder: "Your Name...",
      noAccount: "Don't have account",
      haveAccount: "Already have an account?",
    },
    aboutPage: {
      heroTitle: "Built for modern supply chain systems",
      heroSubtitle:
        "Business success depends on an intelligent, real-time supply chain.",
      heroDesc:
        "Helping organizations reach full potential through smarter supply chains.",
      solutionTag: "SOLUTION",
      solutionTitle: "Delivering Certainty",
      solutionCopy:
        "We help overcome critical supply chain challenges with efficiency.",
      solutionBullet1: "✔ Faster Decisions",
      solutionBullet2: "✔ Sustainable Growth",
      teamTitle: "Meet the Team",
      faqTitle: "Frequently Asked Question",
      faq1: {
        q: "What is Lynqet Global Fulfillment?",
        a: "Real-time supply chain platform.",
      },
      faq2: { q: "How do I switch accounts?", a: "Go to settings." },
      faq3: {
        q: "What is Dynamic Safety Stock?",
        a: "Auto inventory adjustment.",
      },
      faq4: { q: "What support services?", a: "24/7 support." },
    },
    categories: {
      chair: "Chair",
      vegetable: "Vegetables",
      clothes: "Clothes",
      beauty: "Beauty",
      bathroom: "Bathroom",
      kitchen: "Kitchen",
      Livingroom: "Living Room",

      wingChair: "Wing Chair",
      woodenChair: "Wooden Chair",
      deskChair: "Desk Chair",
      parkBench: "Park Bench",
      toys: "Baby Toys",
    },
    categoriesSection: {
      title: "Top Categories",
      products: "{count} Products",
    },
    features: {
      title: "Featured Products",
      statusNew: "New",
      statusSales: "Sales",
      addToCart: "Add To Cart",
    },
    productPage: {
      popularProducts: "Trending",
      bestSeller: "Best Seller",
      popularDescription: "Explore our most popular furniture collection",
      saleBannerTitle: "Best Furniture Collection 2025",
      saleBannerDescription:
        "Discover modern and elegant furniture for your dream home.",
      shopNow: "Shop Now",
    },
  },
  km: {
    freeShipping: "ដឹកជញ្ជូនឥតគិតថ្លៃសម្រាប់ការបញ្ជាទិញចាប់ពី $50 ឡើងទៅ",
    faqs: "សំណួរញឹកញាប់",
    needHelp: "ត្រូវការជំនួយ",
    searchPlaceholder: "ស្វែងរកនៅទីនេះ...",
    cart: "រទេះទំនិញ",
    favorites: "បញ្ជីចំណូលចិត្ត",
    wishlist: "បញ្ជីប្រាថ្នា",
    addToWishlist: "បន្ថែមទៅបញ្ជីប្រាថ្នា",
    removeFromWishlist: "ដកចេញពីបញ្ជីប្រាថ្នា",
    addedToWishlist: "បានបន្ថែមទៅបញ្ជីប្រាថ្នា",
    removedFromWishlist: "បានដកចេញពីបញ្ជីប្រាថ្នា",
    account: "គណនី",
    logout: "ចាកចេញ",
    login: "ចូលប្រើ",
    register: "ចុះឈ្មោះ",
    allCategories: "ប្រភេទទាំងអស់",
    home: "ទំព័រដើម",
    shop: "ហាងទំនិញ",
    product: "ផលិតផល",
    pages: "ទំព័រ",
    about: "អំពីយើង",
    contact: "ទាក់ទង",
    navbar: {
      home: "ទំព័រដើម",
      shop: "ហាងទំនិញ",
      about: "អំពីយើង",
    },
    categories: {
      chair: "កៅអី",
      vegetable: "បន្លែ",
      clothes: "សម្លៀកបំពាក់",
      beauty: "សម្ផស្ស",
      wingChair: "កៅអី Wing",
      woodenChair: "កៅអីឈើ",
      deskChair: "កៅអីធ្វើការ",
      parkBench: "បង់អង្គុយលេង",
      toys: "កៅក្មេង",
      bathroom: "បន្ទប់ទឹក និងការដេគ័រ",
      kitchen: "បន្ទប់ម្ហូប និងឧបករណ៍ផ្ទះបាយ",
      Livingroom: "បន្ទប់ទទួលភ្ញៀវ",
    },
    categoriesSection: {
      title: "ប្រភេទពេញនិយមបំផុត", // មានស្រាប់ហើយ
      products: "{count} ផលិតផល", // មានស្រាប់ហើយ
    },
    footer: {
      categories: "ប្រភេទផលិតផល",
      support: "ផ្នែកគាំទ្រ",
      newsletter: "ព្រឹត្តិបត្រព័ត៌មាន",
      helpSupport: "ជំនួយ និងការគាំទ្រ",
      terms: "លក្ខខណ្ឌនៃការប្រើប្រាស់",
      privacy: "គោលការណ៍ឯកជនភាព",
      faqs: "សំណួរញឹកញាប់",
      subscribeText: "ចុះឈ្មោះដើម្បីទទួលបានព័ត៌មានថ្មីៗ និងការផ្តល់ជូនពិសេស។",
      subscribe: "ចុះឈ្មោះ",
      chairFurniture: "កៅអី និងគ្រឿងសង្ហារិម",
      freshVegetables: "បន្លែស្រស់ៗ",
      modernClothes: "សម្លៀកបំពាក់ទាន់សម័យ",
      beautyCosmetics: "សម្ផស្ស និងគ្រឿងសម្អាង",
      bankNote: "ក្រដាសប្រាក់",
      creditCard: "កាតឥណទាន",
      designedBy: "រចនា និងអភិវឌ្ឍន៍ដោយ",
      categoriesTitle: "ប្រភេទផលិតផល",
      description:
        "ពិសោធន៍ការទិញទំនិញអនឡាញដ៏សម្បូរបែប ងាយស្រួល រហ័សទាន់ចិត្ត និងមានទំនុកចិត្តខ្ពស់ជាមួយទំនិញគ្រប់តម្រូវការរបស់អ្នក។",
    },
    shopSidebar: {
      priceRange: "កម្រិតតម្លៃ",
      reset: "កំណត់ឡើងវិញ",
      rating: "ការវាយតម្លៃផលិតផល",
      colors: "ពណ៌ផលិតផល",
      categories: "ប្រភេទផលិតផល",
      productRating: "ការវាយតម្លៃផលិតផល",
      productColors: "ពណ៌ផលិតផល",
      productCategories: "ប្រភេទផលិតផល",
      clothing: "សម្លៀកបំពាក់",
      blue: "ពណ៌ខៀវ",
      gigas: "ពណ៌ស្វាយចាស់ (Gigas)",
      gray: "ពណ៌ប្រផេះ",
      green: "ពណ៌បៃតង",
      horizon: "ពណ៌ខៀវស្រាល (Horizon)",
      red: "ពណ៌ក្រហម",
      wafer: "ពណ៌ត្នោតស្រាល (Wafer)",
      yellow: "ពណ៌លឿង",
    },
    shopProducts: {
      monitor: "ម៉ាម៉ា វីដេអូ VB605",
      chair: "កៅអីឈើផាសុកភាព",
    },
    productPage: {
      popularProducts: "ផលិតផលពេញនិយម",
      popularDescription: "ស្វែងរកបណ្តុំគ្រឿងសង្ហារិមដែលពេញនិយមបំផុតរបស់យើង",
      saleBannerTitle: "បណ្តុំគ្រឿងសង្ហារិមល្អបំផុតប្រចាំឆ្នាំ 2025",
      saleBannerDescription:
        "ស្វែងរកគ្រឿងសង្ហារិមទំនើប និងស្រស់ស្អាតសម្រាប់គេហដ្ឋានក្នុងក្ដីស្រមៃរបស់អ្នក។",
      shopNow: "ទិញឥឡូវនេះ",
    },
    features: {
      title: "ផលិតផលពិសេសៗ",
      statusNew: "ថ្មី",
      statusSales: "បញ្ចុះតម្លៃ",
      addToCart: "បន្ថែមទៅក្នុងរទេះ",
    },
    categoriesSection: {
      title: "ប្រភេទពេញនិយមបំផុត",
      products: "{count} ផលិតផល",
    },
    productInfo: {
      selectSize: "ជ្រើសរើសទំហំ:",
      seeChart: "មើលតារាងទំហំ",
      wishlist: "បញ្ជីប្រាថ្នា",
      addToCart: "បន្ថែមទៅក្នុងរទេះ",
      productDetails: "ព័ត៌មានលម្អិតផលិតផល",
      materialCare: "សម្ភារៈ និងការថែទាំ",
      soldBy: "លក់ដោយ",
      addedToCart: "បានបន្ថែមផលិតផលទៅក្នុងរទេះហើយ",
    },
    review: {
      title: "ការពិភាក្សា និងការវាយតម្លៃលម្អិត",
      rating: "ការវាយតម្លៃ:",
      placeholder: "សរសេរការវាយតម្លៃរបស់អ្នកនៅទីនេះ...",
      submit: "ដាក់ស្នើការវាយតម្លៃ",
    },
    cartPage: {
      title: "រទេះទំនិញ",
      product: "ផលិតផល",
      qty: "ចំនួន",
      price: "តម្លៃ",
      total: "សរុប",
      stock: "ក្នុងស្តុក: {stock}",
      off: "បញ្ចុះតម្លៃ {discount}%",
      checkout: "ទូទាត់ប្រាក់",
      name: "ឈ្មោះ",
      email: "អ៊ីមែល",
      phone: "លេខទូរស័ព្ទ",
      address: "អាសយដ្ឋាន",
      coupon: "ប័ណ្ណបញ្ចុះតម្លៃ",
      apply: "អនុវត្ត",
      couponApplied: "បានអនុវត្តប័ណ្ណបញ្ចុះតម្លៃជោគជ័យ!",
      invalidCoupon: "ប័ណ្ណបញ្ចុះតម្លៃមិនត្រឹមត្រូវទេ",
      shipping: "ការដឹកជញ្ជូន",
      cartEmpty: "មិនមានទំនិញនៅក្នុងរទេះទេ",
      requiredField: "សូមបំពេញចន្លោះ {field}",
    },
    checkout: {
      title: "ការទូទាត់ប្រាក់",
      shippingDetailsTitle: "ព័ត៌មានដឹកជញ្ជូន និងប័ណ្ណបញ្ចុះតម្លៃ",
      shippingInfo: "ព័ត៌មានសម្រាប់ការដឹកជញ្ជូន",
      nameLabel: "ឈ្មោះ",
      emailLabel: "អ៊ីមែល",
      couponLabel: "ប័ណ្ណបញ្ចុះតម្លៃ",
      noCoupon: "គ្មាន",
      paymentMethod: "វិធីសាស្ត្រទូទាត់",
      payScript: "Script",
      payABA: "ABA Pay",
      payWing: "Wing",
      useVisaSample:
        "សូមប្រើប្រាស់ព័ត៌មានកាត Visa គំរូខាងក្រោមដើម្បីបញ្ចប់ការទូទាត់។",
      cardholderName: "ឈ្មោះម្ចាស់កាត",
      cardNumber: "លេខកាត",
      expiration: "ថ្ងៃផុតកំណត់",
      cvv: "CVV",
      scanQr:
        "សូមស្កេនកូដ QR នេះតាមរយៈកម្មវិធីធនាគាររបស់អ្នកដើម្បីបញ្ចប់ការបញ្ជាទិញជាមួយ {method}។",
      wingInfo: "ការទូទាត់តាម Wing: ស្កេនកូដ ឬបញ្ចូលព័ត៌មានគណនី Wing របស់អ្នក។",
      abaInfo:
        "ការទូទាត់តាម ABA: ស្កេនកូដ ឬប្រើប្រាស់ ABA Pay ដើម្បីបញ្ចប់ការបញ្ជាទិញ។",
      orderNow: "បញ្ជាទិញឥឡូវនេះ",
      orderingNow: "កំពុងដំណើរការបញ្ជាទិញ...",
      orderSummary: "សង្ខេបការបញ្ជាទិញ",
      itemsCount: "ទំនិញចំនួន {count}",
      qty: "ចំនួន",
      subtotal: "សរុបរង",
      discount: "ប្រាក់(បញ្ចុះតម្លៃ)",
      deliveryFee: "ថ្លៃដឹកជញ្ជូន",
      tax: "ពន្ធ (10%)",
      total: "សរុបរួម",
    },
    recentSection: {
      title: "ផលិតផលទើបតែបញ្ចូលថ្មី",
    },
    orderSuccess: {
      title: "ការបញ្ជាទិញទទួលបានជោគជ័យ",
      message:
        "ការបញ្ជាទិញរបស់អ្នកត្រូវបានដាក់ជូនដោយជោគជ័យ។ សូមអរគុណសម្រាប់ការគាំទ្រហាងរបស់យើង។",
      orderNumber: "លេខកូដបញ្ជាទិញ",
      name: "ឈ្មោះអ្នកទិញ",
      total: "ចំនួនទឹកប្រាក់សរុប",
      continueShopping: "បន្តទិញទំនិញ",
    },
    categories: {
      chair: "កៅអី និងគ្រឿងសង្ហារិម",
      vegetable: "បន្លែស្រស់ៗ",
      clothes: "សម្លៀកបំពាក់ទាន់សម័យ",
      beauty: "សម្រស់ និងគ្រឿងសម្អាង",
    },
    auth: {
      loginTitle: "ចូលប្រើប្រាស់",
      registerTitle: "ចុះឈ្មោះគណនី",
      emailPlaceholder: "អ៊ីមែលរបស់អ្នក...",
      passwordPlaceholder: "ពាក្យសម្ងាត់របស់អ្នក...",
      namePlaceholder: "ឈ្មោះរបស់អ្នក...",
      noAccount: "មិនទាន់មានគណនីមែនទេ?",
      haveAccount: "មានគណនីរួចហើយមែនទេ?",
    },
    features: {
      title: "ផលិតផលពិសេសៗ",
      statusNew: "ថ្មី",
      statusSales: "បញ្ចុះតម្លៃ",
      addToCart: "បន្ថែមទៅក្នុងរទេះ",
    },
    aboutPage: {
      heroTitle: "បង្កើតឡើងសម្រាប់ប្រព័ន្ធខ្សែសង្វាក់ផ្គត់ផ្គង់សម័យទំនើប",
      heroSubtitle:
        "ភាពជោគជ័យនៃអាជីវកម្ម គឺអាស្រ័យលើខ្សែសង្វាក់ផ្គត់ផ្គង់ដ៏ឆ្លាតវៃ និងដំណើរការទាន់ពេលវេលា។",
      heroDesc:
        "ជួយដល់បណ្តាស្ថាប័ននានាឱ្យឈានទៅដល់សក្ដានុពលពេញលេញ តាមរយៈខ្សែសង្វាក់ផ្គត់ផ្គង់ដែលកាន់តែឆ្លាតវៃ។",
      solutionTag: "ដំណោះស្រាយ",
      solutionTitle: "ផ្តល់ជូននូវភាពច្បាស់លាស់ និងទំនុកចិត្ត",
      solutionCopy:
        "យើងជួយដោះស្រាយរាល់បញ្ហាប្រឈមសំខាន់ៗនៃខ្សែសង្វាក់ផ្គត់ផ្គង់ប្រកបដោយប្រសិទ្ធភាពខ្ពស់។",
      solutionBullet1: "✔ ធ្វើការសម្រេចចិត្តបានរហ័ស",
      solutionBullet2: "✔ កំណើនប្រកបដោយចីរភាព",
      teamTitle: "ថ្នាក់ដឹកនាំ និងសមាជិកក្រុម",
      faqTitle: "សំណួរដែលសួរញឹកញាប់បំផុត",
      faq1: {
        q: "តើអ្វីទៅជា Lynqet Global Fulfillment?",
        a: "វាគឺជាប្រព័ន្ធដំណើរការខ្សែសង្វាក់ផ្គត់ផ្គង់បែបឌីជីថលទាន់ពេលវេលា (Real-time)។",
      },
      faq2: {
        q: "តើត្រូវប្តូរគណនីដោយរបៀបណា?",
        a: "សូមចូលទៅកាន់ការកំណត់ (Settings)។",
      },
      faq3: {
        q: "តើអ្វីទៅជា Dynamic Safety Stock?",
        a: "ជាប្រព័ន្ធកែសម្រួលតុល្យភាពស្តុកទំនិញដោយស្វ័យប្រវត្តិ។",
      },
      faq4: {
        q: "តើមានសេវាកម្មគាំទ្រអ្វីខ្លះ?",
        a: "យើងមានក្រុមការងារគាំទ្រ និងប្រឹក្សាយោបល់ 24/7។",
      },
    },
    features: {
      title: "ផលិតផលពិសេសៗ",
      statusNew: "ថ្មី",
      statusSales: "បញ្ចុះតម្លៃ",
      addToCart: "បន្ថែមទៅក្នុងរទេះ",
    },
    productPage: {
      popularProducts: "កំពុងពេញនិយម",
      bestSeller: "លក់ដាច់បំផុត",
      popularDescription: "ស្វែងរកបណ្តុំគ្រឿងសង្ហារិមដែលពេញនិយមបំផុតរបស់យើង",
      saleBannerTitle: "បណ្តុំគ្រឿងសង្ហារិមល្អបំផុតប្រចាំឆ្នាំ 2025",
      saleBannerDescription:
        "ស្វែងរកគ្រឿងសង្ហារិមទំនើប និងស្រស់ស្អាតសម្រាប់គេហដ្ឋានក្នុងក្ដីស្រមៃរបស់អ្នក។",
      shopNow: "ទិញឥឡូវនេះ",
    },
    banner: {
      title: "ស្វែងរកគ្រឿងសង្ហារិមក្នុងក្ដីស្រមៃរបស់អ្នក",
      subtitle: "ប្រមូលផ្តុំថ្មី",
      button: "ទិញឥឡូវនេះ",
    },
    homeSection: {
      topCategories: "ប្រភេទពេញនិយមបំផុត",
    },
  },
};

const getNestedValue = (obj, path) => {
  if (!obj || !path) return undefined;
  return path.split(".").reduce((current, part) => {
    return current && current[part] !== undefined ? current[part] : undefined;
  }, obj);
};

const interpolate = (value, vars = {}) => {
  if (typeof value !== "string") return value;
  return Object.entries(vars).reduce((text, [key, replacement]) => {
    return text.replace(new RegExp(`\\{${key}\\}`, "g"), replacement);
  }, value);
};

const LanguageContext = createContext({
  locale: "en",
  setLocale: () => {},
  t: () => "",
});

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    const saved = window.localStorage.getItem("locale");
    return saved === "km" ? "km" : "en";
  });

  useEffect(() => {
    window.localStorage.setItem("locale", locale);
  }, [locale]);

  const t = useCallback(
    (key, vars = {}) => {
      let value =
        getNestedValue(translations[locale], key) ??
        getNestedValue(translations.en, key);

      // ❗️បញ្ហាគឺនៅទីនេះ
      if (typeof value === "object") {
        console.warn(`Translation key "${key}" returned an object`);
        return ""; // កុំអោយ crash
      }

      if (value === undefined) return key;

      return interpolate(value, vars);
    },
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
