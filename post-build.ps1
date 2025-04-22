# PowerShell script to move Angular build output from docs/browser/* to docs/
# and generate 404.html for Angular SPA routing on GitHub Pages
# Use after every ng build

$src = "docs/browser"
$dest = "docs"

if (Test-Path $src) {
    Write-Host "Moving files from $src to $dest..."
    Move-Item -Path "$src\*" -Destination $dest -Force
    Write-Host "Removing $src directory..."
    Remove-Item $src -Recurse -Force
    Write-Host "Done. All files are now in $dest."
} else {
    Write-Host "$src does not exist. Nothing to move."
}

# Generate 404.html for SPA fallback
$spa404 = @"
<!--
  Custom 404 page for Angular SPA on GitHub Pages
  Redirects all 404s to index.html so Angular router can handle the route.
-->
<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\">
  <title>Redirecting...</title>
  <script type=\"text/javascript\">
    // Get the path after the domain
    var redirectTo = '/abinash-mohanta-website/index.html';
    var hash = window.location.hash ? window.location.hash : '';
    var search = window.location.search ? window.location.search : '';
    // Preserve route and params in hash
    window.location.replace(redirectTo + hash + search);
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
