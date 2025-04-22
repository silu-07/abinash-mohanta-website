# PowerShell script to move Angular build output from docs/browser/* to docs/
# and delete the now-empty docs/browser directory. Use after every ng build.

$src = "docs/browser"
$dest = "docs"

if (Test-Path $src) {
    Write-Host "Moving files from $src to $dest..."
    Move-Item -Path "$src\*" -Destination $dest -Force -Recurse
    Write-Host "Removing $src directory..."
    Remove-Item $src -Recurse -Force
    Write-Host "Done. All files are now in $dest."
} else {
    Write-Host "$src does not exist. Nothing to move."
}
