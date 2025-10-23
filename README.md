# Dutch NFT Creator Dashboard

A comprehensive NFT creator dashboard built with Next.js for managing, minting, and analyzing NFT collections on the Loopring Layer 2 network.

## 🚀 Features

- **NFT Management**: Create, mint, and manage NFT collections
- **Bulk Minting**: Upload and mint multiple NFTs at once via CSV
- **Analytics Dashboard**: Track collection performance and holder insights
- **Draft NFTs**: Save and manage NFT drafts before minting
- **Loopring Integration**: Full integration with Loopring SDK for L2 transactions
- **Wallet Connection**: Support for Web3 wallet connections
- **User Authentication**: Secure registration and verification system
- **Profile Management**: Manage creator profiles and settings
- **Responsive Design**: Mobile and desktop optimized interface

## 🛠️ Tech Stack

- **Framework**: Next.js 13.2.1
- **Language**: TypeScript 4.9.5
- **State Management**: Redux Toolkit with Redux Persist
- **Styling**: Tailwind CSS, Styled Components
- **API Layer**: Apollo Client (GraphQL)
- **Blockchain**: Loopring SDK, Ethers.js, Web3.js
- **Charts**: Recharts
- **Animations**: Lottie React
- **Forms**: Custom form hooks
- **File Upload**: Pinata IPFS integration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.13.0
- **npm**: v8.19.3
- **Yarn**: (recommended for package management)

## 🏗️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dutchnft
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add necessary environment variables for:
- Loopring API endpoints
- Pinata API keys
- GraphQL endpoint
- Other configuration as needed

## 🚀 Getting Started

### Development Server

Run the development server:

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
yarn build
# or
npm run build
```

### Start Production Server

```bash
yarn start
# or
npm start
```

## 📜 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build production bundle
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn pre-build` - Type check without emitting files
- `yarn format` - Format code with Prettier

## 📁 Project Structure

```
src/
├── assets/          # Static assets (Lottie animations, images)
├── common/          # Reusable UI components
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   ├── Table/
│   └── ...
├── components/      # Feature-specific components
│   ├── auth/
│   ├── create/
│   ├── dashboard/
│   ├── profile/
│   └── shared/
├── config/          # Configuration files (Apollo, etc.)
├── ducks/           # Redux slices
├── graphql/         # GraphQL queries and mutations
├── helpers/         # Utility functions
├── hooks/           # Custom React hooks
├── lib/             # Third-party service integrations
├── pages/           # Next.js pages and API routes
├── redux/           # Redux store configuration
├── services/        # API service layers
├── styles/          # Global styles
└── types/           # TypeScript type definitions
```

## 🔑 Key Features

### NFT Creation
- Single and bulk NFT minting
- CSV upload for batch creation
- Media file upload (images, videos)
- Metadata management
- Collection creation and management

### Dashboard
- Analytics and insights
- NFT management interface
- Transaction history
- Holder analytics
- Performance metrics with charts

### Wallet Integration
- Web3 wallet connection
- Loopring L2 wallet support
- Transaction signing
- Balance checking

## 🎨 UI Components

The project includes a comprehensive library of reusable components:

- **Forms**: Input, Select, TextArea, Toggle, Custom Range
- **Navigation**: Tab, NavLink, Dropdown, Pagination
- **Feedback**: Modal, Tooltip, Loader, Badge
- **Data Display**: Table, Accordion, TransactionList
- **Upload**: MediaUpload, CSVUpload, FolderUpload
- **Interactive**: Button, Switch, Stepper

## 🔧 Configuration

### Tailwind CSS
Customize design tokens in `tailwind.config.js`

### Code Quality
- **ESLint**: Linting configuration in `.eslintrc`
- **Prettier**: Code formatting in `.prettierrc`
- **Commitlint**: Commit message linting with Husky
- **TypeScript**: Strict type checking enabled

## 🌐 API Integration

- **GraphQL**: Apollo Client for data fetching
- **Loopring API**: NFT minting and trading operations
- **Pinata**: IPFS file storage for NFT metadata

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Loopring SDK Documentation](https://github.com/Loopring/loopring-web-v2)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Support

For support and questions, please contact the development team.

---

**Note**: This application requires a Loopring wallet and L2 account to utilize NFT minting features.
