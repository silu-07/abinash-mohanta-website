# PowerShell script to move Angular build output from docs/browser/* to docs/
# and generate 404.html for Angular SPA routing on GitHub Pages
# Use after every ng build

$src = "docs/browser"
$dest = "docs"

if (Test-Path $src) {
    Write-Host "Moving files from $src to $dest..."
    $maxTries = 5
    $try = 0
    $success = $false
    while (-not $success -and $try -lt $maxTries) {
        try {
            Move-Item -Path "$src\*" -Destination $dest -Force
            Remove-Item $src -Recurse -Force
            $success = $true
        } catch {
            $try++
            Write-Host "Attempt $try failed. Retrying in 2 seconds..."
            Start-Sleep -Seconds 2
        }
    }
    if ($success) {
        Write-Host "Move and cleanup successful. All files are now in $dest."
    } else {
        Write-Host "Failed to move/delete all files after $maxTries attempts. Some files may still be locked."
    }
    # List any files that could not be moved
    if (Test-Path $src) {
        $remainingFiles = Get-ChildItem -Path $src -File -ErrorAction SilentlyContinue
        if ($remainingFiles) {
            Write-Host "The following files could not be moved (likely locked):"
            $remainingFiles | ForEach-Object { Write-Host $_.FullName }
        } else {
            Write-Host "No remaining files in $src."
        }
    }
} else {
    Write-Host "$src does not exist. Nothing to move."
}

# Generate 404.html for SPA fallback
$spa404 = @"
<!--
  Custom 404 page for Angular SPA on GitHub Pages
  Redirects all 404s to index.html with hash route so Angular router can handle the route.
-->
<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\">
  <title>Redirecting...</title>
  <script type=\"text/javascript\">
    // Get the path after the repo name
    var repo = '/abinash-mohanta-website';
    var path = window.location.pathname.startsWith(repo) ? window.location.pathname.substr(repo.length) : window.location.pathname;
    var newUrl = repo + '/index.html#' + path + window.location.search + window.location.hash;
    window.location.replace(newUrl);
  </script>
  <noscript>
    <meta http-equiv=\"refresh\" content=\"0; url=/abinash-mohanta-website/index.html\">
  </noscript>
</head>
<body>
  <h2>Redirecting...</h2>
  <p>If you are not redirected, <a href=\"/abinash-mohanta-website/index.html\">click here</a>.</p>
</body>
</html>
"@

Set-Content -Path "docs/404.html" -Value $spa404 -Encoding UTF8
Write-Host "404.html generated in docs/ folder."
