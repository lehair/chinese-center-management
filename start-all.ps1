$services = @("discovery-server", "api-gateway", "user-service", "course-service", "enrollment-service", "order-service", "notification-service", "ai-service")

Write-Host "Starting Microservices Cluster..." -ForegroundColor Green

# Load .env file
if (Test-Path ".env") {
    Write-Host "Loading environment variables from .env..." -ForegroundColor Green
    foreach ($line in Get-Content ".env") {
        if ($line -match '^\s*([^#\s][^=]+)=(.*)$') {
            [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), "Process")
        }
    }
}

# Tạo thư mục logs nếu chưa tồn tại
if (-not (Test-Path -Path "logs")) {
    New-Item -ItemType Directory -Path "logs" | Out-Null
}

foreach ($svc in $services) {
    Write-Host "Starting $svc..." -ForegroundColor Cyan
    Start-Process -FilePath ".\mvnw.cmd" -ArgumentList "spring-boot:run", "-pl", $svc -RedirectStandardOutput "logs\$svc.log" -RedirectStandardError "logs\$svc-error.log" -WindowStyle Hidden
    Start-Sleep -Seconds 10
}

Write-Host "All services have been started in the background." -ForegroundColor Green
Write-Host "You can check the logs in the 'logs' folder." -ForegroundColor Yellow
