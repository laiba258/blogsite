#!/bin/bash

# Turso Database Setup Script
# This script helps you set up your Turso database

echo "🚀 Turso Database Setup for Vantage Blog"
echo "=========================================="
echo ""

# Check if turso CLI is installed
if ! command -v turso &> /dev/null
then
    echo "❌ Turso CLI is not installed."
    echo "Install it with:"
    echo "  Mac: brew install tursodatabase/tap/turso"
    echo "  Linux/WSL: curl -sSfL https://get.tur.so/install.sh | bash"
    exit 1
fi

echo "✅ Turso CLI found"
echo ""

# Login check
echo "Checking Turso authentication..."
if ! turso auth whoami &> /dev/null
then
    echo "Please login to Turso:"
    turso auth login
fi

echo "✅ Authenticated"
echo ""

# Database name
DB_NAME="blogsite"

# Check if database exists
if turso db show $DB_NAME &> /dev/null
then
    echo "✅ Database '$DB_NAME' already exists"
else
    echo "Creating database '$DB_NAME'..."
    turso db create $DB_NAME
    echo "✅ Database created"
fi

echo ""
echo "📋 Database Information:"
echo "========================"

# Get database URL
DB_URL=$(turso db show $DB_NAME --url)
echo "DATABASE_URL=$DB_URL"

# Create token
echo ""
echo "Creating auth token..."
DB_TOKEN=$(turso db tokens create $DB_NAME)
echo "DATABASE_AUTH_TOKEN=$DB_TOKEN"

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Copy the credentials above to your .env file"
echo "2. Run: npm run db:push"
echo "3. Add these to Vercel environment variables"
echo "4. Deploy to Vercel"
echo ""
