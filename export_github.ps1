# Export script for GitHub
$source = "c:\Users\ADMIN\Desktop\weighing an instrument measurment dashboard\truemeasure-dashboard"
$dest = "c:\Users\ADMIN\Desktop\TRUEMEASURE_GITHUB_READY"
$zip = "c:\Users\ADMIN\Desktop\TRUEMEASURE_GITHUB_READY.zip"

Write-Host "Creating clean export directory at: $dest"
if (Test-Path $dest) {
    Remove-Item -Recurse -Force $dest
}
if (Test-Path $zip) {
    Remove-Item -Force $zip
}

New-Item -ItemType Directory -Path $dest -Force | Out-Null

$singleFiles = @(
    "package.json",
    "package-lock.json",
    "index.html",
    "vite.config.js",
    "tailwind.config.js",
    "postcss.config.js",
    ".gitignore",
    "README.md",
    "TEST_SCENARIOS_AND_EXAMPLES.md",
    "START_DASHBOARD.bat"
)

foreach ($file in $singleFiles) {
    $srcPath = Join-Path $source $file
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $dest -Force
        Write-Host "Copied: $file"
    }
}

# Copy public and src directories
Write-Host "Copying public/ directory..."
Copy-Item -Path (Join-Path $source "public") -Destination (Join-Path $dest "public") -Recurse -Force

Write-Host "Copying src/ directory..."
Copy-Item -Path (Join-Path $source "src") -Destination (Join-Path $dest "src") -Recurse -Force

# Create ZIP archive
Write-Host "Compressing to ZIP file: $zip"
Compress-Archive -Path "$dest\*" -DestinationPath $zip -Force

Write-Host "=========================================="
Write-Host "SUCCESS! All clean GitHub files extracted to:"
Write-Host "  Folder: $dest"
Write-Host "  ZIP:    $zip"
Write-Host "=========================================="
