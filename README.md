e com project/
├── server/
│   ├── app.js                  # Express app configuration
│   ├── server.js               # Entry point
│   ├── config/                 # Environment variables and configuration
│   │   ├── db.js               # Database connection
│   │   └── config.js           # App configuration
│   ├── models/                 # Database models matching your SQL schema
│   │   ├── user.js
│   │   ├── product.js
│   │   └── order.js
│   ├── controllers/            # Request handlers
│   │   ├── userController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── routes/                 # API routes
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── utils/                  # Helper functions
│   │   ├── validation.js
│   │   └── helpers.js
│   └── services/               # Business logic
│       ├── userService.js
│       ├── productService.js
│       └── orderService.js
└── client/                     # React frontend


# note that login primary key is the email