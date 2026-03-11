# Turso Database Setup Script for Windows
# This script helps you set up your Turso database

Write-Host "🚀 Turso Database Setup for Vantage Blog" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if turso CLI is installed
$tursoExists = Get-Command turso -ErrorAction SilentlyContinue
if (-not $tursoExists) {
    Write-Host "❌ Turso CLI is not installed." -ForegroundColor Red
    Write-Host "Install it with:" -ForegroundColor Yellow
    Write-Host "  curl -sSfL https://get.tur.so/install.sh | bash" -ForegroundColor Yellow
    Write-Host "  (Use WSL or Git Bash)" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Turso CLI found" -ForegroundColor Green
Write-Host ""

# Login check
Write-Host "Checking Turso authentication..."
$whoami = turso auth whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Please login to Turso:" -ForegroundColor Yellow
    turso auth login
}

Write-Host "✅ Authenticated" -ForegroundColor Green
Write-Host ""

# Database name
$DB_NAME = "blogsite"

# Check if database exists
$dbExists = turso db show $DB_NAME 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database '$DB_NAME' already exists" -ForegroundColor Green
} else {
    Write-Host "Creating database '$DB_NAME'..." -ForegroundColor Yellow
    turso db create $DB_NAME
    Write-Host "✅ Database created" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Database Information:" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan

# Get database URL
$DB_URL = turso db show $DB_NAME --url
Write-Host "DATABASE_URL=$DB_URL" -ForegroundColor Yellow

# Create token
Write-Host ""
Write-Host "Creating auth token..." -ForegroundColor Yellow
$DB_TOKEN = turso db tokens create $DB_NAME
Write-Host "DATABASE_AUTH_TOKEN=$DB_TOKEN" -ForegroundColor Yellow

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Copy the credentials above to your .env file"
Write-Host "2. Run: npm run db:push"
Write-Host "3. Add these to Vercel environment variables"
Write-Host "4. Deploy to Vercel"
Write-Host ""
