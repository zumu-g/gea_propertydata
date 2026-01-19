# GEA Property Data Website

Internal property data platform for Grants Estate Agents. Search recent sales, rentals, and planning permits around any property in Victoria.

## Features

- **Recent Sales Search** - View comparable sales from property.com.au with prices, days on market, and property details
- **Rental History** - Access recent rental data to help set competitive rents
- **Planning Permits** - See planning applications from planning.vic.gov.au to understand development activity
- **Market Statistics** - Median prices, rent trends, and market indicators
- **Radius Search** - Find properties within 1-20km of any address

## Data Sources

| Source | Data Provided |
|--------|---------------|
| [property.com.au](https://property.com.au) | Sales history, rental records, property details |
| [planning.vic.gov.au](https://planning.vic.gov.au) | Planning permit applications, zones, overlays |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- API keys for property.com.au and planning.vic.gov.au

### Installation

```bash
# Clone the repository
git clone https://github.com/zumu-g/gea-property-data.git
cd gea-property-data

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Add your API keys to .env.local
```

### Environment Variables

Create a `.env.local` file with:

```env
PROPERTY_API_BASE_URL=https://api.property.com.au/v1
PROPERTY_API_KEY=your_key_here

PLANNING_VIC_API_BASE_URL=https://api.planning.vic.gov.au/v1
PLANNING_API_KEY=your_key_here
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Homepage with search
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── search/             # Search form components
│   ├── property/           # Sale & rental cards
│   └── planning/           # Planning permit cards
├── lib/
│   ├── api.ts              # API client functions
│   ├── utils.ts            # Utility functions
│   └── mock-data.ts        # Development mock data
└── types/
    └── property.ts         # TypeScript type definitions
```

## API Integration

### Property.com.au

The property API client (`src/lib/api.ts`) provides:

- `searchSales(params)` - Search recent property sales
- `searchRentals(params)` - Search recent rental records
- `getMarketStats(suburb)` - Get market statistics for a suburb
- `getSuburbProfile(suburb)` - Get comprehensive suburb data

### Planning.vic.gov.au

The planning API client provides:

- `searchPermits(params)` - Search planning permit applications
- `getPermit(applicationNumber)` - Get permit details
- `getZones(lat, lng)` - Get planning zones for a location

## Customization

### Branding

Update brand colors in `tailwind.config.ts`:

```ts
colors: {
  brand: {
    navy: '#0a1628',
    gold: '#d4a853',
    // ...
  }
}
```

### Adding Data Sources

1. Add type definitions in `src/types/property.ts`
2. Create API functions in `src/lib/api.ts`
3. Create display components in `src/components/`

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run tests: `npm test`
4. Commit: `git commit -m "Add your feature"`
5. Push: `git push origin feature/your-feature`
6. Create a Pull Request

## License

Internal use only - Grants Estate Agents © 2025

## Support

Contact the development team at [stuart@grantsea.com.au](mailto:stuart@grantsea.com.au)
